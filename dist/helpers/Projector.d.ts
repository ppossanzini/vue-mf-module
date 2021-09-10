import { VueConstructor } from "vue/types/umd";
export interface IProjectableModel<T> {
    data: T;
    resolve: (item: T) => void;
    reject: () => void;
}
export declare class Projector {
    private static instance;
    static get Instance(): Projector;
    static set Instance(v: Projector);
    private screens;
    private projecting;
    setScreen(screen: any, name?: string): void;
    projectTo<T>(component: VueConstructor, data?: T | null, screen?: string, queue?: boolean, async?: boolean): Promise<T> | null;
    projectAsyncTo<T>(component: VueConstructor, data: T, screen?: string, queue?: boolean): Promise<T> | null;
    stopProjecting(screen?: string): boolean;
}
export interface Projectable<T> {
    value: {
        data: T;
        resolve: (item: T) => void;
        reject: () => void;
    };
}
