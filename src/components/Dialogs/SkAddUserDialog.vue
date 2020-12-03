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
                    ref="mobile"
                    v-model="form.mobile"
                    class="col q-pl-xs"
                    outlined
                    label="Telephone No."
                    :rules="textRules"
                    placeholder="012-3456789"
                  />
                </div>
                <div class="col" />
                <div class="col">
                  <q-input
                    v-model="form.email"
                    outlined
                    label="Email"
                    type="email"
                    :error="$v.form.email.$error"
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
                  />
                </div>
                <div class="text-negative">
                  {{ errormessage }}
                </div>
                <div class="text-negative">
                  {{ errormessage2 }}
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
import { minLength, required, email } from 'vuelidate/lib/validators'
import User from './../../models/User'
import Branch from './../../models/Branch'
import Role from '../../models/Role'
import ModalDialog from './../ModalDialog'

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
        designCAD_access: '',
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
      password: { required, minLength: minLength(3) },
      mobile: { required, minLength: minLength(8) },
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

      this.$refs.myForm.validate().then(async success => {
        if (success && this.$v.form.$touch()) {
          await this.$store.dispatch('RegisterUser', user)
          this.$refs.dialog.$children[0].hide()
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
