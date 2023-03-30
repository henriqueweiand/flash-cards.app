export abstract class IAsyncStorageApp {
    abstract getItem(key: string): Promise<string | object | null>
    abstract setItem(key: string, value: string | object): Promise<void>
}