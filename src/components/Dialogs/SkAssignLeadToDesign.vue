<template>
  <modal-dialog
    ref="dialog"
    name="assigntodesign"
    @close-dialog="reset"
  >
    <q-card style="width:2000px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign Leads to Design Proposal
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Select a lead
            </div>
            <q-select
              v-model="selectedLeadId"
              outlined
              :options="selections"
              label="Selected lead"
              emit-value
              map-options
              stack-label
            />

            <q-separator />

            <div class="text-weight-bold text-uppercase text-grey-5">
                Lead Details
            </div>

            <div class="col ">
              <q-input
                v-model="form.email"
                outlined
                label="Email"
                disable
              />
            </div>

            <div class="col ">
              <q-input
                v-model="form.phone"
                outlined
                label="Mobile"
                disable
              />
            </div>

            <q-separator />

            <div align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Cancel"
              />
              <q-btn
                label="submit"
                color="primary"
                :disabled="selectedLeadId === ''"
                @click="onAssignLeads"
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import ModalDialog from './../ModalDialog'
import Lead from './../../models/Lead'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedLeadId: '',
      form: {
        branchId: ''
      },
      suggestedBranchId: ''
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
    selections() {
      const selections = this.$store.getters.tableSelection
      if (!selections.length) return []
      if (!selections[0] instanceof Lead) return []

      const opts = selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })

      return opts
    },
  },

  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    },
    selections(newValue, oldValue) {
      if (!newValue.length) return
      this.selectedLeadId = this.selections[0].value
    }
  },

  methods: {
    reset() {
      this.selectedLeadId = ''
      this.form = {}
    },
    async onAssignLeads() {
      const lead = { ...this.form }

      try {
        Lead.update({
          where: lead.$id,
          data: lead
        })
        await this.$store.dispatch('AssignLeadToDesign', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Successfully assigned lead to Design Proposal`)
      } catch (e) {
        console.log(e)
        const message = e.response.message.error
        this.$notify('error', message)
      }
    }
  }
}

</script>
