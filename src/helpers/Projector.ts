
import { Component, ComponentPublicInstance } from "vue";

export interface IProjectableModel<T> {
  data: T; resolve: (item: T) => void; reject: () => void;
}

export class Projector {
  private static instance = new Projector();
  static get Instance(): Projector { return Projector.instance }
  static set Instance(v: Projector) { this.instance = v; }

  private screens = new Map<string, any>();
  private projecting = new Map<string, { component: Component, model: IProjectableModel<any>, promise: Promise<any> | null, queue: boolean }[]>();

  setScreen(screen: ComponentPublicInstance, name: string = "defaultscreen") {
    this.screens.set(name, screen);
  }



  projectTo<T>(component: Component, data: T | null = null, screen: string = "defaultscreen", queue: boolean = true, async: boolean = false): Promise<T> | null {
    const model = { data } as IProjectableModel<T>;
    const promise = async ? new Promise<T>((resolve, reject) => { model.reject = reject; model.resolve = resolve }) : null;

    if (!queue) {

      this.projecting.set(screen, [{ component, model, promise, queue }]);
    } else {
      if (!this.projecting.has(screen)) {
        this.projecting.set(screen, []);
      }
      (this.projecting.get(screen) || []).push({ component, model, promise, queue });
    }

    const ss = this.screens.get(screen);
    if (!ss) return null;
    ss.model = model;
    ss.currentView = component;

    if (promise) promise.then(() => this.stopProjecting(screen)).catch(() => this.stopProjecting(screen));
    return promise;
  }

  projectAsyncTo<T>(component: Component, data: T, screen: string = "defaultscreen", queue: boolean = true) {
    return this.projectTo(component, data, screen, queue, true)
  }

  stopProjecting(screen: string = "defaultscreen") {
    if (this.projecting.has(screen)) {
      (this.projecting.get(screen) || []).pop()
    }

    let _screen = this.screens.get(screen)
    if (_screen && _screen.currentView) {
      _screen.model = null;
      _screen.screenModel = null;
      _screen.currentView = null;

      if (this.projecting.has(screen)) {
        let s = this.projecting.get(screen);
        if (s && s.length) {
          let m = s.pop();
          if (m) this.projectTo(m.component, m.model, screen, m.queue, !!m.promise);
        }
      }

      return true;
    }
    return false;
  }
}

export interface Projectable<T> {
  value: {
    data: T,
    resolve: (item: T) => void;
    reject: () => void;
  };
}