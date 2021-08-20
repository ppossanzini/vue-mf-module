var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import Component from "vue-class-component";
import { CommonRegistry } from "../helpers/CommonRegistry";
let Inject = class Inject extends Vue {
    get Value() { return this.value; }
    set Value(v) { this.$emit("input", v); }
    get Components() {
        if (this.name)
            return [CommonRegistry.Instance.getComponent(this.name, this.group)];
        if (this.group)
            return CommonRegistry.Instance.getGroupComponents(this.group, ...(this.names || []));
        return CommonRegistry.Instance.getComponents(...(this.names || []));
    }
    click(...args) { this.$emit('click', ...args); }
    save(...args) { this.$emit('save', ...args); }
};
Inject = __decorate([
    Component({
        props: {
            id: { default: null },
            type: { default: null, type: String },
            value: { default: null },
            name: { type: String, default: null },
            names: { type: [], default: null },
            group: { type: String, default: null },
            metadata: { type: Object, default: null },
            disabled: { type: Boolean, default: false },
            readonly: { type: Boolean, default: false }
        },
        template: `<div><component :is="c"  v-for="(c, idx) in Components" :disabled="disabled" :readonly="readonly" :key="idx" :id="id" :type="type" :metadata="metadata" v-model="Value" @click="click" @save="save" /></div>`
    })
], Inject);
export default Inject;
