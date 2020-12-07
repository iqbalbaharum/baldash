<template>
  <modal-dialog
    ref="dialog"
    name="qualifyQL"
    @close-dialog="reset"
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
            <q-select
              v-model="form.userId"
              outlined
              :options="salesConsultantsOptions"
              label="Selected sales consultant"
              emit-value
              map-options
              stack-label
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
import Lead from './../../models/Lead'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedLeadId: '',
      salesConsultants: [],
      form: {}
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
    selections() {
      const selections = this.$store.getters.tableSelection
      if (!selections.length) return []

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

      return this.users.find(branch =>
        branch.value === this.selectedBranchId
      ).label
    }
  },

  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
      console.log(this.form)
    },
    selections(newValue, oldValue) {
      if (!newValue.length) return

      this.selectedLeadId = newValue[0].value
    }
  },

  async created() {
    await this.$store.dispatch('GetAllRoles')
    const id = Role.query().where('name', 'salesconsultant').first().$id
    const filter = {
      where: {
        branchId: this.$store.state.user.branchId
      }
    }
    this.salesConsultants = (await this.$store.dispatch('GetRoleUsers', { id, filter })).data
  },

  methods: {
    reset() {
      this.selectedLeadId = ''
      this.form = {}
    },
    async onAssignLeads() {
      const lead = { ...this.form }
      console.warn('lead', lead)
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
