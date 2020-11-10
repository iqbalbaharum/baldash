<template>
  <modal-dialog name="adduser">
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
              />
              <q-input
                v-model="form.password"
                class="col q-pl-xs"
                outlined
                type="password"
                label="Password"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.name"
                outlined
                label="Fullname"
              />
            </div>
            <div class="row ">
              <q-input
                v-model="form.SCCode"
                class="col"
                outlined
                label="SC Code"
              />
              <q-input
                v-model="form.mobile"
                class="col q-pl-xs"
                outlined
                label="Telephone No."
              />
            </div>
            <div class="col" />
            <div class="col">
              <q-input
                v-model="form.email"
                outlined
                label="Email"
              />
            </div>
            <div class="col">
              <q-select
                v-model="form.branchId"
                outlined
                :options="options.branches"
                label="Branch"
              />
            </div>
            <div class="col">
              <q-select
                v-model="form.role"
                outlined
                :options="options.roles"
                label="Roles"
              />
            </div>
            <!--
            <div class="col">
              <q-input
                v-model="form.access"
                outlined
                label="Module Access"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.cadaccess"
                outlined
                label="DesignCad Access"
              />
            </div> -->
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

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    onAddUser() {
      const user = { ...this.form }
      user.role = user.role.value
      user.branchId = user.branchId.value

      this.$store.dispatch('RegisterUser', user)
      this.$store.dispatch('GetAllUsers')
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
