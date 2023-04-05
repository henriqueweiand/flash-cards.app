import { DocumentReference } from 'firebase/firestore';

export interface LessonProps {
    email: string;
    userRef: string;
    name?: string;
}

export class Lesson {
    private props: LessonProps;
    private docRef?: DocumentReference;

    constructor(props: LessonProps, docRef?: DocumentReference) {
        this.props = props;
        this.docRef = docRef;
    }

    getDocRef() {
        return this.docRef;
    }

    setDocRef(docRef: DocumentReference) {
        return this.docRef = docRef;
    }

    updateProps(updatedProps: Partial<LessonProps>): void {
        Object.assign(this.props, updatedProps);
    }

    toObject(): LessonProps {
        return this.props;
    }
}