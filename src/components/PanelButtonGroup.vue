<template>
  <div>
    <div class="row q-pt-sm">
      <div
        v-for="(group) in buttons"
        :key="group.category"
      >
        <panel-button
          :links="group.tos"
        />
        <div class="text-caption text-center text-grey-6">
          {{ group.category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelButton from './PanelButton'

export default {
  components: {
    PanelButton
  },

  props: {
    buttons: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {

    }
  },
}
</script>
