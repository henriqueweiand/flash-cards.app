import { DocumentReference } from 'firebase/firestore';

export interface IOptionWord {
    [index: string]: string | number;
}

export interface WordProps {
    originalLanguage: string;
    targetLanguage: string;
    originalWord: string;
    targetWord: string;
    options: IOptionWord;
    customAnswer?: string;
    authorName: string;
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

    toObject(): WordProps {
        return this.props;
    }
}