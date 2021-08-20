import { TinyEmitter } from "tiny-emitter";
export declare class MessageService {
    private static instance;
    static get Instance(): MessageService;
    static set Instance(v: MessageService);
    notifier: TinyEmitter;
    send(message: string, ...args: any[]): void;
    subscribe(message: string, callback: Function, ctx?: any): void;
    once(message: string, callback: Function, ctx?: any): void;
    unsubscribe(message: string, callback?: Function): void;
    ask<T>(message: string, ...args: any[]): Promise<T>;
    reply<R>(message: string, callback: (...args: any[]) => R): void;
}
