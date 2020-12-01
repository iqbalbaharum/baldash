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
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Key in data for walk in user only
            </div>
            <q-input
              v-model="form.name"
              class="col"
              outlined
              label="Name"
              :error="$v.form.name.$error"
              error-message="Name is required"
            />
            <div class="row">
              <q-input
                v-model="form.email"
                class="col"
                outlined
                label="Email"
                type="email"
              />
              <q-input
                v-model="form.phone"
                class="col q-pl-xs"
                outlined
                label="Mobile No."
              />
            </div>
            <q-select
              v-model="form.property_type"
              class="col"
              outlined
              label="Property Type"
              :options="opts.propType"
            />
            <q-input
              v-model="form.location"
              class="col"
              outlined
              label="Property Location"
            />
            <q-select
              v-model="form.source_lead"
              outlined
              :options="opts.leads"
              label="Source of Lead"
              class="col"
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
              class="col"
              emit-value
              map-options
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
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'
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

      try {
        await this.$store.dispatch('AddLead', lead)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `User with name ${lead.name} created!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
  }
}
</script>
