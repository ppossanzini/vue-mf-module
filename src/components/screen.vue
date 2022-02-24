<script lang="ts">
import { prop, Vue } from "vue-class-component";
import { type IProjectableModel, Projector } from "../helpers/Projector";

class Props {
  name = prop({type: String, default: "defaultscreen"})
}

export default class Screen extends Vue.with(Props) {
  currentView: any = null;
  model: IProjectableModel<any> | null = null;

  get isVisible() {
    return this.currentView != null;
  }

  mounted() {
    Projector.Instance.setScreen(this, this.name);
  }
}

</script>

<template>
  <div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="model" :key="model"></component></div>
</template>