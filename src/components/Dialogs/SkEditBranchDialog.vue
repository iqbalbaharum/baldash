<template>
  <modal-dialog ref="dialog" name="editbranch">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            View/Edit Branch
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Select a branch
            </div>
            <q-select
              v-model="selectedBranchId"
              outlined
              :options="selections"
              label="Selected branch"
              emit-value
              map-options
              stack-label
            />

            <q-separator class="q-my-md" />

            <template v-if="selectedBranchId">
              <div class="text-weight-bold text-uppercase text-grey-5">
                Branch detail
              </div>

              <div class="col ">
                <q-input
                  v-model="form.name"
                  outlined
                  label="Branch Name"
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.code"
                  class="col"
                  outlined
                  label="Branch Code"
                />
                <q-input
                  v-model="form.type"
                  class="col q-pl-xs"
                  outlined
                  label="Branch Type"
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.telno"
                  class="col"
                  outlined
                  label="Telephone No."
                />
                <q-input
                  v-model="form.faxno"
                  class="col q-pl-xs"
                  outlined
                  label="Fax No."
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.email"
                  outlined
                  label="Email"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.address1"
                  outlined
                  label="Address"
                  aria-rowcount="2"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.address2"
                  outlined
                  label=""
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.state"
                  outlined
                  label="State"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.country"
                  outlined
                  label="Country"
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.SSMNo"
                  outlined
                  label="SSM No."
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.GSTNo"
                  outlined
                  label="GST No"
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.logo"
                  outlined
                  label="Logo"
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.branchId"
                  outlined
                  :options="branches"
                  label="Branch"
                  emit-value
                  map-options
                  stack-label
                />
              </div>
              <div>
                <q-item-section />
              </div>
              <div align="right">
                <q-btn
                  v-close-popup
                  flat
                  color="primary"
                  label="Cancel"
                />
                <q-btn
                  color="primary"
                  label="Update"
                  @click="onEditBranch"
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
      selectedBranchId: '',
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
    selectedBranchId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    }
  },

  methods: {
    async onEditBranch() {
      const branch = { ...this.form }
      try {
        await this.$store.dispatch('UpdateBranch', branch)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Branch with name ${branch.name} updated!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}

</script>
