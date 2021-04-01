import { TinyEmitter } from "tiny-emitter";

export class MessageService {

  private static instance = new MessageService();
  static get Instance() { return MessageService.instance }
  static set Instance(v: MessageService) { this.instance = v; }

  notifier: TinyEmitter = new TinyEmitter();

  send(message: string, ...args: any[]) {
    this.notifier.emit(message, ...args);
  }

  subscribe(message: string, callback: Function, ctx?: any) {
    this.notifier.on(message, callback, ctx);
  }

  once(message: string, callback: Function, ctx?: any) {
    this.notifier.once(message, callback, ctx);
  }

  unsubscribe(message: string, callback?: Function) {
    this.notifier.off(message, callback);
  }

  ask<T>(message: string, ...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.notifier.emit(`$ask-${message}`, {
        resolve,
        reject,
        args
      })
    })
  }

  reply<R>(message: string, callback: (...args: any[]) => R) {
    this.notifier.on(`$ask-${message}`, (m: { resolve: (data: R) => void, reject: Function, args: any[] }) => {
      try {
        let result = callback(...m.args);
        m.resolve(result);
      }
      catch (err) {
        m.reject();
      }
    });
  }
}