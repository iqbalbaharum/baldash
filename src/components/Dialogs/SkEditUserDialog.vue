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
                    outlined
                    label="Fullname"
                    lazy-rules
                    :error="errormessage8.length > 0"
                    :rules="[textRules, onNameCheck]"
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
                    class="col"
                    debounce="500"
                    outlined
                    label="SC Code"
                    :rules="[textRules, onSCCodeCheck]"
                    :error="!!error.sccode"
                  >
                    <q-tooltip v-if="error.sccode">
                      {{ error.sccode }}
                    </q-tooltip>
                  </q-input>

                  <q-input
                    v-model="form.mobile"
                    class="col q-pl-xs"
                    mask="### - #########"
                    outlined
                    unmasked-value
                    label="Telephone No."
                    :rules="[phoneNoRules, onMobileCheck]"
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
                    outlined
                    label="Email"
                    :rules="[emailRules || 'Wrong email format.']"
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
      errormessage8: '',
      selections: [],
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

      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
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

    async onMobileCheck() {
      this.error.mobile = ''
      if (this.form.mobile === this.user.mobile) return true

      await this.$store.dispatch('CheckMobileExist', this.form.mobile)
        .then(exists => {
          if (exists) {
            this.error.mobile = 'Mobile already exist'
          }
        })

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
