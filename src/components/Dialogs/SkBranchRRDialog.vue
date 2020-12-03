<template>
  <modal-dialog
    ref="dialog"
    name="rrbranch"
  >
    <q-card style="width:1800px">
      <div class="q-pa-md">
        <q-list>
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
                v-model="form[index].priority"
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
                v-model="form[index].leadcapacity"
                filled
                dense
                :disable="form[index].type === 'home'"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md" />

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
      form: []
    }
  },

  computed: {
    branches() {
      return Branch.query().where('code', (value) => value !== 'HQ').orderBy('priority', 'ASC').get()
    },
  },

  created() {
    this.setupBranchesList()
  },

  methods: {
    setupBranchesList() {
      for (const branch of this.branches) {
        console.log(branch)
        this.form.push({
          id: branch.uuid,
          type: branch.type,
          priority: branch.priority,
          isInRR: branch.isInRR ? branch.isInRR : false,
          leadcapacity: branch.leadcapacity ? branch.leadcapacity : 0
        })
      }
    }
  },
  onClickRefreshCapacity() {

  },
  onClickSave() {

  }
}
</script>
