<template>
  <modal-dialog
    ref="dialog"
    name="editbranch"
    @close-dialog="reset"
    @show-dialog="onShowDialog"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            View/Edit Branch
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Select a branch
            </div>
            <q-select
              v-model="selectedBranchId"
              outlined
              :options="selections"
              label="Selected branch"
              emit-value
              map-options
              stack-label
            />

            <q-separator class="q-my-md" />

            <template v-if="selectedBranchId">
              <div class="text-weight-bold text-uppercase text-grey-5">
                Company Logo
              </div>

              <div class="col q-py-md q-gutter-y-md">
                <q-img
                  placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                  :src="logo"
                  :ratio="16/9"
                  style="height: 140px"
                  contain
                />
                <q-file
                  ref="fileupload"
                  v-model="fileUpload"
                  label="Change Logo"
                  outlined
                />
              </div>

              <q-separator class="q-my-md" />

              <div class="text-weight-bold text-uppercase text-grey-5">
                Branch detail
              </div>

              <div class="col ">
                <q-input
                  v-model="form.name"
                  outlined
                  label="Branch Name"
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  lazy-rules
                  :error="errormessage1.length > 0"
                  :rules="[onNameCheck, textRules]"
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
              </div>
              <div class="row">
                <q-input
                  v-model="form.code"
                  outlined
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  label="Branch Code"
                  lazy-rules
                  :error="errormessage2.length > 0"
                  :rules="[onBranchCodeCheck, textRules]"
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
                <q-select
                  v-model="form.type"
                  outlined
                  :options="opts.types"
                  label="Branch Type"
                  :bottom-slots="false"
                  :hide-hint="true"
                  emit-value
                  map-options
                  stack-label
                  lazy-rules
                  :error="errormessage3.length > 0"
                  :rules="[textRules]"
                  class="col q-pb-none"
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
                </q-select>
              </div>
              <div class="row">
                <q-input
                  v-model="form.telno"
                  class="col q-pb-none"
                  outlined
                  :bottom-slots="false"
                  :hide-hint="true"
                  label="Telephone No."
                  mask="## - ########"
                  unmasked-value
                  :rules="[onMobileCheck]"
                  :error="!!errormessage4"
                >
                  <q-tooltip
                    v-if="errormessage4"
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
                  v-model="form.faxno"
                  class="col q-pb-none"
                  outlined
                  placeholder="07-23456789"
                  label="Fax No."
                  mask="## - #########"
                  unmasked-value
                  :bottom-slots="false"
                  :hide-hint="true"
                  lazy-rules
                  :error="errormessage5.length > 0"
                  :rules="[onFaxCheck, textRules]"
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
              </div>
              <div class="col">
                <q-input
                  v-model="form.email"
                  outlined
                  label="Email"
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  lazy-rules
                  :error="errormessage6.length > 0"
                  :rules="[onEmailCheck, textRules]"
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
              </div>
              <div class="col">
                <q-input
                  v-model="form.address1"
                  outlined
                  label="Address"
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  aria-rowcount="2"
                  lazy-rules
                  :error="errormessage7.length > 0"
                  :rules="[onAddressCheck, textRules]"
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
              </div>
              <div class="col">
                <q-input
                  v-model="form.address2"
                  outlined
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  label="Address 2"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.state"
                  outlined
                  label="State"
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  lazy-rules
                  :error="errormessage8.length > 0"
                  :rules="[onStateCheck, textRules]"
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
                </q-input>
              </div>
              <div class="col">
                <q-input
                  v-model="form.country"
                  outlined
                  label="Country"
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  lazy-rules
                  :error="errormessage9.length > 0"
                  :rules="[onCountryCheck, textRules]"
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
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.SSMNo"
                  outlined
                  label="SSM No."
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  lazy-rules
                  :error="errormessage10.length > 0"
                  :rules="[onSSMCheck, textRules]"
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
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.GSTNo"
                  outlined
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  label="GST No"
                  lazy-rules
                  :error="errormessage11.length > 0"
                  :rules="[onGSTCheck, textRules]"
                >
                  <q-tooltip
                    v-if="errormessage11.length > 0"
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <div>
                      {{ errormessage11 }}
                    </div>
                  </q-tooltip>
                </q-input>
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.logo"
                  outlined
                  :bottom-slots="false"
                  :hide-hint="true"
                  class="col q-pb-none"
                  label="Logo"
                  disable
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.branchId"
                  outlined
                  label="Parent Branch"
                  :disabled="true"
                  emit-value
                  map-options
                  stack-label
                  :display-value="branchName"
                />
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
                  color="grey"
                  label="Reset Form"
                  class="q-mx-sm"
                  @click="resetToUser"
                >
                  <q-tooltip>
                    Reset form to original attributes.
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="primary"
                  label="Update"
                  @click="onEditBranch"
                />
              </div>
            </template>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import Branch from './../../models/Branch'
import ModalDialog from './../ModalDialog'
import { mapGetters } from 'vuex'
import { minLength, required, email } from 'vuelidate/lib/validators'

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedResetId: '',
      textRules: [val => val && val.length > 0 && val.length < 13],
      selectedBranchId: '',
      form: {},
      fileUpload: null,
      logo: '',
      branchName: '',
      selections: [],
      errormessage1: '',
      errormessage2: '',
      errormessage3: '',
      errormessage4: '',
      errormessage5: '',
      errormessage6: '',
      errormessage7: '',
      errormessage8: '',
      errormessage9: '',
      errormessage10: '',
      errormessage11: '',
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
      },
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(3) },
      mobile: { required, minLength: minLength(8) },
      name: { required },
      branchId: { required },
      role: { required }
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
  },

  watch: {
    selectedBranchId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.selectedResetId = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
      this.form.branch = this.getBranchName
      // TODO - This is temporary until can figure out to read image from api directly
      this.logo = `${process.env.MAIN_BE_URL}/containers/download/${this.form.logo}`
    }
  },

  methods: {
    resetToUser() {
      this.form = { ...this.selectedResetId }
      this.form.branch = this.getBranchName
      // TODO - This is temporary until can figure out to read image from api directly
      this.logo = `${process.env.MAIN_BE_URL}/containers/download/${this.form.logo}`
    },
    async onShowDialog() {
      if (!this.$store.getters.tableSelection.length) return

      this.selections = this.$store.getters.tableSelection
      this.selections = this.selections.map(selection => {
        const container = {}
        container.label = selection.name
        container.value = selection.uuid
        return container
      })
      this.selectedBranchId = this.selections[0].value

      // For parent branch
      const hqBranch = Branch.query().where('name', 'HQ').first()
      this.branchName = hqBranch.name
    },
    reset() {
      this.selectedBranchId = ''
      this.form = {}
    },
    async loadImage(filename) {
      if (!filename) {
        return
      }

      await this.$store.dispatch('GetImage', filename)
    },
    async onEditBranch() {
      if (this.fileUpload) {
        const res = await this.$store.dispatch('UploadFile', this.fileUpload)
        this.form.logo = res.name
      }

      try {
        await this.$store.dispatch('UpdateBranch', this.form)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Branch with name ${this.form.name} updated!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
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
      if (this.form.email === this.selectedResetId.email) return true
      if (this.form.email.length <= 0) {
        this.errormessage6 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckEmailBranchExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage6 = 'Email already exist'
          } else {
            this.errormessage6 = ''
          }
        })
    },
    async onBranchCodeCheck() {
      if (this.form.code === this.selectedResetId.code) return true
      if (this.form.code.length <= 0) {
        this.errormessage2 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckBranchCodeExist', this.form.code)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Branch Code already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },
    onAddressCheck() {
      this.$v.form.$touch()
      if (this.form.address1.length <= 0) {
        this.errormessage7 = 'Field cant blank'
      } else {
        this.errormessage7 = ''
      }
    },
    onStateCheck() {
      this.$v.form.$touch()
      if (this.form.state.length <= 0) {
        this.errormessage8 = 'Field cant blank'
      } else {
        this.errormessage8 = ''
      }
    },
    onCountryCheck() {
      this.$v.form.$touch()
      if (this.form.country.length <= 0) {
        this.errormessage9 = 'Field cant blank'
      } else {
        this.errormessage9 = ''
      }
    },
    onSSMCheck() {
      this.$v.form.$touch()
      if (this.form.SSMNo.length <= 0) {
        this.errormessage10 = 'Field cant blank'
      } else {
        this.errormessage10 = ''
      }
    },
    onGSTCheck() {
      this.$v.form.$touch()
      if (this.form.GSTNo.length <= 0) {
        this.errormessage11 = 'Field cant blank'
      } else {
        this.errormessage11 = ''
      }
    },
    async onFaxCheck() {
      if (this.form.faxno === this.selectedResetId.faxno) return true
      if (this.form.faxno <= 0) {
        this.errormessage5 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckFaxExist', this.form.faxno)
        .then(exists => {
          if (exists) {
            this.errormessage5 = 'Fax number already exist'
          } else {
            this.errormessage5 = ''
          }
        })
      if (this.form.faxno.length <= 7) {
        this.errormessage5 = 'Fax No. must between 8-10 digits'
      }
    },
    async onMobileCheck() {
      this.errormessage4 = ''
      if (this.form.telno === this.selectedResetId.telno) return true

      if (this.form.telno.length <= 0) {
        this.errormessage4 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckMobileBranchExist', this.form.telno)
        .then(exists => {
          if (exists) {
            this.errormessage4 = 'Mobile already exist'
          } else {
            this.errormessage4 = ''
          }
        })
      if (this.form.telno.length <= 7) {
        this.errormessage4 = 'Telephone No. must between 8-10 digits'
      }

      return !this.errormessage4
    },
  }
}

</script>
