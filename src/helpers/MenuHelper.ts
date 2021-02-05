import { TinyEmitter } from 'tiny-emitter';

export interface IMenuDefinition {
  name: string,
  description: string,
  icon?: string,
  routeName?: string,
  routeParams?: object,
  featureflags?: string[],
  orderIndex?: number,
  class?: string,
  hidden: () => boolean
}


export enum menuType {
  drawer,       // Drawer Menu
  bottom,       // Bottom Menu
  header
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

    for (const element of positions) {

      this.menuStructure[element.section] = this.menuStructure[element.section] || {};
      this.menuStructure[element.section][element.parent || menuDefinition.name] = this.menuStructure[element.section][element.parent || menuDefinition.name] || [];

      if (element.parent)
        this.menuStructure[element.section][element.parent].push(menuDefinition.name);
    }

    this.notifications.emit(MenuNotifications.menuDefinitionAdded, menuDefinition);
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
          .sort((a, b) => {
            if (a && b && a.orderIndex && b.orderIndex && a.orderIndex > b.orderIndex) return 1;
            if (a && b && a.orderIndex && b.orderIndex && a.orderIndex < b.orderIndex) return -1;
            return 0
          })
      };

      if (!!rr.item) {
        used.add(key);
        element.forEach(i => used.add(i));
        result.push(rr);
      }
    }
    return result.filter(i => !!i.item)
      .sort((a, b) => {
        if (a && b && a.item && b.item && a.item.orderIndex && b.item.orderIndex && a.item.orderIndex > b.item.orderIndex) return 1;
        if (a && b && a.item && b.item && a.item.orderIndex && b.item.orderIndex && a.item.orderIndex < b.item.orderIndex) return -1;
        return 0
      });
  }
}

