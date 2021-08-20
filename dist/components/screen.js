var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import Component from "vue-class-component";
import { Projector } from "../helpers/Projector";
let Screen = class Screen extends Vue {
    constructor() {
        super(...arguments);
        this.currentView = null;
        this.model = null;
    }
    get isVisible() {
        return this.currentView != null;
    }
    mounted() {
        Projector.Instance.setScreen(this, this.name);
    }
};
Screen = __decorate([
    Component({
        props: {
            name: { type: String, default: "defaultscreen" },
        },
        template: `<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="model" :key="model"></component></div>`
    })
], Screen);
export default Screen;
