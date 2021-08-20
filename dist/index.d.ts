import { IMenuDefinition, MenuHelper, menuType } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject";
import Screen from "./components/screen";
import { VueConstructor } from "vue";
import { Projector, IProjectableModel, Projectable } from "./helpers/Projector";
import { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
export { MenuHelper, IMenuDefinition, menuType, CommonRegistry, MessageService, Inject, Screen, ValidateDirective, Projectable, IProjectableModel };
declare function install(Vue: VueConstructor<Vue>): void;
declare const _default: {
    install: typeof install;
};
export default _default;
export interface IModuleInitializer {
    init(menu: MenuHelper, store: IStore, configuration: any): void;
    routes: IRouteConfig[];
}
interface IModuleInitializerWrapper {
    init(menu: MenuHelper, store: IStore, configuration: any, options: {
        registry: CommonRegistry;
        messageService: MessageService;
        projector: Projector;
        screens: ScreensManager;
    }): void;
    routes: IRouteConfig[];
}
export declare function ModuleInitializer(opts: IModuleInitializer): IModuleInitializerWrapper;
export declare function InitModule(module: any, store: IStore, configuration: any | undefined): IModuleInitializer;
