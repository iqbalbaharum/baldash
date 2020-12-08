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
            <q-separator />
            <q-form ref="myForm" @submit="onAddUser">
              <div class="q-gutter-sm justify">
                <q-input
                  v-model="form.name"
                  class="col q-pb-none"
                  outlined
                  label="Full name"
                  lazy-rules
                  :rules="textRules"
                />

                <q-input
                  ref="password"
                  v-model="form.password"
                  class="col q-pb-none"
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

                <div class="row ">
                  <q-input
                    v-model="form.sccode"
                    class="col q-pb-none"
                    outlined
                    label="SC Code"
                    @blur="onSCCodeCheck"
                  />
                  <q-input
                    ref="mobile"
                    v-model="form.mobile"
                    class="col q-pl-xs q-pb-none"
                    outlined
                    label="Telephone No."
                    :rules="phoneNoRules"
                    placeholder="012-3456789"
                  />
                </div>
                <q-input
                  v-model="form.email"
                  outlined
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  class="col q-pb-none"
                  @blur="onEmailCheck"
                />
                <q-select
                  v-model="form.branchId"
                  outlined
                  :options="branches"
                  label="Branch"
                  emit-value
                  map-options
                  stack-label
                  :rules="[ val => val && val.length > 0 ]"
                  class="col q-pb-none"
                />
                <q-select
                  v-model="form.role"
                  outlined
                  :options="roles"
                  label="Role"
                  emit-value
                  map-options
                  stack-label
                  :rules="[ val => val && val.length > 0 ]"
                  class="col q-pb-none"
                  @input="onInputFormRole"
                />
                <div class="text-negative">
                  {{ errormessage }}
                </div>
                <div class="text-negative">
                  {{ errormessage2 }}
                </div>

                <!-- <div class="text-weight-bold text-uppercase text-grey-5 q-mt-md">
                  Access to DesignCAD
                </div>
                <q-separator />
                <q-toggle v-model="form.designCAD_access" /> -->

                <q-separator class="q-my-md" />

                <div class="text-weight-bold text-uppercase text-grey-5">
                  Scope Access
                </div>

                <!-- tick all -->
                <q-checkbox
                  v-model="allPermission.selected"
                  label="Select All"
                  @input="onClickAllPermissions"
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
import validationMixin from '../../mixins/validationMixin.js'

export default {

  components: {
    ModalDialog
  },

  mixins: [
    validationMixin,
  ],

  data() {
    return {
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
      email: { required, email },
      password: { required, minLength: minLength(3) },
      mobile: { required, minLength: minLength(8) },
      name: { required },
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

  watch: {
    permissionOptions: {
      deep: true,

      handler(permissions) {
        const isAllSelected = permissions.every(p => p.selected)
        this.allPermission.selected = isAllSelected
      }
    }
  },

  async created() {
    this.loadPermissionOptions()
  },

  methods: {
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
      if (this.form.sccode) {
        this.onSCCodeCheck()
      }

      this.onEmailCheck()
      this.$v.form.$touch()

      const user = { ...this.form }

      const permissions = []
      const selectedPermissions = this.permissionOptions.filter(permission => permission.selected)
      selectedPermissions.forEach(permission => {
        permissions.push(permission.getBodyRequest.uuid)
      })

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          const newUser = await this.$store.dispatch('RegisterUser', user)
          this.$refs.dialog.$children[0].hide()

          // Assign all selected permissions to user
          for (const permission of permissions) {
            await this.$store.dispatch('AssignPermissionToUser', {
              userUuid: newUser.uuid,
              permissionUuid: permission
            })
          }

          this.$notify('success', `User with name ${user.name} created!`)
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
    },

    ondesignAccess() {
      if (this.form.designCAD_access === true) {
        const userPermissions = ['SKModuleDesignProposal']
        // will then send to vuex
        console.log(userPermissions)
      }
    },

    async onSCCodeCheck() {
      if (this.form.sccode.length <= 0) {
        return
      }
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
