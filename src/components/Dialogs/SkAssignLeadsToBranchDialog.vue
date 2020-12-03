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

            <q-separator class="q-my-md" />

            <div class="text-weight-bold text-uppercase text-grey-5">
              Branch assignments
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
              Assign branch to qualified lead
            </div>
            <q-select
              v-model="form.branchId"
              outlined
              :options="branches"
              label="Selected branch"
              emit-value
              map-options
              stack-label
              class="col"
            />
            <div class="row justify-end text-decoration-none">
              <q-btn flat @click="onClickRecommendation">
                Recommend a branch
              </q-btn>
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
                label="assign"
                color="primary"
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
        const container = {}
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
    }
  },

  methods: {
    reset() {
      this.selectedLeadId = ''
      this.form = {}
    },
    async onClickRecommendation() {
      console.log('test')
      this.selectedBranchId = ''
      await this.$store.dispatch('getRecommendedBranch')
        .then(res => {
          console.log(res)
          this.selectedBranchId = res.data
        })
    },
    async onAssignLeads() {
      const lead = { ...this.form }
      console.log('lead', lead)
      try {
        Lead.update({
          where: lead.$id,
          data: lead
        })
        await this.$store.dispatch('AssignLeadToBranch', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Successfully assigned lead to branch ${this.selectedBranchName}`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    }
  }
}

</script>
