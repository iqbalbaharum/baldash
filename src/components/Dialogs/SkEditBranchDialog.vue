<template>
  <modal-dialog
    ref="dialog"
    name="editbranch"
    @close-dialog="reset"
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
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.code"
                  class="col"
                  outlined
                  label="Branch Code"
                />
                <q-input
                  v-model="form.type"
                  class="col q-pl-xs"
                  outlined
                  label="Branch Type"
                />
              </div>
              <div class="row">
                <q-input
                  v-model="form.telno"
                  class="col"
                  outlined
                  label="Telephone No."
                />
                <q-input
                  v-model="form.faxno"
                  class="col q-pl-xs"
                  outlined
                  label="Fax No."
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
                <q-input
                  v-model="form.address1"
                  outlined
                  label="Address"
                  aria-rowcount="2"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.address2"
                  outlined
                  label="Address 2"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.state"
                  outlined
                  label="State"
                />
              </div>
              <div class="col">
                <q-input
                  v-model="form.country"
                  outlined
                  label="Country"
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.SSMNo"
                  outlined
                  label="SSM No."
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.GSTNo"
                  outlined
                  label="GST No"
                />
              </div>
              <div class="col">
                <q-input
                  v-model.number="form.logo"
                  outlined
                  label="Logo"
                  disable
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.branchId"
                  outlined
                  :options="branches"
                  label="Parent Branch"
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

export default {

  components: {
    ModalDialog
  },
  data() {
    return {
      selectedBranchId: '',
      form: {},
      fileUpload: null,
      logo: '',
      branchName: ''
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
      console.log('selections', selections)
      const opts = selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })

      return opts
    },

    getBranchName() {
      this.branches.find(branch => {
        if (branch.value === this.selectedBranchId) {
          this.branchName = branch.label
          return branch.label
        }
      })
      return ''
    }
  },

  watch: {
    selectedBranchId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
      this.form.branch = this.getBranchName
      // TODO - This is temporary until can figure out to read image from api directly
      this.logo = `${process.env.MAIN_BE_URL}/containers/download/${this.form.logo}`
    }
  },

  methods: {
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
  }
}

</script>
