<template>
  <modal-dialog
    ref="dialog"
    name="addbranch"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            New branch
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-weight-bold text-uppercase text-grey-5">
            Branch detail
          </div>
          <q-separator class="q-my-md" />
          <q-form ref="myForm" @submit="onAddBranch">
            <div class="q-gutter-sm justify">
              <q-input
                v-model="form.name"
                outlined
                label="Branch Name"
                :bottom-slots="false"
                :hide-hint="true"
                :rules="textRules"
                class="col q-pb-none"
              />
              <div class="row">
                <q-input
                  v-model="form.code"
                  class="col q-pb-none"
                  outlined
                  label="Branch Code"
                  :bottom-slots="false"
                  :error="false"
                  :rules="textRules"
                  @blur="onBranchCodeCheck"
                />
                <q-select
                  v-model="form.type"
                  outlined
                  :options="opts.types"
                  label="Branch Type"
                  emit-value
                  map-options
                  stack-label
                  :rules="textRules"
                  class="col q-pl-xs q-pb-none"
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.telno"
                  class="col q-pb-none"
                  outlined
                  label="Telephone No."
                  :rules="textRules"
                />
                <q-input
                  v-model="form.faxno"
                  class="col q-pl-xs q-pb-none"
                  outlined
                  label="Fax No."
                />
              </div>
              <q-input
                v-model="form.email"
                outlined
                label="Email"
                :rules="textRules"
                class="col q-pb-none"
              />

              <q-input
                v-model="form.address1"
                outlined
                label="Address"
                aria-rowcount="2"
                :rules="textRules"
                class="col q-pb-none"
              />
              <q-input
                v-model="form.address2"
                outlined
                label=""
                class="col q-pb-none"
              />
              <q-input
                v-model="form.state"
                outlined
                label="State"
                :rules="textRules"
                class="col q-pb-none"
              />
              <q-select
                v-model="form.country"
                outlined
                label="Country"
                emit-value
                map-options
                stack-label
                :rules="textRules"
                :options="countries"
                class="col q-pb-none"
              />
              <q-input
                v-model.number="form.SSMNo"
                outlined
                label="SSM No."
                :rules="textRules"
                class="col q-pb-none"
              />
              <q-input
                v-model="form.GSTNo"
                outlined
                label="GST No"
                class="col q-pb-none"
              />
              <q-file
                ref="fileupload"
                v-model="fileUpload"
                label="Choose Logo"
                outlined
                class="col q-pb-none"
              />

              <q-select
                v-model="form.branchId"
                outlined
                :options="branches"
                label="Branch"
                emit-value
                map-options
                stack-label
                class="col q-pb-none"
              />
              <div v-if="errormessage.length !== 0" class="text-negative q-my-md">
                {{ errormessage }}
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
                  :disabled="errormessage.length > 0"
                  @click="onAddBranch"
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
import Branch from './../../models/Branch'
import Country from './../../models/Country'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      textRules: [val => val && val.length > 0],
      fileUpload: null,

      form: {
        name: '',
        code: '',
        telno: '',
        faxno: '',
        email: '',
        address1: '',
        address2: '',
        state: '',
        country: '',
        SSMNo: '',
        logo: '',
        GSTNo: '',
        branchId: '',
      },
      errormessage: '',
      opts: {
        types: [
          {
            label: 'Home Branch',
            value: 'home'
          },
          {
            label: 'Dealer Branch',
            value: 'dealer'
          }
        ]
      }
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
    countries() {
      const countries = Country.all()
      const countryOptions = countries.map(country => {
        const container = []

        container.label = country.name
        container.value = country.alpha3Code
        container.flag = country.flag
        return container
      })

      return countryOptions
    }
  },

  created() {
    this.$store.dispatch('GetAllCountries')
  },

  validations: {
    form: {
      password: { required, minLength: minLength(4) },
      mobile: { required, minLength: minLength(10) },
      username: { required },
      branchId: { required },
      role: { required },
      name: { required },
      code: { required },
      type: { required },
      telno: { required },
      email: { required, email },
      address1: { required },
      state: { required },
      country: { required },
      SSMNo: { required }
    }
  },

  methods: {
    reset() {
      this.errormessage = ''
      this.form = {
        name: '',
        code: '',
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
      }
    },

    async onAddBranch() {
      this.onBranchCodeCheck()
      if (this.fileUpload) {
        const res = await this.$store.dispatch('UploadFile', this.fileUpload)
        this.form.logo = res.name
      }
      this.$v.form.$touch()
      const branch = { ...this.form }

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          await this.$store.dispatch('RegisterBranch', branch)
          this.$refs.dialog.$children[0].hide()
          this.$notify('success', `Branch with name ${branch.name} created!`)
        } else {
          this.$notify('error', 'All field is required')
        }
      })
    },
    async onBranchCodeCheck() {
      await this.$store.dispatch('CheckBranchCodeExist', this.form.code)
        .then(exists => {
          if (exists) {
            this.errormessage = 'Branch Code already exist'
          } else {
            this.errormessage = ''
          }
        })
    },
  }
}
</script>
