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

  private static menuDefinitions: IMenuDefinition[] = [];
  private static menuStructure: { [key: string]: { [key: string]: string[] } } = {}

  private static notifications: TinyEmitter = new TinyEmitter();
  public static get Notifications() { return MenuHelper.notifications; }

  public static addMenuDefinition(menuDefinition: IMenuDefinition, ...positions: { section: menuType, parent?: string }[]) {

    // Aggiungo la dichiarazione del menuù all'elenco dei menù disponibili.
    let found = MenuHelper.menuDefinitions.find(m => m.name == menuDefinition.name);
    if (!found)
      MenuHelper.menuDefinitions.push(menuDefinition);
    else
      menuDefinition = found;

    for (const element of positions) {

      MenuHelper.menuStructure[element.section] = MenuHelper.menuStructure[element.section] || {};
      MenuHelper.menuStructure[element.section][element.parent || menuDefinition.name] = MenuHelper.menuStructure[element.section][element.parent || menuDefinition.name] || [];

      if (element.parent)
        MenuHelper.menuStructure[element.section][element.parent].push(menuDefinition.name);
    }

    MenuHelper.notifications.emit(MenuNotifications.menuDefinitionAdded, menuDefinition);
  }

  public static getMenuItem(name: string): IMenuDefinition | undefined {
    return MenuHelper.menuDefinitions.find(i => i.name == name);
  }

  public static getMenu(menu: menuType): { item: IMenuDefinition | undefined, children: (IMenuDefinition | undefined)[] }[] {
    let result: { item: IMenuDefinition | undefined, children: (IMenuDefinition | undefined)[] }[] = [];
    let used = new Set<string>();

    for (const key in MenuHelper.menuStructure[menu]) {
      const element = MenuHelper.menuStructure[menu][key];


      let rr = {
        item: MenuHelper.menuDefinitions.find(m => {
          return m.name == key &&
            (!m.hidden || !m.hidden())
        }),

        children: element.map(i => MenuHelper.menuDefinitions.find(m => m.name == i && (!m.hidden || !m.hidden())))
          .filter(i => !!i)
          .sort((a, b) => {
            if (a?.orderIndex && b?.orderIndex && a.orderIndex > b.orderIndex) return 1;
            if (a?.orderIndex && b?.orderIndex && a.orderIndex < b.orderIndex) return -1;
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
        if (a?.item?.orderIndex && b?.item?.orderIndex && a.item.orderIndex > b.item.orderIndex) return 1;
        if (a?.item?.orderIndex && b?.item?.orderIndex && a.item.orderIndex < b.item.orderIndex) return -1;
        return 0
      });
  }

}

