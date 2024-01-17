import { computed, defineComponent } from "vue";
import { CommonRegistry } from "../helpers/CommonRegistry";

export default defineComponent({
  name: "inject",
  props: {
    id: { default: null },
    type: { default: null, type: String },
    value: { default: null },
    name: { type: String, default: null },
    names: { type: Array<string>, default: null },
    group: { type: String, default: null },
    metadata: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },
  setup(props, { emit }) {


    const Value = computed({
      get: () => { return props.value },
      set: (v) => { emit("input", v); }
    })

    const Components = computed(() => {
      if (props.name)
        return [CommonRegistry.Instance.getComponent(props.name, props.group)];
      if (props.group)
        return CommonRegistry.Instance.getGroupComponents(props.group, ...(props.names || []));
      return CommonRegistry.Instance.getComponents(...(props.names || []));
    });

    const click = (...args: any[]) => { emit('click', ...args) }
    const save = (...args: any[]) => { emit('save', ...args) }

    return {
      id: props.id,
      type: props.type,
      value: props.value,
      name: props.name,
      names: props.names,
      group: props.group,
      metadata: props.metadata,
      disabled: props.disabled,
      readonly: props.readonly,
      click,
      save,
      Components,
      Value,
    }
  }

});
