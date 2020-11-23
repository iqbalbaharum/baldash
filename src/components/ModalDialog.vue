<template>
  <q-dialog
    ref="dialog"
    position="right"
    style="width: 700px; max-width: 80vw;"
    full-height
    @hide="onClose"
  >
    <slot />
  </q-dialog>
</template>

<script>
export default {

  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },

  computed: {
    isActive() {
      return this.$store.getters.activeModal === this.name
    },
    isOpen() {
      return this.$store.getters.allOpen.includes(this.name)
    }
  },

  watch: {
    isActive(newValue, oldValue) {
      if (newValue) {
        this.$refs.dialog.show()
      } else {
        this.$refs.dialog.hide()
      }
    }
  },

  beforeDestroy() {
    if (this.isOpen) {
      this.onClose()
    }
  },

  methods: {
    onClose() {
      this.$store.dispatch('ModalClose', this.name)
      this.$emit('close-dialog')
    }
  },
}
</script>
