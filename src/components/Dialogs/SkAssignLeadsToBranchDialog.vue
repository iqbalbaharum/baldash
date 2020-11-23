<template>
  <modal-dialog ref="dialog" name="assignlead">
    <q-card style="width:2000px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign Leads to Branch
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-7 q-mb-md">
              Assigning {{ tableSelection.length }} lead(s) to a branch
            </div>
            <q-select
              v-model="selectedBranchId"
              outlined
              :options="branches"
              label="Selected branch"
              emit-value
              map-options
              stack-label
            />
          </div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section v-if="tableSelection.length !== 0 && selectedBranchId">
          <div class="full-width row justify-between items-center">
            <q-list
              bordered
              padding
              class="col-6"
              style="height: 300px"
            >
              <q-item-label header>
                Leads to be assigned
              </q-item-label>
              <q-item v-for="selection in tableSelection" :key="selection.$id">
                <q-item-label> {{ selection.name }} </q-item-label>
              </q-item>
            </q-list>
            <q-icon
              class="col-4"
              name="fas fa-long-arrow-alt-right"
              size="md"
              color="grey"
            />
            <p class="text-h6 text-center text-grey-9 col q-mb-none">
              {{ selectedBranchName }}
            </p>
          </div>
        </q-card-section>
        <q-card-actions v-if="tableSelection.length !== 0 && selectedBranchId" class="justify-center">
          <q-btn label="assign" @click="onAssignLeads" />
        </q-card-actions>
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
      selectedBranchId: '',
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
      console.log('opts', opts)
      return opts
    },
    selectedBranchName() {
      if (!this.selectedBranchId) return ''

      return this.branches.find(branch =>
        branch.value === this.selectedBranchId
      ).label
    }
  },

  methods: {
    async onAssignLeads() {
      const leads = [...this.tableSelection]
      const branchId = this.selectedBranchId

      for (const lead of leads) {
        try {
          const data = {
            lead: { ...lead },
            branchId
          }

          await this.$store.dispatch('AssignLeadToBranch', data)
          this.$notify('success', `Successfully assigned lead to branch ${this.selectedBranchName}`)
        } catch (e) {
          const message = e.response.message.error
          this.$notify('error', message)
        }
      }

      this.$refs.dialog.$children[0].hide()
    }
  }
}

</script>
