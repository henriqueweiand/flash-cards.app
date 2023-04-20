import { DocumentReference } from 'firebase/firestore';
import _ from 'lodash';

export interface IOptionWord {
    [index: string]: any;
}

export interface WordProps {
    originalLanguage: string;
    targetLanguage: string;
    originalWord: string;
    targetWord: string;
    rightOptions: IOptionWord;
    wrongOptions: IOptionWord;
    customAnswer?: string;
    userRef: string;
}

export class Word {
    private props: WordProps;
    private docRef?: DocumentReference;

    constructor(props: WordProps, docRef?: DocumentReference) {
        this.props = props;
        this.docRef = docRef;
    }

    getDocRef() {
        return this.docRef;
    }

    setDocRef(docRef: DocumentReference) {
        return this.docRef = docRef;
    }

    updateProps(updatedProps: Partial<WordProps>): void {
        Object.assign(this.props, updatedProps);
    }

    getRightOptions(): string[] {
        return Object.keys(this.props.rightOptions).map(key => this.props.rightOptions[key]);;
    }

    getWrongOptions(): string[] {
        return Object.keys(this.props.wrongOptions).map(key => this.props.wrongOptions[key]);;
    }

    getOptionsWithMax(max: number): string[] {
        const right = this.getTargetWord();
        const wrong = _.shuffle(this.getWrongOptions());

        const wrongOptions = wrong.slice(0, max - 1);

        const options = [right, ...wrongOptions];
        return _.shuffle(options);
    }


    getTargetWord(): string {
        return this.props.targetWord;
    }

    getOriginalWord(): string {
        return this.props.originalWord;
    }

    toObject(): WordProps {
        return this.props;
    }
}