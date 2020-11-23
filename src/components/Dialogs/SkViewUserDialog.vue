<template>
  <modal-dialog ref="dialog" name="viewuser">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            View/Edit User
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Select a user
            </div>
            <q-select
              v-model="selectedUserId"
              outlined
              :options="selections"
              label="Selected user"
              emit-value
              map-options
              stack-label
            />

            <q-separator class="q-my-md" />

            <template v-if="selectedUserId">
              <div class="text-weight-bold text-uppercase text-grey-5">
                User detail
              </div>

              <div class="col">
                <q-input
                  v-model="form.name"
                  outlined
                  readonly
                  label="Fullname"
                />
              </div>
              <div class="row ">
                <q-input
                  v-model="form.SCCode"
                  class="col"
                  outlined
                  readonly
                  label="SC Code"
                />
                <q-input
                  v-model="form.mobile"
                  class="col q-pl-xs"
                  outlined
                  readonly
                  label="Telephone No."
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.email"
                  outlined
                  readonly
                  label="Email"
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.branchId"
                  outlined
                  readonly
                  :options="branches"
                  label="Branch"
                  emit-value
                  map-options
                  stack-label
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.role"
                  outlined
                  readonly
                  :options="roles"
                  label="Roles"
                  stack-label
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

import Role from '../../models/Role'
import Branch from '../../models/Branch'
import { mapGetters } from 'vuex'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedUserId: '',
      form: {},
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
    roles() {
      const roles = Role.all()
      const opts = roles.map((role) => {
        const container = []
        container.label = role.name.charAt(0).toUpperCase() + role.name.slice(1)
        container.value = role.uuid
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
    selectedUserId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    }
  },

  async created() {
    await this.$store.dispatch('GetAllRoles')
    await this.$store.dispatch('GetAllBranches')
  },

  methods: {
    async onUpdateUser() {
      try {
        await this.$store.dispatch('UpdateUser', this.form)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `User with name ${this.form.name} updated!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}
</script>
