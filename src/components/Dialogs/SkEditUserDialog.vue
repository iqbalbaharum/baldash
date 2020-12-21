<template>
  <modal-dialog
    ref="dialog"
    name="edituser"
    @close-dialog="onHideDialog"
    @show-dialog="onShowDialog"
  >
    <q-card style="width:1800px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            View/Edit User
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              Select a user
            </div>
            <q-select
              v-model="selectedUserId"
              outlined
              :options="selections"
              label="Selected user"
              emit-value
              map-options
              stack-label
            />

            <q-separator class="q-my-md" />

            <template v-if="selectedUserId">
              <div class="text-weight-bold text-uppercase text-grey-5">
                User detail
              </div>

              <q-form ref="myForm" @submit="onUpdateUser">
                <div class="col">
                  <q-input
                    v-model="form.name"
                    class="col q-pb-xs"
                    outlined
                    label="Fullname"
                    lazy-rules
                    :error="errormessage8.length > 0"
                    :rules="[onNameCheck, textRules]"
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
                <div class="row">
                  <q-input
                    v-model="form.sccode"
                    class="col q-pb-xs"
                    debounce="500"
                    outlined
                    label="SC Code"
                    :rules="[onSCCodeCheck, textRules]"
                    :error="!!error.sccode"
                  >
                    <q-tooltip v-if="error.sccode">
                      {{ error.sccode }}
                    </q-tooltip>
                  </q-input>

                  <q-input
                    v-model="form.mobile"
                    class="col q-pb-xs"
                    mask="### - ########"
                    outlined
                    unmasked-value
                    label="Telephone No."
                    :rules="[onMobileCheck]"
                    :error="!!error.mobile"
                  >
                    <q-tooltip v-if="error.mobile">
                      {{ error.mobile }}
                    </q-tooltip>
                  </q-input>
                </div>

                <div class="col">
                  <q-input
                    v-model="form.email"
                    class="col q-pb-xs"
                    outlined
                    label="Email"
                    lazy-rules
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
              </q-form>

              <!-- Action button -->
              <div align="right">
                <q-btn
                  v-close-popup
                  flat
                  color="primary"
                  class="q-mx-sm"
                  label="Cancel"
                />
                <q-btn
                  color="grey"
                  label="Reset Form"
                  class="q-mx-sm"
                  @click="resetToUser"
                >
                  <q-tooltip>
                    Reset form to user's original attributes.
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="primary"
                  label="Update"
                  class="q-mx-sm"
                  :disabled="!!error.name || !!error.sccode"
                  @click="onUpdateUser"
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
import { minLength, required, email } from 'vuelidate/lib/validators'
import Branch from '../../models/Branch'
import Profile from '../../models/Profile'
import { mapGetters } from 'vuex'
import ModalDialog from './../ModalDialog'
import validationMixin from '../../mixins/validationMixin.js'

export default {

  components: {
    ModalDialog
  },

  mixins: [
    validationMixin,
  ],

  data() {
    return {
      selectedUserId: '',
      user: {},
      form: {
        uuid: '',
        name: '',
        sccode: '',
        mobile: '',
        email: '',
        branchId: '',
      },
      error: {
        name: '',
        sccode: '',
        mobile: '',
      },
      errormessage2: '',
      errormessage8: '',
      selections: [],
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

  watch: {
    async selectedUserId(newValue, oldValue) {
      if (!newValue) return

      const foundSelection = this.$store.getters.tableSelection.find((selection) => selection.uuid === newValue)
      this.user = { ...foundSelection } // For reset to original

      try {
        await this.$store.dispatch('GetUserProfile', newValue)
      } catch (e) {
        this.$notify('error', 'Error getting user profile')
      }

      const profile = Profile.query().where('userId', this.selectedUserId).first()
      this.user.sccode = profile?.sccode

      this.form = {
        uuid: foundSelection.uuid,
        name: foundSelection.name,
        sccode: profile?.sccode,
        mobile: foundSelection.mobile,
        email: foundSelection.email,
        branchId: foundSelection.branchId,
      }

      this.error = {
        name: '',
        sccode: '',
        mobile: '',
      }
    },
  },

  async created() {
    await this.$store.dispatch('GetAllBranches')
  },

  methods: {
    onShowDialog() {
      if (!this.$store.getters.tableSelection.length) return

      this.selections = this.$store.getters.tableSelection
      this.selections = this.selections.map(selection => {
        const container = {}
        container.label = selection.name
        container.value = selection.uuid
        return container
      })
      this.selectedUserId = this.selections[0].value
    },

    onHideDialog() {
      this.selectedUserId = ''
      this.form = {
        uuid: '',
        name: '',
        sccode: '',
        mobile: '',
        email: '',
        branchId: '',
      }
    },

    resetToUser() {
      this.form = { ...this.user }
      this.error = {
        name: '',
        sccode: '',
        mobile: '',
      }
      this.errormessage8 = ''
    },

    async onUpdateUser() {
      try {
        await this.$store.dispatch('UpdateUser', this.form)
        if (this.selections.length === 1) {
          this.$refs.dialog.$children[0].hide()
        }
        this.$notify('success', `User with name ${this.form.name} updated!`)
      } catch (e) {
        console.log(e)
        const message = e.response?.message?.error
        this.$notify('error', message)
      }
    },
    async onEmailCheck() {
      this.$v.form.$touch()
      if (this.form.email === this.user.email) return true
      if (this.form.email.length <= 0) {
        this.errormessage2 = 'Field cant be blank'
        return
      }

      await this.$store.dispatch('CheckEmailExist', this.form.email)
        .then(exists => {
          if (exists) {
            this.errormessage2 = 'Email already exist'
          } else {
            this.errormessage2 = ''
          }
        })
    },

    async onMobileCheck() {
      this.error.mobile = ''
      if (this.form.mobile === this.user.mobile) return true
      if (this.form.mobile.length <= 0) {
        this.error.mobile = 'Field cant blank'
      } else {
        this.error.mobile = ''
      }

      await this.$store.dispatch('CheckMobileExist', this.form.mobile)
        .then(exists => {
          if (exists) {
            this.error.mobile = 'Mobile already exist'
          }
        })
      if (this.form.mobile.length <= 9) {
        this.error.mobile = 'Telephone No. must between 10-11 digits'
      }

      return !this.error.mobile
    },

    onNameCheck() {
      this.$v.form.$touch()
      if (this.form.name.length <= 0) {
        this.errormessage8 = 'Field cant blank'
        console.log('dadsa', this.errormessage8)
      } else {
        this.errormessage8 = ''
      }
      console.log('here', this.errormessage8)
    },

    async onSCCodeCheck() {
      this.error.sccode = ''
      if (this.form.sccode === this.user.sccode) return true
      if (this.form.sccode.length <= 0) {
        this.error.sccode = 'Field cant blank'
      } else {
        this.error.sccode = ''
      }

      await this.$store.dispatch('CheckSCCodeExist', this.form.sccode)
        .then(exists => {
          if (exists) {
            this.error.sccode = 'SCCode already exist'
          }
        })

      return !this.error.sccode
    }
  }
}
</script>
