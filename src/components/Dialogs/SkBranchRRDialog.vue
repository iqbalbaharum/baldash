<template>
  <modal-dialog
    ref="dialog"
    name="rrbranch"
    @show-dialog="setupBranchesList"
  >
    <q-card style="width:1800px">
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
              Include?
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
                type="number"
              />
            </q-item-section>

            <q-item-section class="col">
              {{ branch.name }} ({{ branch.code }})
            </q-item-section>

            <q-item-section class="col-2">
              <q-checkbox v-model="form[index].isInRR" />
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
          <q-input
            v-model.number="rotation"
            filled
            dense
            label="Rotation"
          />
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
      rotation: null,
    }
  },

  computed: {
  },

  methods: {
    async setupBranchesList() {
      this.branches = await Branch.query().where('code', (value) => value !== 'HQ').orderBy('priority', 'ASC').get()
      for (const branch of this.branches) {
        this.form.push({
          uuid: branch.uuid,
          type: branch.type,
          priority: branch.priority,
          isInRR: branch.isInRR ? branch.isInRR : false,
          leadcapacity: branch.leadcapacity ? branch.leadcapacity : 0
        })
      }
    },
    onClickRefreshCapacity() {
      this.$store.dispatch('RefreshLeadCapacity')
    },
    onClickSave() {
      try {
        for (const updBranch of this.form) {
          this.$store.dispatch('UpdateBranch', updBranch)
        }
        this.$store.dispatch('UpdateInnerRotation', this.rotation)
        this.$refs.dialog.$children[0].hide()
        this.$notify('success', `Inner rotation value has been updated!`)
      } catch (e) {
        console.log(e)
        this.$notify('error', 'Inner rotaton failed to be updated!')
      }
    }
  },
}
</script>
