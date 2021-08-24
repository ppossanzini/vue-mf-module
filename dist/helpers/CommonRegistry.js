"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRegistry = void 0;
class CommonRegistry {
    constructor() {
        this.registry = new Map();
        this.groupedregistry = new Map();
        this.serviceregistry = new Map();
        this.groupedserviceregistry = new Map();
    }
    static get Instance() { return this.instance; }
    static set Instance(v) { this.instance = v; }
    ;
    provideComponent(component, name, group) {
        this.registry.set(group ? `${group}-${name}` : name, component);
        if (group) {
            if (!this.groupedregistry.has(group))
                this.groupedregistry.set(group, new Map());
            let gg = this.groupedregistry.get(group);
            if (gg)
                gg.set(name, component);
        }
    }
    getComponent(name, group) {
        return this.registry.get(group ? `${group}-${name}` : name) || null;
    }
    getComponents(...name) {
        return Array.from(this.registry.entries()).filter(i => name.indexOf(i[0]) >= 0).map(i => i[1]);
    }
    getGroupComponents(group, ...name) {
        let g = this.groupedregistry.get(group);
        if (g)
            return Array.from(g.entries() || []).filter(i => (!name || name.length == 0) || name.indexOf(i[0]) >= 0).map(i => i[1]);
        return [];
    }
    getGroupComponentsKeys(group) {
        let g = this.groupedregistry.get(group);
        if (g)
            return Array.from(g.keys());
        return [];
    }
    provideService(name, service, group) {
        this.serviceregistry.set(name, service);
        if (group) {
            if (!this.groupedserviceregistry.has(group))
                this.groupedserviceregistry.set(group, new Map());
            let gg = this.groupedserviceregistry.get(group);
            if (gg)
                gg.set(name, service);
        }
    }
    getService(name) {
        return (this.serviceregistry.get(name) || null);
    }
    getGroupServices(group, ...name) {
        let g = this.groupedserviceregistry.get(group);
        if (g)
            return Array.from(g.entries() || []).filter(i => (!name || name.length == 0) || name.indexOf(i[0]) >= 0).map(i => i[1]);
        return [];
    }
}
exports.CommonRegistry = CommonRegistry;
CommonRegistry.instance = new CommonRegistry();
