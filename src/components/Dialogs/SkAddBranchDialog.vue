<template>
  <modal-dialog ref="dialog" name="addbranch">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            New Branch
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
                v-model.number="form.SSMNo"
                outlined
                label="SSM No."
              />
            </div>
            <div class="col">
              <q-input
                v-model.number="form.GSTNo"
                outlined
                label="GST No"
              />
            </div>
            <div class="col">
              <q-input
                v-model.number="form.logo"
                outlined
                label="Logo"
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
              />
            </div>
            <div>
              <q-item-section />
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
      form: {
        name: '',
        code: '',
        type: 'dealer',
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
      },
      opts: ['home', 'dealer']
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
  },

  created() {
  },

  methods: {
    async onAddBranch() {
      const branch = { ...this.form }
      try {
        await this.$store.dispatch('RegisterBranch', branch)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Branch with name ${branch.name} created!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}

</script>
