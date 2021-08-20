export interface IStore {
    registerModule(path: string, module: any, options?: any): void;
    registerModule(path: string[], module: any, options?: any): void;
    unregisterModule(path: string): void;
    unregisterModule(path: string[]): void;
    hasModule(path: string): boolean;
    hasModule(path: string[]): boolean;
}
