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
              <q-input
                v-model="form.branchId"
                outlined
                label="Branch"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.role"
                outlined
                label="Role"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.status"
                outlined
                label="Status"
              />
            </div>
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
            </div>
            <div align="right">
              <q-btn
                flat
                color="primary"
                label="Cancel"
                @click="isCreateDialogOpened = false"
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
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'code', align: 'left', label: 'SC Code', field: 'code', sortable: true },
        { name: 'mobile', align: 'left', label: 'Mobile No.', field: 'mobile', sortable: true },
        { name: 'email', align: 'left', label: 'Eamil', field: 'email', sortable: true },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
        { name: 'module_access', align: 'left', label: 'Address', field: 'address2', sortable: true },
        { name: 'module_access', align: 'left', label: 'Module Access', field: 'module_access', sortable: true },
        { name: 'designCAD_access', align: 'left', label: 'DesignCAD Access', field: 'designCAD_access', sortable: true },
        { name: 'branchId', align: 'left', label: 'BranchId', field: 'branchId', sortable: true },
      ],
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
        status: '',
        module_access: '',
        designCAD_access: '',
        branchId: '',
      }
    }
  },

  computed: {
    users() {
      return User.query().withAll().get()
    },
  },

  created() {
    this.$store.dispatch('GetAllUsers')
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    onAddUser() {
      this.$store.dispatch('RegisterUser', this.form)
        .then(res => {
        })
    },
  }
}
</script>
