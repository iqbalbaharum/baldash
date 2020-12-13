<template>
  <modal-dialog
    ref="dialog"
    name="walkinlead"
    @close-dialog="reset"
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
                :rules="[textRules]"
              />
              <div class="row">
                <q-input
                  v-model="form.email"
                  class="col q-pb-none"
                  outlined
                  label="Email"
                  type="email"
                  debounce="1000"
                  :rules="[emailRules, onEmailCheck]"
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
                  label="Mobile No."
                  debounce="1000"
                  :rules="[phoneNoRules, onMobileCheck]"
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
              </div>
              <q-select
                v-model="form.property_type"
                class="col q-pb-none"
                outlined
                label="Property Type"
                :options="opts.propType"
                :rules="[textRules]"
              />
              <q-input
                v-model="form.location"
                class="col q-pb-none"
                outlined
                label="Property Location"
                :rules="[textRules]"
              />
              <q-select
                v-model="form.source_lead"
                outlined
                :options="opts.leads"
                label="Source of Lead"
                class="col q-pb-none"
                :rules="[ val => val && val.length > 0 ]"
              />
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
                :rules="[textRules]"
              />
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
      errormessage2: '',
      errormessage3: '',
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
    async onEmailCheck() {
      this.$v.form.$touch()
      if (this.form.email.length <= 0) {
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
    },
  }
}
</script>
