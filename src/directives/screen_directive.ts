import type { Directive } from "vue";

const projectToDirective: Directive = {

  beforeMount: (el: Element, bind) => {
    if (bind.arg)
      ScreensManager.Instance.injectTo(el, bind.arg);
  },
  unmounted: (el: Element, bind) => {
    if (bind.arg)
      ScreensManager.Instance.removeFrom(el, bind.arg)
  }
}

const screenDirective: Directive = {
  beforeMount: (el, binding) => {
    if (!el) return;
    ScreensManager.Instance.setScreen(el, binding.arg);
  }
}

export default {
  projectToDirective, screenDirective
}

export class ScreensManager {
  private static instance = new ScreensManager();
  static get Instance(): ScreensManager { return ScreensManager.instance }
  static set Instance(v: ScreensManager) { this.instance = v; }
  private screens = new Map<string, Element>();


  injectTo(domElement: Element, screen: string) {
    if (!domElement || !screen) return;
    var element = this.screens.has(screen) ? this.screens.get(screen) : null;
    try { domElement.parentElement && domElement.removeChild(domElement); } catch { }
    if (element) element.append(domElement);
  }

  removeFrom(domElement: Element, screen: string) {
    if (!domElement || !screen) return;
    var element = this.screens.has(screen) ? this.screens.get(screen) : null;
    try { if (element) element.removeChild(domElement) } catch { }
  }

  setScreen(screen: Element, name: string = "defaultscreen") {
    this.screens.set(name, screen);
  }
}