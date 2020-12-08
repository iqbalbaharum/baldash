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
            <div class="text-weight-bold text-uppercase text-grey-5">
              Roles
            </div>
            <q-separator class="q-my-md" />
            <q-form ref="myForm" @submit="onAddUser">
              <div class="q-gutter-sm justify">
                <div class="col">
                  <q-select
                    v-model="form.role"
                    outlined
                    :options="options.roles"
                    stack-label
                    label="Roles"
                    :error="$v.form.role.$error"
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
                  label="Select All"
                />
                <q-separator class="q-my-md" />

                <div
                  v-for="permission in permissionOptions"
                  :key="permission.$id"
                  class="text-weight-bold text-uppercase text-grey-5"
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
                    @click="onAddUser"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import User from './../../models/User'
import ModalDialog from './../ModalDialog'
// import RolePermissionType from '../../types/role-permissions'
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
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
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
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      if (this.selectedUserId) {
        await this.$store.dispatch('GetUserProfile', this.selectedUserId)
      }
      this.form = { ...foundSelection }
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
      this.errormessage = ''
      this.errormessage2 = ''
      this.form = {
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      }
    },

    async onAddUser() {
      const user = { ...this.form }
      user.role = user.role.value

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          await this.$store.dispatch('RegisterUser', user)
          this.$refs.dialog.$children[0].hide()
          this.$notify('success', `User with name ${user.name} created!`)
        } else {
          this.$notify('error', 'All field is required')
        }
      })
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
  }
}
</script>
