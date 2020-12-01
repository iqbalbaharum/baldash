<template>
  <modal-dialog ref="dialog" name="adduser">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Add new user
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="row ">
              <q-input
                v-model="form.username"
                class="col"
                outlined
                label="Username"
                :error="$v.form.username.$error"
                error-message="Username must be more than 8 characters"
              />
              <q-input
                ref="password"
                v-model="form.password"
                class="col q-pl-xs"
                outlined
                :type="type"
                :error="$v.form.password.$error"
                error-message="Password must be more than 4 characters"
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
                :error="$v.form.name.$error"
                error-message="Fullname required"
              />
            </div>
            <div class="row ">
              <q-input
                v-model="form.SCCode"
                class="col"
                outlined
                :type="type2"
                label="SC Code"
                :error="$v.form.SCCode.$error"
                error-message="Invalid Code"
              />
              <q-input
                ref="mobile"
                v-model="form.mobile"
                class="col q-pl-xs"
                outlined
                :type="type2"
                label="Telephone No."
                :error="$v.form.mobile.$error"
                error-message="Fill in Number (012-3456789)"
              />
            </div>
            <div class="col" />
            <div class="col">
              <q-input
                v-model="form.email"
                outlined
                label="Email"
                :error="$v.form.email.$error"
                error-message="Need a valid email"
              />
            </div>
            <div class="col">
              <q-select
                v-model="form.branchId"
                outlined
                :options="options.branches"
                label="Branch"
                :error="$v.form.branchId.$error"
                error-message="Select a branch"
              />
            </div>
            <div class="col">
              <q-select
                v-model="form.role"
                outlined
                :options="options.roles"
                label="Roles"
                :error="$v.form.role.$error"
                error-message="Select a Role"
              />
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
                label="Submit"
                @click="onAddUser"
              />
            </div>
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
      options: {
        roles: [],
        branches: [],
      },
      dialog: {
        show: false,
        userId: '',
        roleArr: []
      },
      form: {
        username: '',
        name: '',
        password: '',
        SCCode: '',
        mobile: '',
        email: '',
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      },
      type: 'password',
      type2: 'number',
    }
  },

  computed: {
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    }
  },

  created() {
    this.loadRoleOptions()
    this.loadBranchOptions()
  },

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) },
      mobile: { required, minLength: minLength(10) },
      username: { required },
      name: { required },
      SCCode: { required },
      branchId: { required },
      role: { required }
    }
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    async onAddUser() {
      this.$v.form.$touch()
      const user = { ...this.form }
      user.role = user.role.value
      user.branchId = user.branchId.value

      try {
        await this.$store.dispatch('RegisterUser', user)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `User with name ${user.name} created!`)
      } catch (e) {
        const message = e.response.data.error.message
        this.$notify('error', `Error: ${message}`)
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
    }
  }
}
</script>
