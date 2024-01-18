import { type IMenuDefinition, MenuHelper, menuType, MenuNotifications } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import inject from "./components/inject.vue";
import screen from "./components/screen.vue"
import { Projector, type IProjectableModel, type Projectable } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
import { RouteRecordRaw } from "vue-router";


function install(Vue: { component: any, directive: any }) {
  Vue.component("screen", screen);
  Vue.component("inject", inject);
  Vue.directive("screen", directives.screenDirective);
  Vue.directive("projectTo", directives.projectToDirective);
  Vue.directive("validate", ValidateDirective as any);
}
export interface IModuleInitializerWrapper {
  init(menu: MenuHelper,
    configuration: any
    , options: {
      registry: CommonRegistry,
      messageService: typeof MessageService.Instance,
      projector: Projector,
      screens: ScreensManager
    }): Promise<void>,
  config(menu: MenuHelper): Promise<void>,
  run(menu: MenuHelper): Promise<void>,
  routes: RouteRecordRaw[]
}


export interface IModuleInitializer {
  init(vuemf: typeof VueMfModule, menu: MenuHelper, configuration: any): Promise<void>,

  config?(menu: MenuHelper, configuration: any): Promise<void>,

  run?(menu: MenuHelper, configuration: any): Promise<void>,

  routes: RouteRecordRaw[]
}

export function ModuleInitializer(opts: IModuleInitializer) {
  let moduleConfig = {};
  return {
    init(menu: MenuHelper, configuration: any,
      options: {
        registry: CommonRegistry,
        messageService: typeof MessageService.Instance,
        projector: Projector,
        screens: ScreensManager
      }) {

      if (options.registry) CommonRegistry.Instance = options.registry;
      if (options.messageService) MessageService.Instance = options.messageService
      if (options.projector) Projector.Instance = options.projector;
      if (options.screens) ScreensManager.Instance = options.screens;
      moduleConfig = configuration;
      return opts.init(VueMfModule, menu, configuration);
    },
    config(menu: MenuHelper) {
      return opts.config ? opts.config(menu, moduleConfig) : null;
    },
    run(menu: MenuHelper) {
      return opts.run ? opts.run(menu, moduleConfig) : null;
    },
    routes: opts.routes
  } as IModuleInitializerWrapper
}

export async function InitModule(module: { default: IModuleInitializerWrapper }, configuration: any | undefined): Promise<IModuleInitializer> {
  const initobj = ((module.default as any).default || module.default) as IModuleInitializerWrapper;
  return initobj.init(MenuHelper.Instance, configuration || {},
    {
      registry: CommonRegistry.Instance,
      messageService: MessageService.Instance,
      projector: Projector.Instance,
      screens: ScreensManager.Instance
    }).then(() => {
      return initobj as unknown as IModuleInitializer;
    });
}

export function ConfigModule(module: any): Promise<void> {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.config(MenuHelper.Instance);
}


export function RunModule(module: any): Promise<void> {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.run(MenuHelper.Instance);
}

export function ModuleRoutes(module: any): RouteRecordRaw[] {
  const initobj = (module.default.default || module.default) as IModuleInitializerWrapper;
  return initobj.routes;
}


export {
  MenuHelper,
  type IMenuDefinition,
  menuType,
  CommonRegistry,
  MessageService,
  inject,
  screen,
  ValidateDirective,
  type Projectable,
  type IProjectableModel,
  MenuNotifications,
  Projector,
}

const VueMfModule = {
  install,
  MenuHelper: new MenuHelper(),
  menuType,
  CommonRegistry: new CommonRegistry(),
  MessageService: MessageService,
  inject,
  screen,
  ValidateDirective,
  MenuNotifications,
  Projector
}

export default VueMfModule;