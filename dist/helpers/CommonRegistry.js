import Vue from "vue";
export class CommonRegistry {
    constructor() {
        this.registry = {};
        this.groupedregistry = new Map();
        this.serviceregistry = new Map();
        this.groupedserviceregistry = new Map();
    }
    static get Instance() { return this.instance; }
    static set Instance(v) { this.instance = v; }
    ;
    provideComponent(component, name, group) {
        //@ts-ignore
        if (group?.indexOf("-") >= 0 || name.indexOf("-"))
            throw "grour or name is invalid! name: " + name + (group ? "; group: " + group : "");
        Vue.set(this.registry, group ? `${group}-${name}` : name, component);
        // this.registry.set(group ? `${group}-${name}` : name, component);
        // if (group) {
        //   if (!this.groupedregistry.has(group)) this.groupedregistry.set(group, new Map<string, any>());
        //   let gg = this.groupedregistry.get(group);
        //   if (gg) gg.set(name, component);
        // }
    }
    getComponent(name, group) {
        //@ts-ignore
        if (group?.indexOf("-") >= 0 || name.indexOf("-"))
            throw "grour or name is invalid! name: " + name + (group ? "; group: " + group : "");
        return this.registry[group ? `${group}-${name}` : name] || null;
    }
    getComponents(...name) {
        return Array.from(Object.entries(this.registry)).filter(i => name.indexOf(i[0]) >= 0).map(i => i[1]);
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
CommonRegistry.instance = new CommonRegistry();
