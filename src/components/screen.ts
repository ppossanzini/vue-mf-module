import { Component, computed, defineComponent, getCurrentInstance, onMounted, Ref, ref } from "vue";
import { IProjectableModel, Projector } from "../helpers/Projector";

export default defineComponent({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" },
  },
  setup(props, { expose }) {

    const me = getCurrentInstance();

    const currentView: Ref<Component> = ref(null!);
    const model: Ref<IProjectableModel<any> | null> = ref(null!);

    expose({ currentView, model })

    const isVisible = computed(() => {
      return currentView.value != null;
    })

    const currentViewUID = computed(() => {
      return (currentView.value as any)?.__file
    })

    onMounted(() => {
      Projector.Instance.setScreen((me as any).proxy, props.name);
    })

    return {
      currentViewUID,
      currentView,
      model,
      isVisible
    }
  },

})