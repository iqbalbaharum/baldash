<template>
  <modal-dialog
    ref="dialog"
    name="adduser"
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
                <q-input
                  v-model="form.name"
                  class="col q-pb-none"
                  outlined
                  label="Fullname"
                  lazy-rules
                  :error="errormessage8.length > 0"
                  :rules="[textRules, onNameCheck]"
                >
                  <q-tooltip
                    v-if="errormessage8.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage8 }}
                    </div>
                  </q-tooltip>
                </q-input>
                <q-input
                  ref="password"
                  v-model="form.password"
                  class="col q-pb-none"
                  outlined
                  :type="type"
                  :rules="[textRules,onPasswordCheck]"
                  :error="errormessage5.length > 0"
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
                  <q-tooltip
                    v-if="errormessage5.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage5 }}
                    </div>
                  </q-tooltip>
                </q-input>

                <div class="row ">
                  <q-input
                    v-model="form.sccode"
                    class="col q-pb-none"
                    outlined
                    label="SC Code"
                    lazy-rules
                    debounce="1000"
                    :rules="[textRules,onSCCodeCheck]"
                    :error="errormessage.length > 0"
                  >
                    <q-tooltip
                      v-if="errormessage.length > 0"
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <div>
                        {{ errormessage }}
                      </div>
                    </q-tooltip>
                  </q-input>
                  <q-input
                    ref="mobile"
                    v-model="form.mobile"
                    class="col q-pl-xs q-pb-none"
                    outlined
                    label="Telephone No."
                    lazy-rules
                    :rules="[onMobileCheck]"
                    :error="errormessage3.length > 0"
                    mask="### - #########"
                    unmasked-value
                  >
                    <q-tooltip
                      v-if="errormessage3.length > 0"
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      <div>
                        {{ errormessage3 }}
                      </div>
                    </q-tooltip>
                  </q-input>
                </div>
                <q-input
                  v-model="form.email"
                  class="col q-pb-none"
                  outlined
                  label="Email"
                  lazy-rules
                  debounce="1000"
                  :rules="[onEmailCheck,emailRules]"
                  :error="errormessage2.length > 0"
                >
                  <q-tooltip
                    v-if="errormessage2.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage2 }}
                    </div>
                  </q-tooltip>
                </q-input>
                <q-select
                  v-model="form.branchId"
                  outlined
                  :options="branches"
                  label="Branch"
                  emit-value
                  map-options
                  stack-label
                  :rules="[textRules, onBranchCheck]"
                  :error="errormessage7.length > 0"
                  class="col q-pb-none"
                >
                  <q-tooltip
                    v-if="errormessage7.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage7 }}
                    </div>
                  </q-tooltip>
                </q-select>
                <q-select
                  v-model="form.role"
                  outlined
                  :options="roles"
                  label="Role"
                  emit-value
                  map-options
                  stack-label
                  :rules="[textRules, onRoleCheck]"
                  :error="errormessage6.length > 0"
                  class="col q-pb-none"
                  @input="onInputFormRole"
                >
                  <q-tooltip
                    v-if="errormessage6.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage6 }}
                    </div>
                  </q-tooltip>
                </q-select>
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
                  class="text-uppercase"
                  label="Select All"
                  @input="onClickAllPermissions"
                />
                <q-separator class="q-my-md" />
                <div
                  v-for="permission in permissionOptions"
                  :key="permission.$id"
                  class="text-uppercase"
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
                    :disabled="errormessage.length > 0 || errormessage2.length > 0 || errormessage3.length > 0 || errormessage4.length > 0 || errormessage5.length > 0 || errormessage6.length > 0 || errormessage7.length > 0 || errormessage8.length > 0"
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
import { isValidPhoneNo } from './../../utils'
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
      textRules: [val => val && val.length > 0 && val.length < 13],
      selectedUserId: '',
      sccode: '',
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
      errormessage3: '',
      errormessage4: '',
      errormessage5: '',
      errormessage6: '',
      errormessage7: '',
      errormessage8: '',
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
        container.name = role.name.charAt(0).toUpperCase() + role.name.slice(1)
        container.label = role.displayName
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
    'allPermission.selected': function(newVal) {
      if (!newVal) return

      this.permissionOptions.forEach(permission => {
        permission.selected = true
      })
    },

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
      this.errormessage3 = ''
      this.errormessage4 = ''
      this.errormessage5 = ''
      this.errormessage6 = ''
      this.errormessage6 = ''
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
          this.reset()
        } else {
          this.$notify('error', 'All field is required')
        }
        this.permissionOptions.forEach(permission => {
          permission.selected = false
        })
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
      let roleName = this.roles.find(role => role.value === this.form.role).name
      roleName = roleName.charAt(0).toLowerCase() + roleName.slice(1)

      const permissionsForRole = RolePermissionType[roleName]
      this.permissionOptions.forEach(permission => {
        permission.selected = !!permissionsForRole.includes(permission.name)
      })
    },

    async onSCCodeCheck() {
      this.$v.form.$touch()
      if (this.form.sccode.length <= 0) {
        this.errormessage = 'Field cannot be blank'
        return
      }
      await this.$store.dispatch('CheckSCCodeExist', this.form.sccode)
        .then(exists => {
          if (exists) {
            this.errormessage = 'SC Code already exist'
          } else {
            this.errormessage = ''
          }
        })
    },
    async onEmailCheck() {
      this.$v.form.$touch()
      if (this.form.email.length <= 0) {
        this.errormessage2 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckEmailExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Email already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },
    async onMobileCheck() {
      this.$v.form.$touch()
      if (this.form.mobile.length <= 0) {
        this.errormessage3 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckMobileExist', this.form.mobile)
        .then(exists => {
          if (exists) {
            this.errormessage3 = 'Mobile already exist'
          } else {
            this.errormessage3 = ''
          }
        })
      if (this.form.mobile.length <= 9) {
        this.errormessage3 = 'Telephone No. must between 10-11 digits'
      }
    },

    onPasswordCheck() {
      this.$v.form.$touch()
      if (this.form.password.length < 4 || this.form.password.length > 12) {
        this.errormessage5 = 'Password length must be from 4 to 12 characters'
      } else {
        this.errormessage5 = ''
      }
    },

    onRoleCheck() {
      this.$v.form.$touch()
      if (this.form.role.length <= 0) {
        this.errormessage6 = 'Field cant blank'
      } else {
        this.errormessage6 = ''
      }
    },

    onNameCheck() {
      this.$v.form.$touch()
      if (this.form.name.length <= 0) {
        this.errormessage8 = 'Field cant blank'
      } else {
        this.errormessage8 = ''
      }
    },

    onBranchCheck() {
      this.$v.form.$touch()
      if (this.form.branchId.length <= 0) {
        this.errormessage7 = 'Field cant blank'
      } else {
        this.errormessage7 = ''
      }
    },

    async onMobileForm() {
      this.$v.form.$touch()
      if (!isValidPhoneNo(this.form.mobile)) {
        this.errormessage3 = 'Fill mobile with the following format (012-3456789)'
      } else {
        this.errormessage3 = ''
      }
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
