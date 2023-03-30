import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Firebase } from '@core/init';

export class AuthFirebase {
    constructor(
        private firebase = Firebase
    ) {}

    async signup({ email, password }: { email: string, password: string }): Promise<UserCredential> {
        return await createUserWithEmailAndPassword(this.firebase.getAuth(), email, password)
    }

    async signin({ email, password }: { email: string, password: string }): Promise<UserCredential> {
        return await signInWithEmailAndPassword(this.firebase.getAuth(), email, password)
    }
}