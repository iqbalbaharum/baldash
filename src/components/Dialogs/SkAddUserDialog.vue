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
            New user
          </div>
        </q-card-section>
        <q-card-section>
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
                  v-model="form.password"
                  class="col q-pl-xs"
                  outlined
                  type="password"
                  label="Password"
                  :rules="textRules"
                />
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
                  v-model="form.SCCode"
                  class="col"
                  outlined
                  label="SC Code"
                  :rules="textRules"
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
          </q-form>
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
      dialog: {
        show: false,
        userId: '',
        roleArr: []
      },
      form: {
        username: '',
        password: '',
        name: '',
        SCCode: '',
        mobile: '',
        email: '',
        status: true,
        module_access: '',
        designCAD_access: '',
        branchId: '',
        role: '',
      }
    }
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

  computed: {
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    },

  },

  created() {
    this.loadRoleOptions()
    this.loadBranchOptions()
  },

  methods: {
    reset() {
      this.form = {}
    },

    async onAddUser() {
      this.$v.form.$touch()
      const user = { ...this.form }
      user.role = user.role.value
      user.branchId = user.branchId.value

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          await this.$store.dispatch('RegisterUser', user)
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
    }
  }
}
</script>
