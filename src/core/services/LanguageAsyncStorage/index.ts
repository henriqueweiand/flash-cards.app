import { AsyncStorageApp } from "@providers/async-storage";

export class LanguageAsyncStorage extends AsyncStorageApp {
    private readonly namespace = '@language';

    async get(): Promise<string | object | null> {
        return await this.getItem(this.namespace);
    }

    async set(value: string | object): Promise<void> {
        return await this.setItem(this.namespace, value);
    }
}