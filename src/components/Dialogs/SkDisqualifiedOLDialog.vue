<template>
  <modal-dialog
    ref="dialog"
    name="disqualifyOL"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Disqualified Lead
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

            <q-separator class="q-my-md" />

            <template v-if="selectedLeadId">
              <div class="text-weight-bold text-uppercase text-grey-5">
                Lead detail
              </div>

              <div class="col ">
                <q-input
                  v-model="form.name"
                  outlined
                  label="Name"
                  disable
                />
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

              <div class="text-weight-bold text-uppercase text-grey-5">
                Reasons
              </div>

              <q-input
                v-model="form.rejectReason"
                outlined
                label="Reject Reason"
                type="textarea"
                class="col"
                placeholder="E.g Unreachable, Lost Interest or Non Purchase Query"
              />

              <q-separator />

              <div align="right">
                <q-btn
                  v-close-popup
                  flat
                  color="primary"
                  label="Cancel"
                />
                <q-btn
                  color="negative"
                  label="Disqualify"
                  @click="onDisqualifiedLead"
                />
              </div>
            </template>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import Branch from './../../models/Branch'
import ModalDialog from './../ModalDialog'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedLeadId: '',
      form: {}
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
    branches() {
      const branches = Branch.all()
      const opts = branches.map((branch) => {
        const container = []
        container.label = branch.name.charAt(0).toUpperCase() + branch.name.slice(1)
        container.value = branch.uuid
        return container
      })
      return opts
    },
    selections() {
      const selections = this.$store.getters.tableSelection
      const opts = selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })

      return opts
    }
  },
  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    }
  },

  mounted() {
    this.form = {}
  },

  methods: {
    reset() {
      this.selectedLeadId = ''
      this.form = {}
    },
    async onDisqualifiedLead() {
      const lead = { ...this.form }
      // this.selectedLeadId = this.$store.getters.tableSelection[0]
      try {
        await this.$store.dispatch('DisqualifiedOnlineLead', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `${lead.name} have been disqualified`)
      } catch (e) {
        console.log(e)
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}

</script>
