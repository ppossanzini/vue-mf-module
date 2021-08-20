declare const _default: {
    projectToDirective: {
        inserted: (el: Element, bind: any) => void;
        unbind: (el: Element, bind: any) => void;
    };
    screenDirective: {
        bind: (el: any, binding: any) => void;
    };
};
export default _default;
export declare class ScreensManager {
    private static instance;
    static get Instance(): ScreensManager;
    static set Instance(v: ScreensManager);
    private screens;
    injectTo(domElement: Element, screen: string): void;
    removeFrom(domElement: Element, screen: string): void;
    setScreen(screen: any, name?: string): void;
}
