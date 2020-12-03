<template>
  <modal-dialog
    ref="dialog"
    name="edituser"
    @close-dialog="reset"
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

              <div class="col">
                <q-input
                  v-model="form.name"
                  outlined
                  label="Fullname"
                />
              </div>
              <div class="row ">
                <q-input
                  v-model="sccodemodel"
                  class="col"
                  outlined
                  label="SC Code"
                  @blur="onSCCodeCheck"
                />
                <q-input
                  v-model="form.mobile"
                  class="col q-pl-xs"
                  outlined
                  label="Telephone No."
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
              <div class="text-negative">
                {{ errormessage }}
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
                  label="Update"
                  :disabled="errormessage.length > 0"
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

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedUserId: '',
      form: {},
      errormessage: '',
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
    selections() {
      const selections = this.$store.getters.tableSelection
      const opts = selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })

      return opts
    },
    profile() {
      const profile = Profile.query().where('userId', this.selectedUserId).first()
      this.reassignProfile(profile)
      return profile
    },
    sccodemodel: {
      get() {
        return this.form.sccode ? this.form.sccode : this.profile.sccode
      },
      set(value) {
        this.form.sccode = value
      }
    }
  },

  watch: {
    async selectedUserId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      if (this.selectedUserId) {
        await this.$store.dispatch('GetUserProfile', this.selectedUserId)
      }
      this.form = { ...foundSelection }
      this.errormessage = ''
    }
  },

  async created() {
    await this.$store.dispatch('GetAllBranches')
  },

  methods: {
    reset() {
      this.selectedUserId = ''
      this.form = {}
    },
    reassignProfile(profile) {
      this.form.sccode = profile.sccode
    },
    async onUpdateUser() {
      this.onSCCodeCheck()

      try {
        await this.$store.dispatch('UpdateUser', this.form)
        // this.$refs.dialog.$children[0].hide()
        this.$notify('success', `User with name ${this.form.name} updated!`)
      } catch (e) {
        const message = e.response.message.error
        this.$notify('error', message)
      }
    },
    async onSCCodeCheck() {
      await this.$store.dispatch('CheckSCCodeExist', this.form.sccode)
        .then(exists => {
          if (exists) {
            this.errormessage = 'SCCode existed'
          } else {
            this.errormessage = ''
          }
        })
    }
  }
}
</script>
