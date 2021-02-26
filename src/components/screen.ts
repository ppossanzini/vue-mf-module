import Vue from "vue";
import Component from "vue-class-component";
import { IProjectableModel, Projector } from "../helpers/Projector";

@Component({
  props: {
    name: { type: String, default: "defaultscreen" },
  },
  template: `<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="model"></component></div>`
})
export default class Screen extends Vue {
  name!: string;
  currentView: any = null;
  model: IProjectableModel<any> | null = null;

  get isVisible() {
    return this.currentView != null || (this.$el && this.$el.children && this.$el.children.length);
  }

  mounted() {
    Projector.Instance.setScreen(this, this.name);
  }
}