<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { CommonRegistry } from "../helpers/CommonRegistry";

export default defineComponent({
  props: {
    id: { default: null },
    type: { default: null, type: String },
    value: { default: null },
    name: { type: String, default: null },
    names: { type: [] as PropType<Array<string>>, default: null },
    group: { type: String, default: null },
    metadata: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  emits: ["input", "click", "save"],
  computed: {
    Value() {
      return this.value;
    },
    Components() {
      if (this.name)
        return [CommonRegistry.Instance.getComponent(this.name, this.group)];
      if (this.group)
        return CommonRegistry.Instance.getGroupComponents(
          this.group,
          ...(this.names || [])
        );
      return CommonRegistry.Instance.getComponents(...(this.names || []));
    },
  },
  methods: {
    setValue(val: any) {
      this.$emit("input", val);
    },
    click(...args: any[]) {
      this.$emit("click", ...args);
    },
    save(...args: any[]) {
      this.$emit("save", ...args);
    },
  },
});
</script>

<template>
  <div>
    <component
      :is="c"
      v-for="(c, idx) in Components"
      :disabled="disabled"
      :readonly="readonly"
      :key="idx"
      :id="id"
      :type="type"
      :metadata="metadata"
      :value="value"
      v-on:input="(v: any) => $emit('input', v)"
      @click="click"
      @save="save"
    />
  </div>
</template>
