<template>
  <modal-dialog
    name="delete"
    style="height:500px"
  >
    <q-card>
      <q-card-section class="bg-black text-white">
        <div class="text-h6">
          Are you sure?
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        Do you really want to delete this
        <span class="text-weight-bold">{{ tableSelection.length }} record(s)</span> ?
      </q-card-section>

      <q-card-section class="row items-center text-negative text-weight-bold">
        This process cannot be undone
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-dark">
        <q-btn
          v-close-popup
          flat
          label="Cancel"
        />
        <q-btn
          label="Delete"
          color="negative"
          @click="onClickDelete"
        />
      </q-card-actions>
    </q-card>
  </modal-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalDialog from './../ModalDialog'

export default {
  components: {
    ModalDialog
  },
  computed: {
    ...mapGetters([
      'datatabs',
      'activeDataTab',
      'tableSelection'
    ])
  },
  methods: {
    onClickDelete() {
      this.tableSelection.forEach(async data => {
        try {
          await this.$store.dispatch('DeleteData', data.uuid)
          // this.$notify('success', 'Delete item successful!')
        } catch (e) {
          const message = e.response.data.error.message
          console.log(message)
          // this.$notify('error', `Error: ${message}`)
        }
      })

      this.$store.dispatch('OnTableSelection', [])
    }
  }
}
</script>
