<template>
  <div class="q-pa-md">
    <q-form
      class="q-gutter-md"
    >
      <q-input
          filled
          v-model="form.name"
          label="Your name *"
        />
      <q-input
          filled
          v-model="form.name"
          label="Your name *"
        />
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        email: ''
      }
    }
  },
}
</script>