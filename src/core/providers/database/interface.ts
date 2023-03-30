import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

export abstract class IFirebase {
  abstract getAuth(): Auth
  abstract getFirestore(): Firestore
}