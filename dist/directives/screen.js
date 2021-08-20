const projectToDirective = {
    inserted: (el, bind) => {
        ScreensManager.Instance.injectTo(el, bind.arg);
    },
    unbind: (el, bind) => {
        ScreensManager.Instance.removeFrom(el, bind.arg);
    }
};
const screenDirective = {
    bind: (el, binding) => {
        if (!el)
            return;
        ScreensManager.Instance.setScreen(el, binding.arg);
    }
};
export default {
    projectToDirective, screenDirective
};
export class ScreensManager {
    constructor() {
        this.screens = new Map();
    }
    static get Instance() { return ScreensManager.instance; }
    static set Instance(v) { this.instance = v; }
    injectTo(domElement, screen) {
        if (!domElement || !screen)
            return;
        var element = this.screens.has(screen) ? this.screens.get(screen) : null;
        try {
            domElement.parentElement && domElement.removeChild(domElement);
        }
        catch { }
        if (element)
            element.append(domElement);
    }
    removeFrom(domElement, screen) {
        if (!domElement || !screen)
            return;
        var element = this.screens.has(screen) ? this.screens.get(screen) : null;
        try {
            if (element)
                element.removeChild(domElement);
        }
        catch { }
    }
    setScreen(screen, name = "defaultscreen") {
        this.screens.set(name, screen);
    }
}
ScreensManager.instance = new ScreensManager();
