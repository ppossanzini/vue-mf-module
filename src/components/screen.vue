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
