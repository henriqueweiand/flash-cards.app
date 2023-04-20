import { DocumentReference } from 'firebase/firestore';

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
        const wrong = this.getWrongOptions();

        const options = [right, ...wrong];

        // shuffle the options to randomize the order
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return options.slice(0, max);
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