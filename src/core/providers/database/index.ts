import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import Constants from 'expo-constants';
import { IFirebase } from './interface';

export class Firebase implements IFirebase {
  private auth;
  private database;

  constructor(
  ) {
      initializeApp({
        apiKey: Constants.manifest.extra.apiKey,
        authDomain: Constants.manifest.extra.authDomain,
        projectId: Constants.manifest.extra.projectId,
        storageBucket: Constants.manifest.extra.storageBucket,
        messagingSenderId: Constants.manifest.extra.messagingSenderId,
        appId: Constants.manifest.extra.appId,
        databaseURL: Constants.manifest.extra.databaseURL
      });

      this.auth = getAuth();
      this.database = getFirestore();
  }

  public getAuth() {
      return this.auth;
  }

  public getFirestore() {
      return this.database;
  }
}