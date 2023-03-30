import AsyncStorage from '@react-native-async-storage/async-storage';

export abstract class IAsyncStorageApp {
    abstract getItem(key: string): Promise<string | object | null>
    abstract setItem(key: string, value: string | object): Promise<void>
}

export class AsyncStorageApp implements IAsyncStorageApp {
    constructor(
        private asyncStorage = AsyncStorage,
    ) {}

    async getItem(key: string) {
        return await this.asyncStorage.getItem(`@${key}`);
    }

    async setItem(key: string, value: string | object) {
        let storageValue = value;

        if (typeof storageValue === "object") 
            storageValue = JSON.stringify(value)

       return await this.asyncStorage.setItem(`@${key}`, storageValue);
    }
}

export class AuthAsyncStorage extends AsyncStorageApp {
    private readonly namespace = '@auth';

    async get(): Promise<string | object | null> {
        return await this.getItem(this.namespace);
    }

    async set(value: string | object): Promise<void> {
        return await this.setItem(this.namespace, value);
    }
}