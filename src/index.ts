import { IMenuDefinition, MenuHelper, menuType } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";
import Inject from "./components/inject";
import Screen from "./components/screen";
import { VueConstructor } from "vue";
import { Projector, IProjectableModel, Projectable } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";


export {
  MenuHelper,
  IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService,
  Inject, Screen,
  ValidateDirective, Projectable, IProjectableModel
}


function install(Vue: VueConstructor<Vue>) {
  Vue.component("screen", Screen);
  Vue.component("inject", Inject);
  Vue.directive("screen", directives.screenDirective);
  Vue.directive("projectTo", directives.projectToDirective);
  Vue.directive("validate", ValidateDirective as any);
}
export default { install }

export interface IModuleInitializer {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any): Promise<void>,

  config?(menu: MenuHelper,
    store: IStore,
    configuration: any): Promise<void>,

  run?(menu: MenuHelper,
    store: IStore,
    configuration: any): Promise<void>,

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
    }): Promise<void>,
  config(menu: MenuHelper,
    store: IStore): Promise<void>,
  run(menu: MenuHelper,
    store: IStore): Promise<void>,
  routes: IRouteConfig[]
}

export function ModuleInitializer(opts: IModuleInitializer) {
  let moduleConfig = {};
  return {
    async init(menu: MenuHelper, store: IStore, configuration: any,
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
      moduleConfig = configuration;
      return opts.init(menu, store, configuration);
    },
    async config(menu: MenuHelper, store: IStore) {
      return opts.config ? opts.config(menu, store, moduleConfig) : null;
    },
    async run(menu: MenuHelper, store: IStore) {
      return opts.run ? opts.run(menu, store, moduleConfig) : null;
    },
    routes: opts.routes
  } as IModuleInitializerWrapper
}

export function InitModule(module: any, store: IStore, configuration: any | undefined): Promise<void> {
  var initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.init(MenuHelper.Instance, store, configuration || {},
    {
      registry: CommonRegistry.Instance,
      messageService: MessageService.Instance,
      projector: Projector.Instance,
      screens: ScreensManager.Instance
    });
}

export function ConfigModule(module: any, store: IStore): Promise<void> {
  var initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.config(MenuHelper.Instance, store);
}


export function RunModule(module: any, store: IStore): Promise<void> {
  var initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.run(MenuHelper.Instance, store);
}

export function ModuleRoutes(module: any): IRouteConfig[] {
  var initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.routes;
}

