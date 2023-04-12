
import axios from 'axios';
import Constants from 'expo-constants';

import { AuthAsyncStorage } from '@core/services/AuthAsyncStorage';
import { TranslationOptionsResponse } from './interface';
import { User } from '@core/domain/entities/User';

export class Suggestions {
  private readonly OPENIA_ENDPOINT = Constants.manifest.extra.openIAEndpoint;

  constructor(
    private authAsyncStorage: AuthAsyncStorage = new AuthAsyncStorage()
  ) { }

  async getToken() {
    try {
      const storageData = await this.authAsyncStorage.get();
      const user = new User(JSON.parse(String(storageData)));

      return user.getAccessToken();
    } catch (e) {
      throw new Error('Cannot get the user auth from localstorage');
    }
  }

  async getWord({
    fromLanguage,
    targetLanguage,
    word,
  }: {
    fromLanguage: string;
    targetLanguage: string;
    word: string;
  }): Promise<TranslationOptionsResponse> {

    const token = await this.getToken();

    try {
      const response = await axios.post<TranslationOptionsResponse>(
        `${this.OPENIA_ENDPOINT}`,
        {
          fromLanguage,
          targetLanguage,
          word,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (e) {
      throw new Error(`There was an error to request chatgpt3 api`);
    }
  }
}