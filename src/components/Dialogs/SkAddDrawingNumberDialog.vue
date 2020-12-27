<template>
  <modal-dialog
    ref="dialog"
    name="insertDrawingNumber"
    @close-dialog="reset"
    @show-dialog="onShowDialog"
  >
    <q-card style="width:18000px">
      <div>
        <q-card-section class="bg-grey-10">
          <div class="text-white text-h6">
            Drawing Number
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm justify">
            <div class="text-weight-bold text-uppercase text-grey-5">
              To generate quotation
            </div>
            <q-separator class="q-my-md" />
            <q-form ref="myForm" @submit="onClickSubmit">
              <div class="q-gutter-sm justify">
                <q-input
                  v-model="drawingId"
                  class="col q-pb-none"
                  outlined
                  label="Drawing Number"
                  :rules="textRules"
                />

                <div v-if="totalPrice === null" align="left">
                  <q-btn
                    color="primary"
                    label="Calculate"
                    @click="onClickSubmit"
                  />
                </div>
                <q-separator class="q-my-md" />
                <div v-if="totalPrice !== null" class="text-weight-bold text-uppercase text-grey-5">
                  Total quotation price
                </div>
                <q-input
                  v-if="totalPrice !== null"
                  v-model="totalPrice"
                  class="col q-pb-none"
                  outlined
                  label="Total Price (RM)"
                  disable
                />
                <q-separator class="q-my-md" />
              </div>
            </q-form>
            <!-- Action buttons -->
            <div align="right">
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Cancel"
              />
              <q-btn
                color="primary"
                label="Continue to Detailed Quotation"
              />
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>
<script>
import ModalDialog from './../ModalDialog'
import validationMixin from '../../mixins/validationMixin.js'
import { mapGetters } from 'vuex'

export default {

  components: {
    ModalDialog
  },

  mixins: [
    validationMixin,
  ],

  data() {
    return {
      selectedLeadId: '',
      selections: [],
      form: {},
      drawingId: '',
      totalPrice: null,
    }
  },

  computed: {
    ...mapGetters([
      'tableSelection'
    ]),
  },

  watch: {
    selectedLeadId(newValue, oldValue) {
      const foundSelection = this.tableSelection.find((selection) => selection.uuid === newValue)
      this.form = { ...foundSelection }
    },
  },

  methods: {
    async onShowDialog() {
      this.selections = this.$store.getters.tableSelection
      if (!this.selections.length) return

      this.selections = this.selections.map((selection) => {
        const container = []
        container.label = selection.name
        container.value = selection.uuid
        return container
      })
      this.selectedLeadId = this.selections[0].value
    },

    async onClickSubmit() {
      // TODO
      const lead = { ...this.form }
      lead.drawingId = this.drawingId
      try {
        this.totalPrice = await this.$store.dispatch('CalculateDrawing', lead)
        this.$notify('success', `Successfully calculate drawing`)
      } catch (e) {
        console.log(e.response)
        const message = e.response.data.error.message
        this.$notify('error', message)
      }
    },

    reset() {
      this.calculate = {
        leadId: '',
        drawingId: '',
      }
    },
  }
}
</script>
