<template>
  <q-dialog
    v-model="showDialog"
    full-width
    @hide="onClose"
  >
    <q-card>
      <q-uploader
        color="black"
        label="Upload Excel/CSV file"
        :factory="factoryFn"
        multiple
        style="width: 100%; height: 100%"
        accept=".xlsx, .csv"
        @added="fileAdded"
        @rejected="onRejected"
      />
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    onClose() {
      this.$emit('close', null)
    },
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    fileAdded(files) {
      console.log(files)
    },
    factoryFn(files) {
      console.log(this.$repository.lead.upload(files[0]))
    }
  }
}
</script>
