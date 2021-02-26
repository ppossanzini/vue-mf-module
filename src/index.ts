import { IMenuDefinition, MenuHelper, menuType } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject";
import Screen from "./components/screen";
import { VueConstructor } from "vue";
import { Projector } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";

export {
  MenuHelper,
  IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService,
  Inject, Screen,
}


function install(Vue: VueConstructor<Vue>) {
  Vue.component("screen", Screen);
  Vue.component("inject", Inject);
  Vue.directive("screen", directives.screenDirective);
  Vue.directive("projectTo", directives.projectToDirective);
}
export default { install }

export interface IModuleInitializer {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any): void,
  routes: IRouteConfig[]
}

interface IModuleInitializerWrapper {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any,
    options: {
      registry: CommonRegistry,
      messageService: MessageService,
      projector: Projector,
      screens: ScreensManager
    }): void,
  routes: IRouteConfig[]
}

export function ModuleInitializer(opts: IModuleInitializer) {
  return {
    init(menu: MenuHelper, store: IStore, configuration: any,
      options: {
        registry: CommonRegistry,
        messageService: MessageService,
        projector: Projector,
        screens: ScreensManager
      }) {

      if (options.registry) CommonRegistry.Instance = options.registry;
      if (options.messageService) MessageService.Instance = options.messageService
      if (options.projector) Projector.Instance = options.projector;
      if (options.screens) ScreensManager.Instance = options.screens;

      opts.init(menu, store, configuration);
    },
    routes: opts.routes
  } as IModuleInitializerWrapper
}

export function InitModule(module: any, store: IStore, configuration: any | undefined) {
  var initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  initobj.init(MenuHelper.Instance, store, configuration || {}, {
    registry: CommonRegistry.Instance,
    messageService: MessageService.Instance,
    projector: Projector.Instance,
    screens: ScreensManager.Instance
  });

  return initobj as IModuleInitializer;
}




