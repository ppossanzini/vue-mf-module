export declare class CommonRegistry {
    private registry;
    private groupedregistry;
    private serviceregistry;
    private groupedserviceregistry;
    private static instance;
    static get Instance(): CommonRegistry;
    static set Instance(v: CommonRegistry);
    provideComponent(component: any, name: string, group?: string): void;
    getComponent(name: string, group?: string): any | null;
    getComponents(...name: string[]): (any)[];
    getGroupComponents(group: string, ...name: string[]): (any)[];
    getGroupComponentsKeys(group: string): (string)[];
    provideService(name: string, service: any, group?: string): void;
    getService<T>(name: string): T;
    getGroupServices(group: string, ...name: string[]): (any)[];
}
