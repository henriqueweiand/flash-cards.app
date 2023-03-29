import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageApp {
    constructor(
        private asyncStorage = AsyncStorage,
    ) {}

    async getItem(key: string): Promise<string | object | null> {
        return await this.asyncStorage.getItem(`@${key}`);
    }

    async setItem(key: string, value: string | object): Promise<void> {
        let storageValue = value;

        if (typeof storageValue === "object") 
            storageValue = JSON.stringify(value)

       return await this.asyncStorage.setItem(`@${key}`, storageValue);
    }
}
