
import axios from 'axios';
import Constants from 'expo-constants';

import { Firebase } from '@core/init';
import { TranslationOptionsResponse } from './interface';

export class Suggestions {
  private readonly OPENIA_ENDPOINT = Constants.manifest.extra.openIAEndpoint;

  constructor(
    private firebase = Firebase
  ) { }

  async getToken() {
    try {
      return await this.firebase.getRefreshedToken();
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