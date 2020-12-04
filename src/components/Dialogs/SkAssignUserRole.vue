<template>
  <modal-dialog
    ref="dialog"
    name="userassignrole"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            User Role Edit
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
                Select user roles
              </div>
              <q-option-group
                v-model="form.roles"
                :options="rolesOpt"
                label="Roles"
                type="checkbox"
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
                  color="primary"
                  label="Update"
                  @click="onUpdateUser"
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
import User from '../../models/User'
import { mapGetters } from 'vuex'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedUserId: '',
      form: {
        roles: []
      }
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
    rolesOpt() {
      const roles = Role.all()
      const opts = roles.map((role) => {
        const container = {}
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

        this.loadUserRole(selection.uuid)
        return container
      })

      return opts
    }
  },

  watch: {
    selectedUserId(newValue, oldValue) {
      const user = User.query().where('uuid', this.selectedUserId).withAll().first()
      this.form.roles = []
      if (user.roles) {
        for (const ro of user.roles) {
          this.form.roles.push(ro.uuid)
        }
      }
    }
  },

  async created() {
    await this.$store.dispatch('GetAllRoles')
  },

  methods: {
    reset() {
      this.selectedUserId = ''
      this.form = {}
    },
    async loadUserRole(id) {
      try {
        await this.$store.dispatch('GetUserRoles', id)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
    async onUpdateUser() {
      try {
        for (const role of this.form.roles) {
          await this.$store.dispatch('AssignUserRole', {
            userId: this.selectedUserId,
            roleId: role
          })
        }

        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `User with name ${this.form.name} updated!`)
      } catch (e) {
        console.log(e)
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}
</script>
