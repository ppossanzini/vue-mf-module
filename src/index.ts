import { RouteConfig } from "vue-router";
import { Store } from "vuex"
import { IMenuDefinition, MenuHelper, menuType } from "./helpers/MenuHelper";

export {
  MenuHelper,
  IMenuDefinition,
  menuType
}

export interface IModuleInitializer {
  init(menu: MenuHelper,
    store: Store<any>,
    configuration: any): void,
  routes: RouteConfig[]
}

export class ModuleInitializer {
  constructor(
    public init: (menu: MenuHelper, store: Store<any>, configuration: any) => void,
    public routes: RouteConfig[]) {
  }
}




