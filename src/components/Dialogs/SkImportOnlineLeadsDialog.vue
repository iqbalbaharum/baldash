<template>
  <modal-dialog name="importonlineleads">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Import
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Upload a .xslx or .csv file which contain this leads data, and auto populate the online leads.
      </q-card-section>

      <q-card-section>
        <q-uploader
          label="Upload file"
          :factory="factoryFn"
          full-width
          class="justify-center"
          accept=".xlsx, .csv"
          square
          flat
          bordered
          @added="fileAdded"
          @rejected="onRejected"
        />
      </q-card-section>
      <q-card-section align="right">
        <q-btn
          v-close-popup
          flat
          color="primary"
          label="Cancel"
        />
        <q-btn
          flat
          color="primary"
          label="Select"
        />
      </q-card-section>
    </q-card>
  </modal-dialog>
</template>

<script>
import ModalDialog from './../ModalDialog'

export default {
  components: {
    ModalDialog
  },
  methods: {
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
