"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_class_component_1 = __importDefault(require("vue-class-component"));
const Projector_1 = require("../helpers/Projector");
let Screen = class Screen extends vue_1.default {
    name;
    currentView = null;
    model = null;
    get isVisible() {
        return this.currentView != null;
    }
    mounted() {
        Projector_1.Projector.Instance.setScreen(this, this.name);
    }
};
Screen = __decorate([
    (0, vue_class_component_1.default)({
        props: {
            name: { type: String, default: "defaultscreen" },
        },
        template: `<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="model" :key="model"></component></div>`
    })
], Screen);
exports.default = Screen;
