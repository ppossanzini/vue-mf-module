

export class ComponentRegistry {

  private static registry = new Map<string, Vue>()
  private static groupedregistry = new Map<string, Map<string, Vue>>();


  static provideComponent(component: Vue, name: string, group?: string) {
    ComponentRegistry.registry.set(group ? `${group}-${name}` : name, component);
    if (group) {
      if (!ComponentRegistry.groupedregistry.has(group)) ComponentRegistry.groupedregistry.set(group, new Map<string, Vue>());

      ComponentRegistry.groupedregistry[group].set(name, component);
    }
  }

  static getComponent(name: string, group?: string): Vue | null {
    return ComponentRegistry.registry.get(group ? `${group}-${name}` : name) ?? null;
  }

  static getComponents(...name: string[]): Vue[] {
    return Array.from(ComponentRegistry.registry.entries()).filter(i => name.indexOf(i[0]) >= 0).map(i => i[1]);
  }

  static getGroupComponents(group: string, ...name: string[]): Vue[] {
    return Array.from(ComponentRegistry.groupedregistry.get(group)?.entries() || []).filter(i => name.indexOf(i[0]) >= 0).map(i => i[1]);
  }

}