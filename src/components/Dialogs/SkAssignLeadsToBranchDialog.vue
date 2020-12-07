<template>
  <modal-dialog
    ref="dialog"
    name="qualifyOL"
    @close-dialog="reset"
  >
    <q-card style="width:2000px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign Leads to Branch
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
              Branch assignments
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
              Assign branch to qualified lead
            </div>
            <q-select
              v-model="form.branchId"
              outlined
              :options="branches"
              label="Assign to Branch"
              emit-value
              map-options
              stack-label
              class="col"
            />
            <q-input
              v-model="form.noteToBranch"
              type="textarea"
              outlined
              label="Remark"
              class="col"
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
                label="assign"
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
import Branch from './../../models/Branch'
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
    branches() {
      const branches = Branch.all()
      const opts = branches.map((branch) => {
        const container = {}
        container.label = branch.name.charAt(0).toUpperCase() + branch.name.slice(1)
        container.value = branch.uuid
        return container
      })
      return opts
    },
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
    selectedBranchName() {
      if (!this.selectedBranchId) return ''

      return this.branches.find(branch =>
        branch.value === this.selectedBranchId
      ).label
    }
  },

  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
      this.getBranchRecommendation()
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
    async getBranchRecommendation() {
      this.selectedBranchId = ''
      try {
        await this.$store.dispatch('getRecommendedBranch')
          .then(res => {
            this.form.branchId = res.branch
            this.suggestedBranchId = res.branch
          })
      } catch (e) {
        this.$notify('error', e)
      }
    },
    async onAssignLeads() {
      const lead = { ...this.form }

      try {
        Lead.update({
          where: lead.$id,
          data: lead
        })
        await this.$store.dispatch('AssignLeadToBranch', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Successfully assigned lead to branch ${this.selectedBranchName}`)
      } catch (e) {
        console.log(e)
        const message = e.response.message.error
        this.$notify('error', message)
      }
    }
  }
}

</script>
