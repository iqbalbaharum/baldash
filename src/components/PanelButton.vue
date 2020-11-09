<template>
  <div class="row">
    <q-btn
      v-for="(link) in links"
      :key="link.name"
      :disable="link.disabled"
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
    }
  },
}
</script>
