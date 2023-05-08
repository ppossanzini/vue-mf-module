import { TinyEmitter } from 'tiny-emitter';

export interface IMenuDefinition {
  name: string,
  description: string,
  icon?: string,
  routeName?: string,
  routeParams?: object,
  featureflags?: string[],
  orderIndex?: number,
  parents?: string[],
  class?: string,
  meta?: any,
  hidden: () => boolean
}


export enum menuType {
  drawer = 0,
  settings = 1,
  header = 2,
  footer = 3
}

export const MenuNotifications = {
  menuDefinitionAdded: 'newmenuitem'
}

export class MenuHelper {

  private menuDefinitions: IMenuDefinition[] = [];
  private menuStructure: { [key: string]: { [key: string]: string[] } } = {}
  private notifications: TinyEmitter = new TinyEmitter();
  private static instance = new MenuHelper();
  public get Notifications() { return this.notifications; }
  public static get Instance() { return MenuHelper.instance }

  public addMenuDefinition(menuDefinition: IMenuDefinition, ...positions: { section: menuType, parent?: string }[]) {

    // Aggiungo la dichiarazione del menuù all'elenco dei menù disponibili.
    let found = this.menuDefinitions.find(m => m.name == menuDefinition.name);
    if (!found)
      this.menuDefinitions.push(menuDefinition);
    else
      menuDefinition = found;

    menuDefinition.parents = [];

    for (const element of positions) {

      this.menuStructure[element.section] = this.menuStructure[element.section] || {};
      this.menuStructure[element.section][element.parent || menuDefinition.name] = this.menuStructure[element.section][element.parent || menuDefinition.name] || [];

      if (element.parent) {
        this.menuStructure[element.section][element.parent].push(menuDefinition.name);
        menuDefinition.parents.push(element.parent);
      }

    }

    this.notifications.emit(MenuNotifications.menuDefinitionAdded, menuDefinition);
  }

  public moveMenu(name: string, parent: string, section: menuType) {

    let result = this.menuDefinitions.find(i => i.name == name);

    if (result) {
      // remove menu from existing positions:
      for (const p of result?.parents ?? []) {
        let currentparent = this.menuStructure[section][p];
        if (currentparent) {
          let r = currentparent.indexOf(name);
          if (r >= 0) currentparent.splice(r, 1);
        }
      }

      this.menuStructure[section][parent || name] = this.menuStructure[section][parent || name] || [];
      this.menuStructure[section][parent].push(name)
    }

    return result;
  }


  public getMenuItem(name: string): IMenuDefinition | undefined {
    return this.menuDefinitions.find(i => i.name == name);
  }

  public getMenu(menu: menuType): { item: IMenuDefinition | undefined, children: (IMenuDefinition | undefined)[] }[] {
    let result: { item: IMenuDefinition | undefined, children: (IMenuDefinition | undefined)[] }[] = [];
    let used = new Set<string>();

    for (const key in this.menuStructure[menu]) {
      const element = this.menuStructure[menu][key];


      let rr = {
        item: this.menuDefinitions.find(m => {
          return m.name == key &&
            (!m.hidden || !m.hidden())
        }),

        children: element.map(i => this.menuDefinitions.find(m => m.name == i && (!m.hidden || !m.hidden())))
          .filter(i => !!i)
          .sort((a, b) => (a?.orderIndex ?? 0) - (b?.orderIndex ?? 0))
      };

      if (!!rr.item) {
        used.add(key);
        element.forEach(i => used.add(i));
        result.push(rr);
      }
    }
    return result.filter(i => !!i.item)
      .sort((a, b) => (a?.item?.orderIndex ?? 0) - (b?.item?.orderIndex ?? 0))
  }
}

