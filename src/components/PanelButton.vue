<template>
  <div class="row">
    <div
      v-for="(link) in links"
      :key="link.name"
    >
      <!--
      Show tooltip explaining why the button is disabled.

      Tooltip will not work if we hover on disabled button.
      So we have to wrap the button with a div, and make the tooltip show when the div is hovered
      -->
      <q-tooltip v-if="isButtonDisabled(link)">
        {{ link.disabledTooltipText }}
      </q-tooltip>

      <q-btn
        :disable="isButtonDisabled(link)"
        stack
        flat
        :active="link === link.name"
        active-class="text-primary"
        class="font-weight-light text-negative"
        padding="sm md"
        @click="onButtonClick(link.name)"
      >
        <q-icon :name="link.icon" style="font-size: 1.4em;" />
        <span class="text-capitalize text-grey-8 text-weight-medium q-pt-sm">{{ link.label }}</span>
      </q-btn>
    </div>
    <q-separator
      vertical
      inset
      spaced
    />
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    onButtonClick(btnName) {
      this.$store.dispatch('ModalOpen', btnName)
    },
    isButtonDisabled(btn) {
      // Button.disabled can be function too.
      // Here we return the value of the function call if it is a function.
      // We pass the store's state as parameter so the disabled function can do some processing.
      if (typeof btn.disabled === 'function') { return btn.disabled(this.$store.state) }

      return btn.disabled
    },
  },
}
</script>
