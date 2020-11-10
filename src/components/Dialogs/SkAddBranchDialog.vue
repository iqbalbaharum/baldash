<template>
  <modal-dialog name="addbranch">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Add new Branch
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="col ">
              <q-input
                v-model="form.name"
                outlined
                label="Branch Name"
              />
            </div>
            <div class="row">
              <q-input
                v-model="form.code"
                class="col"
                outlined
                label="Branch Code"
              />
              <q-input
                v-model="form.type"
                class="col q-pl-xs"
                outlined
                label="Branch Type"
              />
            </div>
            <div class="row">
              <q-input
                v-model="form.telno"
                class="col"
                outlined
                label="Telephone No."
              />
              <q-input
                v-model="form.faxno"
                class="col q-pl-xs"
                outlined
                label="Fax No."
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.email"
                outlined
                label="Email"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.address1"
                outlined
                label="Address"
                aria-rowcount="2"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.address2"
                outlined
                label=""
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.state"
                outlined
                label="State"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.country"
                outlined
                label="Country"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.SSMNo"
                outlined
                label="SSM No."
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.GSTNo"
                outlined
                label="GST No"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.logo"
                outlined
                label="Logo"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.branchid"
                outlined
                label="Branch ID"
              />
            </div>
            <div>
              <q-item-section />
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
                @click="onAddBranch"
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import Branch from './../../models/Branch'
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
        { name: 'type', align: 'left', label: 'Role Type', field: 'type', sortable: true },
        { name: 'telno', align: 'left', label: 'Tel No.', field: 'telno', sortable: true },
        { name: 'faxno', align: 'left', label: 'Fax No.', field: 'faxno', sortable: true },
        { name: 'email', align: 'left', label: 'Eamil', field: 'email', sortable: true },
        { name: 'address1', align: 'left', label: 'Address', field: 'address1', sortable: true },
        { name: 'address2', align: 'left', label: 'Address', field: 'address2', sortable: true },
        { name: 'state', align: 'left', label: 'State', field: 'state', sortable: true },
        { name: 'country', align: 'left', label: 'Country', field: 'country', sortable: true },
        { name: 'SSMNo', align: 'left', label: 'SSM No.', field: 'SSMNo', sortable: true },
        { name: 'GSTNo', align: 'left', label: 'GST No.', field: 'GSTNo', sortable: true },
        { name: 'logo', align: 'left', label: 'Logo', field: 'logo', sortable: true },
        { name: 'branchId', align: 'left', label: 'Branch Id', field: 'branchId', sortable: true },
      ],

      form: {
        name: '',
        code: '',
        type: '',
        telno: '',
        faxno: '',
        email: '',
        address1: '',
        address2: '',
        state: '',
        country: '',
        SSMNo: '',
        GSTNo: '',
        logo: '',
        branchId: ''

      }
    }
  },

  computed: {
    users() {
      return Branch.query().withAll().get()
    },
  },

  created() {
    this.$store.dispatch('GetAllBranches')
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteBranch', id)
    },
    onAddBranch() {
      this.$store.dispatch('RegisterBranch', this.form)
        .then(res => {
        })
    },
  }
}
</script>
