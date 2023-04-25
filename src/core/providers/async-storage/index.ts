import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAsyncStorageApp } from './interface';

export class AsyncStorageApp implements IAsyncStorageApp {
    constructor(
        private asyncStorage = AsyncStorage,
    ) { }

    async getItem(key: string) {
        return await this.asyncStorage.getItem(`${key}`);
    }

    async setItem(key: string, value: string | object) {
        let storageValue = value;

        if (typeof storageValue === "object")
            storageValue = JSON.stringify(value)

        return await this.asyncStorage.setItem(`${key}`, storageValue);
    }

    async clear() {
        return await this.asyncStorage.clear();
    }
}
