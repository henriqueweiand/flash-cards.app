import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { IFirebase } from './interface';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env'

export class Firebase implements IFirebase {
  private app;
  private auth;
  private database;

  constructor(
  ) {
    const app = initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
      databaseURL: ''
    });

    this.app = app;
    this.auth = getAuth();
    this.database = getFirestore(app);
  }

  public getAuth() {
    return this.auth;
  }

  public async getRefreshedToken() {
    const auth = this.getAuth();
    const user = auth.currentUser;

    if (user)
      return await user.getIdToken(true);
  }

  public getFirestore() {
    return this.database;
  }
}