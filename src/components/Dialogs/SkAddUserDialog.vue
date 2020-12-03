<template>
  <modal-dialog
    ref="dialog"
    name="adduser"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            New User
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              User detail
            </div>
            <q-separator class="q-my-md" />
            <q-form ref="myForm" @submit="onAddUser">
              <div class="q-gutter-sm justify">
                <div class="row ">
                  <q-input
                    v-model="form.username"
                    class="col"
                    outlined
                    label="Username"
                    lazy-rules
                    :rules="textRules"
                  />
                  <q-input
                    ref="password"
                    v-model="form.password"
                    class="col q-pl-xs"
                    outlined
                    :type="type"
                    :rules="textRules"
                    label="Password"
                  >
                    <template v-slot:append>
                      <q-btn
                        round
                        flat
                        icon="remove_red_eye"
                        @click="onClickShowPasswords"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <q-input
                    v-model="form.name"
                    outlined
                    label="Fullname"
                    :rules="textRules"
                  />
                </div>
                <div class="row ">
                  <q-input
                    v-model="form.sccode"
                    class="col"
                    outlined
                    label="SC Code"
                    :rules="textRules"
                    @blur="onSCCodeCheck"
                  />
                  <q-input
                    v-model="form.mobile"
                    class="col q-pl-xs"
                    outlined
                    label="Telephone No."
                    type="number"
                    :rules="textRules"
                  />
                </div>
                <div class="col" />
                <div class="col">
                  <q-input
                    v-model="form.email"
                    outlined
                    label="Email"
                    type="email"
                    :rules="textRules"
                    @blur="onEmailCheck"
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
                    :rules="[ val => val && val.length > 0 ]"
                  />
                </div>
                <div class="col">
                  <q-select
                    v-model="form.role"
                    outlined
                    :options="roles"
                    label="Role"
                    emit-value
                    map-options
                    stack-label
                    :rules="[ val => val && val.length > 0 ]"
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
                <q-separator class="q-my-md" />

                <div
                  v-for="permission in permissionOptions"
                  :key="permission.$id"
                  class="text-weight-bold text-uppercase text-grey-5"
                >
                  <q-checkbox v-model="permission.selected" :label="permission.nameDisplay" />
                </div>
                <q-toggle v-model="form.designCAD_access" />
                <q-separator class="q-my-md" />

                <!-- Action buttons -->
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
import { minLength, required, email } from 'vuelidate/lib/validators'
import User from './../../models/User'
import Branch from './../../models/Branch'
import Permission from './../../models/Permission'
import Role from '../../models/Role'
import ModalDialog from './../ModalDialog'
import RolePermissionType from '../../types/role-permissions'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      textRules: [val => val && val.length > 0],
      selectedUserId: '',
      form: {
        username: '',
        password: '',
        name: '',
        sccode: '',
        mobile: '',
        email: '',
        status: true,
        module_access: '',
        designCAD_access: false,
        branchId: '',
        role: '',
      },
      errormessage: '',
      errormessage2: '',
      type: 'password',

      permissionOptions: [],
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) },
      mobile: { required, minLength: minLength(10) },
      username: { required },
      name: { required },
      sccode: { required },
      branchId: { required },
      role: { required }
    }
  },

  computed: {
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
    users() {
      return User.query().withAll().get()
    },
  },

  async created() {
    this.loadPermissionOptions()
  },

  methods: {
    async loadPermissionOptions() {
      try {
        await this.$store.dispatch('GetAllPermissions')
        this.permissionOptions = Permission.all().filter(permission =>
          permission.name.includes('Module') || permission.name.includes('All')
        )
        console.log(this.permissionOptions)
      } catch (e) {
        console.log(e)
      }
    },

    reset() {
      this.errormessage = ''
      this.errormessage2 = ''
      this.form = {
        username: '',
        password: '',
        name: '',
        sccode: '',
        mobile: '',
        email: '',
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      }
    },

    async onAddUser() {
      this.onSCCodeCheck()
      this.onEmailCheck()
      this.ondesignAccess()
      this.$v.form.$touch()

      const user = { ...this.form }

      const permissions = []
      const selectedPermissions = this.permissionOptions.filter(permission => permission.selected)
      selectedPermissions.forEach(permission => permissions.push(permission.getBodyRequest.uuid))

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          const newUser = await this.$store.dispatch('RegisterUser', user)
          this.$refs.dialog.$children[0].hide()
          this.$notify('success', `User with name ${user.name} created!`)

          // Assign all selected permissions to user
          for (const permission of permissions) {
            this.$store.dispatch('AssignPermissionToUser', {
              userUuid: newUser.uuid,
              permissionUuid: permission
            })
          }
        } else {
          this.$notify('error', 'All field is required')
        }
      })
    },

    onClickShowPasswords() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },

    onInputFormRole() {
      let roleName = this.roles.find(role => role.value === this.form.role).label
      roleName = roleName.charAt(0).toLowerCase() + roleName.slice(1)

      const permissionsForRole = RolePermissionType[roleName]
      this.permissionOptions.forEach(permission => {
        permission.selected = !!permissionsForRole.includes(permission.name)
      })

      const permissions = []
      const selectedPermissions = this.permissionOptions.filter(permission => permission.selected)
      selectedPermissions.forEach(permission => permissions.push(permission.getBodyRequest.uuid))
    },

    ondesignAccess() {
      if (this.form.designCAD_access === true) {
        const userPermissions = ['SKModuleDesignProposal']
        // will then send to vuex
        console.log(userPermissions)
      }
    },

    async onSCCodeCheck() {
      await this.$store.dispatch('CheckSCCodeExist', this.form.sccode)
        .then(exists => {
          if (exists) {
            this.errormessage = 'SCCode already exist'
          } else {
            this.errormessage = ''
          }
        })
    },
    async onEmailCheck() {
      await this.$store.dispatch('CheckEmailExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Email already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },
  }
}
</script>
