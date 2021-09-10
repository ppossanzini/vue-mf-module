import { TinyEmitter } from 'tiny-emitter';
export interface IMenuDefinition {
    name: string;
    description: string;
    icon?: string;
    routeName?: string;
    routeParams?: object;
    featureflags?: string[];
    orderIndex?: number;
    class?: string;
    hidden: () => boolean;
}
export declare enum menuType {
    drawer = 0,
    bottom = 1,
    header = 2
}
export declare const MenuNotifications: {
    menuDefinitionAdded: string;
};
export declare class MenuHelper {
    private menuDefinitions;
    private menuStructure;
    private notifications;
    private static instance;
    get Notifications(): TinyEmitter;
    static get Instance(): MenuHelper;
    addMenuDefinition(menuDefinition: IMenuDefinition, ...positions: {
        section: menuType;
        parent?: string;
    }[]): void;
    getMenuItem(name: string): IMenuDefinition | undefined;
    getMenu(menu: menuType): {
        item: IMenuDefinition | undefined;
        children: (IMenuDefinition | undefined)[];
    }[];
}
