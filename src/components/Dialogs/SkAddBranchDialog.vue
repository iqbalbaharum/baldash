<template>
  <modal-dialog ref="dialog" name="addbranch">
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            New branch
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="col ">
              <q-input
                v-model="form.name"
                outlined
                label="Branch Name"
                :error="$v.form.name.$error"
                error-message="Branch name required"
              />
            </div>
            <div class="row">
              <q-input
                v-model="form.code"
                class="col"
                outlined
                label="Branch Code"
                :error="$v.form.code.$error"
                error-message="Branch Code required"
              />
            </div>
            <div class="col">
              <q-select
                v-model="form.type"
                outlined
                :options="opts"
                label="Branch Type"
                emit-value
                map-options
                stack-label
                :error="$v.form.type.$error"
                error-message="Branch Type required"
              />
            </div>
            <div class="row">
              <q-input
                v-model="form.telno"
                class="col"
                outlined
                label="Telephone No."
                :error="$v.form.telno.$error"
                error-message="Telephone No. required"
              />
              <q-input
                v-model="form.faxno"
                class="col q-pl-xs"
                outlined
                label="Fax No."
                :error="$v.form.faxno.$error"
                error-message="Fax No. required"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.email"
                outlined
                label="Email"
                :error="$v.form.email.$error"
                error-message="Email required"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.address1"
                outlined
                label="Address"
                aria-rowcount="2"
                :error="$v.form.address1.$error"
                error-message="Address required"
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
                :error="$v.form.state.$error"
                error-message="State required"
              />
            </div>
            <div class="col">
              <q-input
                v-model="form.country"
                outlined
                label="Country"
                :error="$v.form.country.$error"
                error-message="Country required"
              />
            </div>
            <div class="col">
              <q-input
                v-model.number="form.SSMNo"
                outlined
                label="SSM No."
                :error="$v.form.SSMNo.$error"
                error-message="SSM No. required"
              />
            </div>
            <div class="col">
              <q-input
                v-model.number="form.GSTNo"
                outlined
                label="GST No"
                :error="$v.form.GSTNo.$error"
                error-message="GST No. required"
              />
            </div>
            <div class="col">
              <q-file
                ref="fileupload"
                v-model="fileUpload"
                label="Choose Logo"
                outlined
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
                :error="$v.form.branchId.$error"
                error-message="Branch ID required"
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
import { minLength, required, email } from 'vuelidate/lib/validators'
import Branch from './../../models/Branch'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      fileUpload: null,
      form: {
        name: '',
        code: '',
        type: 'Dealer',
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
        branchId: '',
      },
      opts: ['Home', 'Dealer']
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

  validations: {
    form: {
      password: { required, minLength: minLength(4) },
      mobile: { required, minLength: minLength(10) },
      username: { required },
      SCCode: { required },
      branchId: { required },
      role: { required },
      name: { required },
      code: { required },
      type: { required },
      telno: { required },
      faxno: { required },
      email: { required, email },
      address1: { required },
      state: { required },
      country: { required },
      SSMNo: { required },
      GSTNo: { required }
    }
  },

  methods: {
    async onAddBranch() {
      this.$v.form.$touch()
      const branch = { ...this.form }

      if (this.fileUpload) {
        const res = await this.$store.dispatch('UploadFile', this.fileUpload)
        this.form.logo = res.name
      }

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
