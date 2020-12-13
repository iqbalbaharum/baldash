<template>
  <modal-dialog
    ref="dialog"
    name="qualifyQL"
    @close-dialog="reset"
    @show-dialog="onShowDialog"
  >
    <q-card style="width:2000px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign Leads to Sales Consultant
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
              Lead assignments
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
              Assign leads to Sales Consultant
            </div>
            <div>
              <q-select
                v-model="form.userId"
                outlined
                :options="salesConsultantsOptions"
                label="Selected sales consultant"
                :disable="!salesConsultantsOptions.length"
                emit-value
                map-options
                stack-label
                class="col"
              />
              <q-tooltip v-if="!salesConsultantsOptions.length">
                There are no Sales Consultant in your branch.
              </q-tooltip>
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
import Role from '../../models/Role'
import ModalDialog from './../ModalDialog'
// import Lead from './../../models/Lead'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedLeadId: '',
      salesConsultants: [],
      form: {},
      selections: [],
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
    salesConsultantsOptions() {
      if (!this.salesConsultants.length) return []

      const opts = this.salesConsultants.map((user) => {
        const container = {}
        container.label = user.name
        container.value = user.uuid
        return container
      })
      return opts
    },
    selectedSCName() {
      if (!this.form.userId) return ''

      return this.salesConsultantsOptions.find(sc =>
        sc.value === this.form.userId
      ).label
    }
  },

  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    },
  },

  methods: {
    async onShowDialog() {
      this.selections = this.$store.getters.tableSelection
      if (!this.selections.length) return

      this.selections = this.selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })
      this.selectedLeadId = this.selections[0].value

      await this.$store.dispatch('GetAllRoles')
      const scRoleId = Role.query().where('name', 'salesconsultant').first().$id
      const filter = {
        where: {
          branchId: this.$store.state.user.branchId
        }
      }
      this.salesConsultants = (await this.$store.dispatch('GetRoleUsers', { id: scRoleId, filter })).data
    },

    reset() {
      this.selectedLeadId = ''
      this.form = {}
    },
    async onAssignLeads() {
      const lead = { ...this.form }
      try {
        await this.$store.dispatch('AssignLeadToSC', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Successfully assigned lead to ${this.selectedSCName}`)
      } catch (e) {
        console.log(e)
        const message = e.response.message.error
        this.$notify('error', message)
      }
    }
  }
}

</script>
