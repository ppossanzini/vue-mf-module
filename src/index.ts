import { IMenuDefinition, MenuHelper, menuType } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import { IRouteConfig } from "./interfaces/RouterInterfaces";
import { IStore } from "./interfaces/StoreInterfaces";

export {
  MenuHelper,
  IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService
}

export interface IModuleInitializer {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any): void,
  routes: IRouteConfig[]
}

interface IModuleInitializerWrapper {
  init(menu: MenuHelper,
    store: IStore,
    configuration: any, registry: CommonRegistry, messageService: MessageService): void,
  routes: IRouteConfig[]
}

export function ModuleInitializer(opts: IModuleInitializer) {
  return {
    init(menu: MenuHelper, store: IStore, configuration: any, registry: CommonRegistry, messageService: MessageService) {
      if (registry)
      CommonRegistry.Instance = registry;

      if (messageService)
        MessageService.Instance = messageService;

      opts.init(menu, store, configuration);
    },
    routes: opts.routes
  } as IModuleInitializerWrapper
}

export function InitModule(module: any, store: IStore, configuration: any | undefined) {
  var initobj = module.default.default as IModuleInitializerWrapper;
  initobj.init(MenuHelper.Instance, store, configuration || {}, CommonRegistry.Instance, MessageService.Instance);

  return initobj as IModuleInitializer;
}




