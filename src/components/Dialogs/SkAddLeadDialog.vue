<template>
  <modal-dialog
    ref="dialog"
    name="walkinlead"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Walk In Leads
          </div>
        </q-card-section>
        <q-card-section>
          <q-form ref="myForm" @submit="onAddLead">
            <div class="q-gutter-sm justify">
              <div class="text-weight-bold text-uppercase text-grey-5">
                Key in data for walk in user only
              </div>
              <q-input
                v-model="form.name"
                class="col q-pb-none"
                outlined
                label="Name"
                lazy-rules
                :rules="[onNameCheck, textRules]"
                :error="errormessage1.length > 0"
              >
                <q-tooltip
                  v-if="errormessage1.length > 0"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <div>
                    {{ errormessage1 }}
                  </div>
                </q-tooltip>
              </q-input>
              <div class="row">
                <q-input
                  v-model="form.email"
                  class="col q-pb-none"
                  outlined
                  label="Email"
                  type="email"
                  debounce="1000"
                  :rules="[onEmailCheck, emailRules]"
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
                <q-input
                  v-model="form.phone"
                  class="col q-pl-xs q-pb-none"
                  outlined
                  type="tel"
                  label="Telephone No."
                  lazy-rules
                  :rules="[onMobileCheck]"
                  :error="errormessage3.length > 0"
                  mask="### - #########"
                  unmasked-value
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
              </div>
              <q-select
                v-model="form.property_type"
                class="col q-pb-none"
                outlined
                label="Property Type"
                lazy-rules
                :options="opts.propType"
                :rules="[onPropertyCheck, textRules]"
                :error="errormessage4.length > 0"
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
              </q-select>
              <q-input
                v-model="form.location"
                class="col q-pb-none"
                outlined
                lazy-rules
                label="Property Location"
                :rules="[onLocationCheck, textRules]"
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
              <q-select
                v-model="form.source_lead"
                outlined
                :options="opts.leads"
                label="Source of Lead"
                class="col q-pb-none"
                lazy-rules
                :rules="[onSourceCheck, textRules]"
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
              </q-select>
              <q-separator />
              <div class="text-weight-bold text-uppercase text-grey-5">
                Customer Sales Type
              </div>
              <q-select
                v-model="form.type"
                outlined
                :options="opts.type"
                label="Lead Type"
                class="col q-pb-none"
                emit-value
                map-options
                lazy-rules
                :rules="[onTypeCheck, textRules]"
                :error="errormessage7.length > 0"
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
              </q-select>
              <q-separator />
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
                  :disabled="errormessage1.length > 0 || errormessage2.length > 0 || errormessage3.length > 0 || errormessage4.length > 0 || errormessage5.length > 0 || errormessage6.length > 0 || errormessage7.length > 0"
                  @click="onAddLead"
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
import ModalDialog from './../ModalDialog'
import validationMixin from '../../mixins/validationMixin'

export default {

  components: {
    ModalDialog
  },

  mixins: [validationMixin],
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
      opts: {
        propType: ['Bungalow', 'Semi-D', 'Terrace', 'Townhouse', 'Apartment', 'ShopLot'],
        leads: ['Social Media', 'Print Media', 'Referral', 'Exhibition'],
        type: [
          {
            label: 'Corporate',
            value: 'corporate'
          },
          {
            label: 'Retail',
            value: 'retail'
          }]
      },
      errormessage1: '',
      errormessage2: '',
      errormessage3: '',
      errormessage4: '',
      errormessage5: '',
      errormessage6: '',
      errormessage7: '',
      errormessage8: '',
      errormessage9: '',
      form: {
        name: '',
        email: '',
        phone: '',
        property_type: '',
        location: '',
        source_lead: '',
        type: ''
      }
    }
  },

  validations: {
    form: {
      name: { required },
      email: { required, email },
      phone: { required, minLength: minLength(10) },
      property_type: { required },
      location: { required },
      source_lead: { required },
      type: { required }
    }
  },

  created() {

  },

  methods: {
    reset() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        property_type: '',
        location: '',
        source_lead: '',
        type: '',
        state: 'QL',
        status: 'active'
      }
    },
    async onAddLead() {
      const lead = { ...this.form }

      this.$refs.myForm.validate().then(async success => {
        if (success) {
          await this.$store.dispatch('AddQualifiedLead', lead)
          this.$notify('success', `User with name ${lead.name} created!`)
          this.reset()
          this.$refs.dialog.$children[0].hide()
        } else {
          this.$notify('error', 'All field is required')
        }
      })
      // try {
      //   await this.$store.dispatch('Addlead', lead)
      //   this.$notify('success', `User with name ${lead.name} created!`)
      // } catch (e) {
      //   this.$notify('error', 'All field is required')
      // }
    },
    onNameCheck() {
      this.$v.form.$touch()
      if (this.form.name.length <= 0) {
        this.errormessage1 = 'Field cant blank'
      } else {
        this.errormessage1 = ''
      }
    },
    async onEmailCheck() {
      this.$v.form.$touch()
      if (this.form.email.length <= 0) {
        this.errormessage2 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('LeadCheckEmailExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Email already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },
    async onMobileCheck() {
      this.$v.form.$touch()
      if (this.form.phone.length <= 0) {
        this.errormessage3 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('LeadCheckMobileExist', this.form.phone)
        .then(exists => {
          if (exists) {
            this.errormessage3 = 'Mobile already exist'
          } else {
            this.errormessage3 = ''
          }
        })
      if (this.form.phone.length <= 9) {
        this.errormessage3 = 'Telephone No. must between 8-10 digits'
      }
    },
    onPropertyCheck() {
      this.$v.form.$touch()
      if (this.form.property_type.length <= 0) {
        this.errormessage4 = 'Field cant blank'
      } else {
        this.errormessage4 = ''
      }
    },
    onLocationCheck() {
      this.$v.form.$touch()
      if (this.form.location.length <= 0) {
        this.errormessage5 = 'Field cant blank'
      } else {
        this.errormessage5 = ''
      }
    },
    onSourceCheck() {
      this.$v.form.$touch()
      if (this.form.source_lead.length <= 0) {
        this.errormessage6 = 'Field cant blank'
      } else {
        this.errormessage6 = ''
      }
    },
    onTypeCheck() {
      this.$v.form.$touch()
      if (this.form.type.length <= 0) {
        this.errormessage7 = 'Field cant blank'
      } else {
        this.errormessage7 = ''
      }
    },
  }
}
</script>
