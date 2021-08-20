import { TinyEmitter } from 'tiny-emitter';
export var menuType;
(function (menuType) {
    menuType[menuType["drawer"] = 0] = "drawer";
    menuType[menuType["bottom"] = 1] = "bottom";
    menuType[menuType["header"] = 2] = "header";
})(menuType || (menuType = {}));
export const MenuNotifications = {
    menuDefinitionAdded: 'newmenuitem'
};
export class MenuHelper {
    constructor() {
        this.menuDefinitions = [];
        this.menuStructure = {};
        this.notifications = new TinyEmitter();
    }
    get Notifications() { return this.notifications; }
    static get Instance() { return MenuHelper.instance; }
    addMenuDefinition(menuDefinition, ...positions) {
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
    getMenuItem(name) {
        return this.menuDefinitions.find(i => i.name == name);
    }
    getMenu(menu) {
        let result = [];
        let used = new Set();
        for (const key in this.menuStructure[menu]) {
            const element = this.menuStructure[menu][key];
            let rr = {
                item: this.menuDefinitions.find(m => {
                    return m.name == key &&
                        (!m.hidden || !m.hidden());
                }),
                children: element.map(i => this.menuDefinitions.find(m => m.name == i && (!m.hidden || !m.hidden())))
                    .filter(i => !!i)
                    .sort((a, b) => {
                    if (a && b && a.orderIndex && b.orderIndex && a.orderIndex > b.orderIndex)
                        return 1;
                    if (a && b && a.orderIndex && b.orderIndex && a.orderIndex < b.orderIndex)
                        return -1;
                    return 0;
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
            if (a && b && a.item && b.item && a.item.orderIndex && b.item.orderIndex && a.item.orderIndex > b.item.orderIndex)
                return 1;
            if (a && b && a.item && b.item && a.item.orderIndex && b.item.orderIndex && a.item.orderIndex < b.item.orderIndex)
                return -1;
            return 0;
        });
    }
}
MenuHelper.instance = new MenuHelper();
