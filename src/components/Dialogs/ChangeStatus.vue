<template>
  <modal-dialog
    ref="dialog"
    name="changeentitystatus"
    @show-dialog="onShowDialog"
  >
    <q-card style="width:1800px">
      <div class="q-gutter-sm justify">
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Change service status
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-weight-bold text-uppercase text-grey-5">
            Select a request
          </div>
          <q-select
            v-model="selectedVehicleId"
            outlined
            :options="selections"
            label="Selected Requester"
            emit-value
            map-options
            stack-label
          />

          <q-separator class="q-my-md" />

          <template v-if="selectedVehicleId">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Request detail
            </div>

            <q-select
              v-model="form.status"
              :options="opts.status"
              label="New Status"
              emit-value
              map-options
              filled
              stack-label
            />

            <q-separator class="q-my-md" />

            <div align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Cancel"
              />
              <q-btn
                color="primary"
                label="Submit"
                @click="onChangeStatus"
              />
            </div>
          </template>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import ModalDialog from './../ModalDialog'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },

  data() {
    return {
      selectedVehicleId: '',
      form: {},
      selections: [],
      opts: {
        status: [
          {
            label: 'New Request',
            value: 'new'
          },
          {
            label: 'Pickup',
            value: 'pickup'
          },
          {
            label: 'On Service',
            value: 'service'
          },
          {
            label: 'Complete',
            value: 'complete'
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
  },

  watch: {
    selectedVehicleId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    }
  },

  methods: {
    async onShowDialog() {
      if (!this.$store.getters.tableSelection.length) return

      this.selections = this.$store.getters.tableSelection
      this.selections = this.selections.map(selection => {
        const container = {}
        container.label = selection.metadata.contactName
        container.value = selection.uuid
        return container
      })
      this.selectedVehicleId = this.selections[0].value
    },

    async onChangeStatus() {
      try {
        this.$store.dispatch('ChangeStatus', this.form)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Status updated!`)
      } catch (e) {
        console.log(e)
        const message = e.response?.message?.error
        this.$notify('error', message)
      }
    }
  }
}
</script>
