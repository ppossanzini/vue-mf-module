<script lang="ts">
import { prop, Vue } from "vue-class-component";
import { CommonRegistry } from "../helpers/CommonRegistry";

const emit = defineEmits({
  input: null,
  click: null,
  save: null
});

class Props {
  id = prop({ default: null });
  type = prop({ default: null, type: String });
  value = prop({ default: null });
  name = prop({ type: String, default: null });
  names = prop({ type: [], default: null });
  group = prop({ type: String, default: null });
  metadata = prop({ type: Object, default: null });
  disabled = prop({ type: Boolean, default: false });
  readonly = prop({ type: Boolean, default: false });
}

export default class Inject extends Vue.with(Props) {
  get Value() { return this.value }
  set Value(v) { emit("input", v); }

  get Components() {

    if (this.name)
      return [CommonRegistry.Instance.getComponent(this.name, this.group)];
    if (this.group)
      return CommonRegistry.Instance.getGroupComponents(this.group, ...(this.names || []));
    return CommonRegistry.Instance.getComponents(...(this.names || []));
  }

  click(...args: any[]) { emit('click', ...args) }
  save(...args: any[]) { emit('save', ...args) }
}

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
      v-model="Value"
      @click="click"
      @save="save"
    />
  </div>
</template>