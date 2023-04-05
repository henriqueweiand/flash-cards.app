import { CollectionReference, DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, where } from 'firebase/firestore';

import { Word, WordProps } from '@core/domain/entities/Word';
import { Firebase } from '@core/init';
import { User } from '@core/domain/entities/User';
import { collectionsName } from '@core/domain/enums/collections';

export class FireStoreWord {
    private db: Firestore;
    private collectionWords: CollectionReference;
    private readonly collectionName: string = collectionsName.word;
    private readonly collectionLessons: string = collectionsName.lessons;
    private readonly firebase = Firebase;

    constructor(
        private user: User
    ) {
        this.db = this.firebase.getFirestore();
        this.collectionWords = collection(this.db, this.collectionLessons, this.user.getUID(), this.collectionName);
    }

    getCollectionName() {
        return this.collectionName;
    }

    async create({
        document
    }: {
        document: Word
    }): Promise<void> {
        await addDoc(this.collectionWords, document.toObject());
    }

    async update({
        document,
        updatedProps,
    }: {
        document: Word,
        updatedProps: Partial<WordProps>
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
        document: Word,
    }): Promise<void> {
        await deleteDoc(document.getDocRef() as DocumentReference);
    }

    async findById(id: string): Promise<Word | null> {
        const docRef = doc(this.collectionWords, id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists) {
            return null;
        }

        const word = new Word(snapshot.data() as WordProps, docRef);

        return word;
    }

    async findAll(): Promise<Word[]> {
        const docs = await getDocs(this.collectionWords);

        const words: Word[] = [];
        docs.forEach((doc) => {
            const wordData = doc.data() as WordProps;
            const word = new Word(wordData, doc.ref);

            words.push(word);
        });

        return words;
    }
}
