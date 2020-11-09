<template>
  <modal-dialog name="deleteuser" style="height:500px">
    <q-card>
      <q-card-section class="bg-black text-white">
        <div class="text-h6">
          Are you sure?
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <span class="q-ml-sm">Do you really want to delete this user? This process cannot be undone</span>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-dark">
        <q-btn
          flat
          label="Cancel"
          @click="onClickCancel"
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
import ModalDialog from './../ModalDialog'

export default {
  components: {
    ModalDialog
  },
  methods: {
    onClickCancel() {
      this.dialog.id = ''
      this.dialog.confirm = false
    },
    onClickDelete() {
      this.$emit('delete', this.dialog.id)
      this.dialog.id = ''
      this.dialog.confirm = false
    },

  }
}
</script>
