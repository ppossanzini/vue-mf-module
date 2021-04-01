import Vue from "vue";
import Component from "vue-class-component";
import { CommonRegistry } from "../helpers/CommonRegistry";

@Component({
  props: {
    id: { default: null },
    type: { default: null, type: String },
    value: { default: null },
    name: { type: String, default: null },
    names: { type: [], default: null },
    group: { type: String, default: null }
  },
  template: `<div><component :is="c"  v-for="(c, idx) in Components" :key="idx" :id="id" :type="type" v-model="Value" /></div>`
})
export default class Inject extends Vue {

  id!: string | number | null;
  type!: string | null;
  value!: any;
  name!: string | null;
  names!: string[] | null;
  group?: string;

  get Value() { return this.value }
  set Value(v) { this.$emit("input", v); }

  get Components() {

    if (this.name)
      return [CommonRegistry.Instance.getComponent(this.name, this.group)];
    if (this.group)
      return CommonRegistry.Instance.getGroupComponents(this.group, ...(this.names || []));
    return CommonRegistry.Instance.getComponents(...(this.names || []));
  }
}