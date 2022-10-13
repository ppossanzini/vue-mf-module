"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projector = void 0;
class Projector {
    static instance = new Projector();
    static get Instance() { return Projector.instance; }
    static set Instance(v) { this.instance = v; }
    screens = new Map();
    projecting = new Map();
    setScreen(screen, name = "defaultscreen") {
        this.screens.set(name, screen);
    }
    projectTo(component, data = null, screen = "defaultscreen", queue = true, async = false) {
        var model = { data };
        let promise = async ? new Promise((resolve, reject) => { model.reject = reject; model.resolve = resolve; }) : null;
        if (!queue) {
            this.projecting.set(screen, [{ component, model, promise, queue }]);
        }
        else {
            if (!this.projecting.has(screen)) {
                this.projecting.set(screen, []);
            }
            (this.projecting.get(screen) || []).push({ component, model, promise, queue });
        }
        let ss = this.screens.get(screen);
        if (!ss)
            return null;
        ss.model = model;
        ss.currentView = component;
        if (promise)
            promise.then(() => this.stopProjecting(screen)).catch(() => this.stopProjecting(screen));
        return promise;
    }
    projectAsyncTo(component, data, screen = "defaultscreen", queue = true) {
        return this.projectTo(component, data, screen, queue, true);
    }
    stopProjecting(screen = "defaultscreen") {
        if (this.projecting.has(screen)) {
            (this.projecting.get(screen) || []).pop();
        }
        let _screen = this.screens.get(screen);
        if (_screen && _screen.currentView) {
            _screen.currentView = null;
            _screen.model = null;
            if (this.projecting.has(screen)) {
                let s = this.projecting.get(screen);
                if (s && s.length) {
                    let m = s.pop();
                    if (m)
                        this.projectTo(m.component, m.model, screen, m.queue, !!m.promise);
                }
            }
            return true;
        }
        return false;
    }
}
exports.Projector = Projector;
