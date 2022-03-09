<!-- <script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { IProjectableModel } from "..";
// import { type IProjectableModel, Projector } from "../helpers/Projector";

class Props {
  name = prop({ type: String, default: "defaultscreen" });
}

@Options({})
export default class ScreenComponent extends Vue.with(Props) {
  currentView: any = null;
  model: IProjectableModel<any> | null = null;

  get isVisible() {
    return this.currentView != null;
  }

  mounted() {
    // Projector.Instance.setScreen(this, this.name);
  }
}
</script> -->

<template>
  <div v-if="isVisible">
    <component
      v-if="currentView"
      v-bind:is="currentView"
      :value="model"
      :key="model"
    ></component>
  </div>
</template>

<script lang="ts">
import { type IProjectableModel, Projector } from "@/helpers/Projector";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Screen",
  props: {
    name: { type: String, default: "defaultscreen" },
  },
  data() {
    return {
      currentView: null,
      model: null as IProjectableModel<any> | null,
    };
  },
  mounted() {
    Projector.Instance.setScreen(this, this.name);
  },
  computed: {
    isVisible() {
      return this.currentView !== null;
    },
  },
});
</script>
