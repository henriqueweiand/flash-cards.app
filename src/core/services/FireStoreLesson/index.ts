import { CollectionReference, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where } from 'firebase/firestore';

import { Lesson, LessonProps } from '@core/domain/entities/Lesson';
import { Firebase } from '@core/init';
import { collectionsName } from '@core/domain/enums/collections';
import { User } from '@core/domain/entities/User';

export class FireStoreLesson {
    private db: Firestore;
    private collectionLessons: CollectionReference;
    private readonly collectionName: string = collectionsName.lessons;
    private readonly firebase = Firebase;

    constructor(
        private user: User
    ) {
        this.db = this.firebase.getFirestore();
        this.collectionLessons = collection(this.db, this.collectionName);
    }

    getCollectionName() {
        return this.collectionName;
    }

    async create({
        document
    }: {
        document: Lesson
    }): Promise<void> {
        const docRef = doc(this.collectionLessons, this.user.getUID());
        await setDoc(docRef, document.toObject());
    }

    async update({
        document,
        updatedProps,
    }: {
        document: Lesson,
        updatedProps: Partial<LessonProps>
    }): Promise<void> {
        const mergedProps = {
            ...document.toObject(),
            ...updatedProps,
        };

        await updateDoc(document.getDocRef() as DocumentReference, mergedProps);
    }

    async delete({
        document,
    }: {
        document: Lesson,
    }): Promise<void> {
        await deleteDoc(document.getDocRef() as DocumentReference);
    }

    async findById(id: string): Promise<Lesson | null> {
        const docRef = doc(this.collectionLessons, id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists) {
            return null;
        }

        const lesson = new Lesson(snapshot.data() as LessonProps, docRef);

        return lesson;
    }

    async findAll(): Promise<Lesson[]> {
        const docs = await getDocs(this.collectionLessons);

        const lessons: Lesson[] = [];
        docs.forEach((doc) => {
            const lessonData = doc.data() as LessonProps;
            const lesson = new Lesson(lessonData, doc.ref);

            lessons.push(lesson);
        });

        return lessons;
    }
}
