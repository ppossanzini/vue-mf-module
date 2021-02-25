import Vue from "vue";
import Component from "vue-class-component";
import { IProjectableModel, Projector } from "../helpers/Projector";

@Component({
  props: {
    name: { type: String }
  },
  template: `<div v-show="isVisible"><component v-bind:is="currentView" :deferred="deferred" v-model="model"></component></div>`
})
export default class Screen extends Vue {
  name!: string;
  currentView: any = null;
  model!: IProjectableModel<any> | null;

  get isVisible() {
    return this.currentView != null || (this.$el.children && this.$el.children.length);
  }

  mounted() {
    Projector.Instance.setScreen(this, this.name);
  }
}