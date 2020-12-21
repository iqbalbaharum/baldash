<template>
  <modal-dialog
    ref="dialog"
    name="addbranch"
    @close-dialog="reset"
    @show-dialog="onShowDialog"
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
                :rules="[onNameCheck]"
                class="col q-pb-none"
                :error="errormessage5.length > 0"
              >
                <q-tooltip
                  v-if="errormessage5.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage5 }}
                  </div>
                </q-tooltip>
              </q-input>
              <div class="row">
                <q-input
                  v-model="form.code"
                  class="col q-pb-none"
                  outlined
                  label="Branch Code"
                  lazy-rules
                  debounce="500"
                  :rules="[onBranchCodeCheck]"
                  :error="errormessage.length > 0"
                >
                  <q-tooltip
                    v-if="errormessage.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage }}
                    </div>
                  </q-tooltip>
                </q-input>
                <q-select
                  v-model="form.type"
                  outlined
                  :options="opts.types"
                  label="Branch Type"
                  emit-value
                  map-options
                  stack-label
                  :rules="[textRules]"
                  class="col q-pl-xs q-pb-none"
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.telno"
                  class="col q-pb-none"
                  outlined
                  placeholder="07-2345678"
                  label="Telephone No."
                  mask="## - #########"
                  lazy-rules
                  unmasked-value
                  :rules="[onMobileCheck, phoneNoRules]"
                  :error="errormessage3.length > 0"
                >
                  <q-tooltip
                    v-if="errormessage3.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage3 }}
                    </div>
                  </q-tooltip>
                </q-input>
                <q-input
                  v-model="form.faxno"
                  class="col q-pl-xs q-pb-none"
                  outlined
                  placeholder="07-23456789"
                  label="Fax No."
                  mask="## - #########"
                  unmasked-value
                  :rules="[onFaxCheck, phoneNoRules]"
                  :error="errormessage2.length > 0"
                >
                  <q-tooltip
                    v-if="errormessage2.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage2 }}
                    </div>
                  </q-tooltip>
                </q-input>
              </div>
              <q-input
                v-model="form.email"
                outlined
                label="Email"
                debounce="500"
                :rules="[onEmailCheck, emailRules]"
                :error="errormessage4.length > 0"
                class="col q-pb-none"
              >
                <q-tooltip
                  v-if="errormessage4.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage4 }}
                  </div>
                </q-tooltip>
              </q-input>
              <q-input
                v-model="form.address1"
                outlined
                label="Address"
                aria-rowcount="2"
                :rules="[onAddressCheck, textRules]"
                class="col q-pb-none"
                :error="errormessage6.length > 0"
              >
                <q-tooltip
                  v-if="errormessage6.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage6 }}
                  </div>
                </q-tooltip>
              </q-input>
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
                lazy-rules
                :error="errormessage7.length > 0"
                :rules="[onStateCheck, textRules]"
                class="col q-pb-none"
              >
                <q-tooltip
                  v-if="errormessage7.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage7 }}
                  </div>
                </q-tooltip>
              </q-input>
              <q-select
                v-model="form.country"
                outlined
                label="Country"
                use-input
                emit-value
                map-options
                stack-label
                lazy-rules
                :error="errormessage8.length > 0"
                :rules="[onCountryCheck, textRules]"
                :options="countryOptions"
                class="col q-pb-none"
                @filter="filterFn"
              >
                <q-tooltip
                  v-if="errormessage8.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage8 }}
                  </div>
                </q-tooltip>
              </q-select>
              <q-input
                v-model="form.SSMNo"
                outlined
                label="SSM No."
                lazy-rules
                :error="errormessage9.length > 0"
                :rules="[onSSMCheck, textRules]"
                class="col q-pb-none"
              >
                <q-tooltip
                  v-if="errormessage9.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage9 }}
                  </div>
                </q-tooltip>
              </q-input>
              <q-input
                v-model="form.GSTNo"
                outlined
                label="GST No"
                lazy-rules
                :error="errormessage10.length > 0"
                :rules="[onGSTCheck, textRules]"
                class="col q-pb-none"
              >
                <q-tooltip
                  v-if="errormessage10.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage10 }}
                  </div>
                </q-tooltip>
              </q-input>
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
                label="Parent Branch"
                :disabled="true"
                :display-value="branchName"
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
                  :disabled="errormessage.length > 0 || errormessage2.length > 0 || errormessage3.length > 0 || errormessage4.length > 0 || errormessage5.length > 0 || errormessage6.length > 0 || errormessage7.length > 0 || errormessage8.length > 0"
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

import validationMixin from '../../mixins/validationMixin'

export default {

  components: {
    ModalDialog
  },

  mixins: [validationMixin],
  data() {
    return {
      fileUpload: null,
      countryOptions: [],

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
      branchName: '',
      selections: [],
      errormessage: '',
      errormessage2: '',
      errormessage3: '',
      errormessage4: '',
      errormessage5: '',
      errormessage6: '',
      errormessage7: '',
      errormessage8: '',
      errormessage9: '',
      errormessage10: '',
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
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.countryOptions = this.countries
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = this.countries.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    async onShowDialog() {
      // For parent branch
      const hqBranch = Branch.query().where('name', 'HQ').first()
      this.form.branchId = hqBranch.uuid
      this.branchName = hqBranch.name
      this.countryOptions = this.countries
    },
    reset() {
      this.errormessage = ''
      this.errormessage2 = ''
      this.errormessage3 = ''
      this.errormessage4 = ''
      this.errormessage5 = ''
      this.errormessage6 = ''
      this.errormessage7 = ''
      this.errormessage8 = ''
      this.errormessage9 = ''
      this.errormessage10 = ''
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

      const branch = {
        ...this.form,
        SSMNo: this.form.SSMNo.toString(),
        GSTNo: this.form.GSTNo.toString(),
      }

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
    async onEmailCheck() {
      this.$v.form.$touch()
      if (this.form.email.length <= 0) {
        this.errormessage4 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckEmailExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage4 = 'Email already exist'
          } else {
            this.errormessage4 = ''
          }
        })
    },
    async onBranchCodeCheck() {
      if (this.form.code.length <= 0) {
        this.errormessage = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckBranchCodeExist', this.form.code)
        .then(exists => {
          if (exists) {
            this.errormessage = 'Branch Code already exist'
          } else {
            this.errormessage = ''
          }
        })
    },
    onAddressCheck() {
      this.$v.form.$touch()
      if (this.form.address1.length <= 0) {
        this.errormessage6 = 'Field cant blank'
      } else {
        console.log('dsad')
        this.errormessage6 = ''
      }
    },
    onStateCheck() {
      this.$v.form.$touch()
      if (this.form.state.length <= 0) {
        this.errormessage7 = 'Field cant blank'
      } else {
        console.log('dsad')
        this.errormessage7 = ''
      }
    },
    onCountryCheck() {
      this.$v.form.$touch()
      if (this.form.country.length <= 0) {
        this.errormessage8 = 'Field cant blank'
      } else {
        this.errormessage8 = ''
      }
    },
    onSSMCheck() {
      this.$v.form.$touch()
      if (this.form.SSMNo.length <= 0) {
        this.errormessage9 = 'Field cant blank'
      } else {
        this.errormessage9 = ''
      }
    },
    onGSTCheck() {
      this.$v.form.$touch()
      if (this.form.GSTNo.length <= 0) {
        this.errormessage10 = 'Field cant blank'
      } else {
        this.errormessage10 = ''
      }
    },
    onNameCheck() {
      this.$v.form.$touch()
      if (this.form.name.length <= 0) {
        this.errormessage5 = 'Field cant blank'
      } else {
        console.log('dsad')
        this.errormessage5 = ''
      }
    },
    async onFaxCheck() {
      if (this.form.faxno <= 0) {
        this.errormessage2 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckFaxExist', this.form.faxno)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Fax number already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },
    async onMobileCheck() {
      this.$v.form.$touch()
      if (this.form.telno.length <= 0) {
        this.errormessage3 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckMobileBranchExist', this.form.telno)
        .then(exists => {
          if (exists) {
            this.errormessage3 = 'Mobile already exist'
          } else {
            this.errormessage3 = ''
          }
        })
    },
  }
}
</script>
