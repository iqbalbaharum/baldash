<template>
  <modal-dialog
    ref="dialog"
    name="rrbranch"
    @show-dialog="setupBranchesList"
    @close-dialog="reset"
  >
    <q-card style="width:1800px">
      <q-card-section class="bg-grey-10">
        <div class="text-white text-h6">
          Arrange Branches
        </div>
      </q-card-section>
      <div class="q-pa-md">
        <q-list v-if="form.length > 0">
          <q-item class="row">
            <q-item-section class="col-2">
              Priority
            </q-item-section>

            <q-item-section class="col">
              Branch Name
            </q-item-section>

            <q-item-section class="col-2">
              Include In Rotation
            </q-item-section>

            <q-item-section class="col-2">
              Include In Inner Rotation
            </q-item-section>

            <q-item-section class="col-2">
              Capacity
            </q-item-section>
          </q-item>
          <q-item
            v-for="(branch,index) in branches"
            :key="branch.uuid"
            class="row"
          >
            <q-item-section class="col-2">
              <q-input
                v-model.number="form[index].priority"
                filled
                dense
                :min="1"
                type="number"
                :error="hasSamePriorities(form[index].priority, index)
                  || isValidPriorityValue(form[index].priority, index)"
              >
                <template v-slot:error>
                  {{ errors[index] }}
                </template>
              </q-input>
            </q-item-section>

            <q-item-section class="col">
              {{ branch.name }} ({{ branch.code }})
            </q-item-section>

            <q-item-section class="col-2">
              <q-checkbox v-model="form[index].isInRR" />
            </q-item-section>

            <q-item-section class="col-2">
              <q-checkbox v-model="form[index].isInInnerRR" :disable="!form[index].isInRR" />
              <q-tooltip v-if="!form[index].isInRR">
                Branch not included in rotation
              </q-tooltip>
            </q-item-section>

            <q-item-section class="col-2">
              <q-input
                v-model.number="form[index].leadcapacity"
                filled
                dense
                :disable="form[index].type === 'home'"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md" />

        <div class="row justify-between q-mb-lg">
          <div class="text-weight-bold text-uppercase text-grey-5">
            Inner Rotation Number
          </div>
          <div class="full-width">
            <q-tooltip v-if="!form.filter(b => b.isInInnerRR).length">
              No branch included in inner rotation
            </q-tooltip>
            <q-slider
              v-model="innerRotationNumber"
              :min="0"
              :max="10"
              :step="1"
              :disable="!form.filter(b => b.isInInnerRR).length"
              snap
              markers
              label
            />
          </div>
        </div>
        <div class="row justify-between">
          <q-btn
            color="accent"
            label="Refresh Capacity"
            @click="onClickRefreshCapacity"
          />
          <div>
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Close"
            />
            <q-btn
              color="primary"
              label="Save"
              :disabled="isSaveButtonDisabled"
              @click="onClickSave"
            />
          </div>
        </div>
      </div>
    </q-card>
  </modal-dialog>
</template>

<script>
import Branch from './../../models/Branch'
import ModalDialog from './../ModalDialog'

export default {

  components: {
    ModalDialog
  },

  data() {
    return {
      form: [],
      branches: [],
      errors: [],
      branchesInInnerRotation: [],
      innerRotationNumber: 0,
    }
  },

  computed: {
    isSaveButtonDisabled() {
      return this.form.some((branch, index) => this.hasSamePriorities(branch.priority, index) ||
                                               this.isValidPriorityValue(branch.priority, index))
    }
  },

  methods: {
    async setupBranchesList() {
      this.branches = await Branch.query().where('code', (value) => value !== 'HQ').orderBy('priority', 'ASC').get()

      this.branchesInInnerRotation = (await this.$store.dispatch('GetBranchesInInnerRotation')).data
      if (!this.branchesInInnerRotation) this.branchesInInnerRotation = []

      this.innerRotationNumber = (await this.$store.dispatch('GetInnerRotationNumber')).data
      if (!this.innerRotationNumber) this.innerRotationNumber = 0

      for (const branch of this.branches) {
        this.form.push({
          uuid: branch.uuid,
          type: branch.type,
          priority: branch.priority,
          isInRR: branch.isInRR ? branch.isInRR : false,
          isInInnerRR: this.branchesInInnerRotation.includes(branch.uuid),
          leadcapacity: branch.leadcapacity ? branch.leadcapacity : 0
        })
      }
    },

    onClickRefreshCapacity() {
      this.$store.dispatch('RefreshLeadCapacity')
    },

    async onClickSave() {
      try {
        for (const updBranch of this.form) {
          await this.$store.dispatch('UpdateBranch', updBranch)
        }

        const innerRotationBranches = this.form
          .filter(branch => branch.isInInnerRR)
          .map(branch => {
            return {
              branchUuid: branch.uuid,
              nums: this.innerRotationNumber,
            }
          })
        await this.$store.dispatch('UpdateInnerRotation', innerRotationBranches)

        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Inner rotation value has been updated!`)
      } catch (e) {
        console.log(e)
        this.$notify('error', 'Inner rotaton failed to be updated!')
      }
    },

    hasSamePriorities(priority, index) {
      priority = parseInt(priority)
      const priorities = this.form.map(b => b.priority)
      priorities.splice(index, 1)

      if (priorities.some(p => p === priority)) {
        this.errors[index] = 'No similar priorities.'
        return true
      }

      return false
    },

    isValidPriorityValue(priority, index) {
      priority = parseInt(priority)

      if (priority < 1) {
        this.errors[index] = 'Priority must be more than 1.'
        return true
      }

      if (Number.isNaN(priority)) {
        this.errors[index] = 'Priority required.'
        return true
      }

      return false
    },

    reset() {
      this.form = []
    },
  },
}
</script>
