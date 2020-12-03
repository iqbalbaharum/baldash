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
                    :options="options.branches"
                    label="Branch"
                    stack-label
                    :error="$v.form.branchId.$error"
                  />
                </div>
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
                  Access to designcad
                </div>
                <q-toggle v-model="form.designCAD_access" />
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
import { minLength, required, email } from 'vuelidate/lib/validators'
import User from './../../models/User'
import Role from '../../models/Role'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      textRules: [val => val && val.length > 0],
      options: {
        roles: [],
        branches: [],
      },
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
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    },

  },

  async created() {
    this.loadRoleOptions()
    this.loadBranchOptions()
  },

  methods: {
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
      this.$v.form.$touch()
      const user = { ...this.form }
      user.role = user.role.value
      user.branchId = user.branchId.value

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

    async loadBranchOptions() {
      const branches = await this.$store.dispatch('GetAllBranches')
      branches.forEach(branch => {
        this.options.branches.push({
          value: branch.uuid,
          label: branch.name,
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
