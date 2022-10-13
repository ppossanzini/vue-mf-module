"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const tiny_emitter_1 = require("tiny-emitter");
class MessageService {
    static instance = new MessageService();
    static get Instance() { return MessageService.instance; }
    static set Instance(v) { this.instance = v; }
    notifier = new tiny_emitter_1.TinyEmitter();
    send(message, ...args) {
        this.notifier.emit(message, ...args);
    }
    subscribe(message, callback, ctx) {
        this.notifier.on(message, callback, ctx);
    }
    once(message, callback, ctx) {
        this.notifier.once(message, callback, ctx);
    }
    unsubscribe(message, callback) {
        this.notifier.off(message, callback);
    }
    ask(message, ...args) {
        return new Promise((resolve, reject) => {
            this.notifier.emit(`$ask-${message}`, {
                resolve,
                reject,
                args
            });
        });
    }
    reply(message, callback) {
        this.notifier.on(`$ask-${message}`, (m) => {
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
exports.MessageService = MessageService;
