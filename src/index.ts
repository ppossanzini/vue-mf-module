import { type IMenuDefinition, MenuHelper, menuType, MenuNotifications } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import type { IRouteConfig } from "./interfaces/RouterInterfaces";
import type { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject.vue";
import Screen from "./components/screen.vue";
import { Projector, type IProjectableModel, type Projectable } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
import type { App } from 'vue';


export {
  MenuHelper,
  IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService,
  Inject, Screen,
  MenuNotifications,
  ValidateDirective, Projectable, IProjectableModel
}


function install(app: App) {
  app.component("screen", Screen);
  app.component("inject", Inject);
  app.directive("screen", directives.screenDirective);
  app.directive("projectTo", directives.projectToDirective);
  app.directive("validate", ValidateDirective as any);
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
    configuration: any
    , options: {
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
  initobj.init(MenuHelper.Instance, store, configuration || {},
    {
      registry: CommonRegistry.Instance,
      messageService: MessageService.Instance,
      projector: Projector.Instance,
      screens: ScreensManager.Instance
    });

  return initobj as IModuleInitializer;
}




