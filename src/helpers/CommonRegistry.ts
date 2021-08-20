import Vue from "vue";

export class CommonRegistry {

  private registry = {}
  private groupedregistry = new Map<string, Map<string, any>>();
  private serviceregistry = new Map<string, any>();
  private groupedserviceregistry = new Map<string, Map<string, any>>();


  private static instance: CommonRegistry = new CommonRegistry();
  static get Instance() { return this.instance; }
  static set Instance(v: CommonRegistry) { this.instance = v };

  provideComponent(component: any, name: string, group?: string) {
    //@ts-ignore
    if (group?.indexOf("-") >= 0 || name.indexOf("-")) throw "grour or name is invalid! name: " + name + (group ? "; group: " + group : "");
    Vue.set(this.registry, group ? `${group}-${name}` : name, component);
    // this.registry.set(group ? `${group}-${name}` : name, component);
    // if (group) {
    //   if (!this.groupedregistry.has(group)) this.groupedregistry.set(group, new Map<string, any>());

    //   let gg = this.groupedregistry.get(group);
    //   if (gg) gg.set(name, component);
    // }
  }

  getComponent(name: string, group?: string): any | null {
    //@ts-ignore
    if (group?.indexOf("-") >= 0 || name.indexOf("-")) throw "grour or name is invalid! name: " + name + (group ? "; group: " + group : "");
    return this.registry[group ? `${group}-${name}` : name] || null;
  }

  getComponents(...name: string[]): (any)[] {
    return Array.from(Object.entries(this.registry)).filter(i => name.indexOf(i[0]) >= 0).map(i => i[1]);
  }

  getGroupComponents(group: string, ...name: string[]): (any)[] {
    let g = this.groupedregistry.get(group);
    if (g)
      return Array.from(g.entries() || []).filter(i => (!name || name.length == 0) || name.indexOf(i[0]) >= 0).map(i => i[1]);
    return []
  }

  getGroupComponentsKeys(group: string): (string)[] {
    let g = this.groupedregistry.get(group);
    if (g) return Array.from(g.keys());
    return []
  }

  provideService(name: string, service: any, group?: string) {
    this.serviceregistry.set(name, service);
    if (group) {
      if (!this.groupedserviceregistry.has(group)) this.groupedserviceregistry.set(group, new Map<string, any>());
      let gg = this.groupedserviceregistry.get(group);
      if (gg) gg.set(name, service);
    }
  }

  getService<T>(name: string) {
    return (this.serviceregistry.get(name) || null) as T;
  }

  getGroupServices(group: string, ...name: string[]): (any)[] {
    let g = this.groupedserviceregistry.get(group);
    if (g)
      return Array.from(g.entries() || []).filter(i => (!name || name.length == 0) || name.indexOf(i[0]) >= 0).map(i => i[1]);
    return []
  }
}