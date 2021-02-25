
import Screen from "../components/screen";

export interface IProjectableModel<T> {
  data: T; resolve: (item: T) => void; reject: () => void;
}

export class Projector {
  private static instance = new Projector();
  static get Instance() :Projector { return Projector.instance }
  static set Instance(v: Projector) { this.instance = v; }

  private screens = new Map<string, Screen>();
  private projecting = new Map<string, { component: Vue, model: IProjectableModel<any>, promise: Promise<any> | null, queue: boolean }[]>();

  setScreen(screen, name: string = "default") {
    this.screens.set(name, screen);
  }



  projectTo<T>(component: Vue, data: T, screen: string = "default", queue: boolean = false, async: boolean = false): Promise<T> | null {
    var model = { data } as IProjectableModel<T>;
    let promise = async ? new Promise<T>((resolve, reject) => { model.reject = reject; model.resolve = resolve }) : null;

    if (!queue) {

      this.projecting.set(screen, [{ component, model, promise, queue }]);
    } else {
      if (!this.projecting.has(screen)) {
        this.projecting.set(screen, []);
      }
      (this.projecting.get(screen) || []).push({ component, model, promise, queue });
    }

    let ss = this.screens.get(screen);
    if (!ss) return null;
    ss.model = model;
    ss.currentView = component;

    if (promise) promise.then(() => this.stopProjecting(screen)).catch(() => this.stopProjecting(screen));
    return promise;
  }

  projectAsyncTo<T>(component: Vue, data: T, screen: string = "default", queue: boolean = false) {
    return this.projectTo(component, data, screen, queue, true)
  }

  stopProjecting(screen: string = "default") {
    if (this.projecting.has(screen)) {
      (this.projecting.get(screen) || []).pop()
    }

    let _screen = this.screens.get(screen)
    if (_screen && _screen.currentView) {
      _screen.currentView = null;
      _screen.model = null;

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