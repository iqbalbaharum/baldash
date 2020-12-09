<template>
  <modal-dialog
    ref="dialog"
    name="assignScope"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Assign scope access to modules
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
                Roles
              </div>
              <q-form ref="myForm" @submit="onAssignUser">
                <div class="q-gutter-sm justify">
                  <div class="col">
                    <q-select
                      v-model="form.role"
                      outlined
                      :options="options.roles"
                      stack-label
                      label="Roles"
                      :error="$v.form.role.$error"
                      @input="onInputFormRole"
                    />
                  </div>
                  <div class="text-negative">
                    {{ errormessage }}
                  </div>
                  <div class="text-negative">
                    {{ errormessage2 }}
                  </div>

                  <div class="text-weight-bold text-uppercase text-grey-5">
                    Scope Access
                  </div>

                  <!-- tick all -->
                  <q-checkbox
                    v-model="allPermission.selected"
                    class="text-uppercase"
                    label="Select All"
                    @input="onClickAllPermissions"
                  />
                  <div
                    v-for="permission in permissionOptions"
                    :key="permission.$id"
                    class="text-uppercase"
                  >
                    <q-checkbox v-model="permission.selected" :label="permission.nameDisplay" />
                  </div>

                  <q-separator class="q-my-md" />

                  <div align="right">
                    <q-btn
                      v-close-popup
                      flat
                      color="primary"
                      label="Cancel"
                    />
                    <q-btn
                      color="primary"
                      label="Submit"
                      :disabled="errormessage.length > 0 || errormessage2.length > 0"
                      @click="onAssignUser"
                    />
                  </div>
                </div>
              </q-form>
            </template>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import RolePermissionType from '../../types/role-permissions'
import Profile from '../../models/Profile'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import User from './../../models/User'
import ModalDialog from './../ModalDialog'
import Permission from './../../models/Permission'
import Role from '../../models/Role'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      textRules: [val => val && val.length > 0],
      options: {
        roles: [],
      },
      selectedUserId: '',
      form: {
        role: {},
      },
      errormessage: '',
      errormessage2: '',
      type: 'password',

      permissionOptions: [],
      allPermission: {
        selected: false,
      }
    }
  },

  validations: {
    form: {
      role: { required }
    }
  },

  computed: {
    profile() {
      const profile = Profile.query().where('userId', this.selectedUserId).first()
      this.reassignProfile(profile)
      return profile
    },
    ...mapGetters([
      'tableSelection'
    ]),
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    },
    selections() {
      const selections = this.$store.getters.tableSelection
      if (!selections.length) return []
      if (!(selections[0] instanceof User)) return []

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
    'allPermission.selected': function(newVal) {
      if (!newVal) return

      this.permissionOptions.forEach(permission => {
        permission.selected = true
      })
    },

    permissionOptions: {
      deep: true,

      handler(newVal) {
        this.allPermission.selected = newVal.every(p => p.selected)
      }
    },

    async selectedUserId(newValue, oldValue) {
      if (this.selectedUserId) {
        // permissions
        const res = await this.$store.dispatch('GetUserPermissions', this.selectedUserId)
        this.permissionOptions.map(permission => {
          permission.selected = false
          for (const r of res.data) {
            if (permission.uuid === r.uuid) {
              permission.selected = true
            }
          }
        })

        // roles
        await this.$store.dispatch('GetUserRoles', this.selectedUserId)
        const user = User.query().withAll().where('uuid', this.selectedUserId).first()
        if (user.roles.length) {
          const foundRoleOption = this.options.roles.find(role => role.value === user.roles[0].$id)
          this.form.role = foundRoleOption
        }
      }
      this.errormessage = ''
    },
    selections(newValue, oldValue) {
      if (!newValue.length) return
      this.selectedUserId = newValue[0].value
    }
  },

  async created() {
    this.loadRoleOptions()
    this.loadPermissionOptions()
  },

  methods: {
    reset() {
      this.selectedUserId = ''
      this.errormessage = ''
      this.errormessage2 = ''
      this.form = {
        role: '',
      }
    },

    async onAssignUser() {
      const selectedPermissions = this.permissionOptions.filter(permission => permission.selected)
      const permissionIds = []

      for (const permission of selectedPermissions) {
        permissionIds.push(permission.uuid)
      }

      try {
        await this.$store.dispatch('UpdateUserPermission', {
          userId: this.selectedUserId,
          permissionIds: permissionIds,
          rolesIds: [this.form.role.value]
        })
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', 'User roles & permissions have been updated.')
      } catch (e) {
        console.log(e)
        this.$notify('error', 'Error updating user roles & permissions. Try again.')
      }
    },
    async loadRoleOptions() {
      const loadRoles = await this.$store.dispatch('GetAllRoles')
      loadRoles.forEach(role => {
        this.options.roles.push({
          value: role.uuid,
          label: role.name.charAt(0).toUpperCase() + role.name.slice(1)
        })
      })
    },

    async loadPermissionOptions() {
      try {
        await this.$store.dispatch('GetAllPermissions')
        this.permissionOptions = Permission.all().filter(permission =>
          permission.name.includes('Module')
        )
      } catch (e) {
        console.log(e)
      }
    },

    onInputFormRole() {
      if (!this.form.role.value) return

      let roleName = this.options.roles.find(role => role.value === this.form.role.value).label
      roleName = roleName.charAt(0).toLowerCase() + roleName.slice(1)

      const permissionsForRole = RolePermissionType[roleName]
      this.permissionOptions.forEach(permission => {
        permission.selected = !!permissionsForRole.includes(permission.name)
      })
    },

    onClickAllPermissions(value) {
      if (value) {
        this.permissionOptions.forEach(permission => {
          permission.selected = true
        })
        return
      }

      if (this.form.role) {
        this.onInputFormRole()
      } else {
        this.permissionOptions.forEach(permission => {
          permission.selected = false
        })
      }
    },
  }
}
</script>
