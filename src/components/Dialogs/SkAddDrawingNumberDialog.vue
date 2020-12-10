<template>
  <modal-dialog
    ref="dialog"
    name="insertDrawingNumber"
    @close-dialog="reset"
    @show-dialog="onDialogShow"
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
                  v-model="form.drawingNo"
                  class="col q-pb-none"
                  outlined
                  label="Drawing Number"
                  :rules="textRules"
                />
                <q-separator class="q-my-md" />

                <div class="text-weight-bold text-uppercase text-grey-5">
                  Trading Items
                </div>
                <q-select
                  v-model="form.fittingAndAccessories"
                  :options="options.fittingAndAccessories"
                  label="Fitting and Accessories"
                  outlined
                  multiple
                  emit-value
                  map-options
                  stack-label
                  class="col q-pb-none"
                />
                <q-select
                  v-model="form.kitchenAppliances"
                  :options="options.kitchenAppliances"
                  label="Kitchen Appliances"
                  outlined
                  multiple
                  emit-value
                  map-options
                  stack-label
                  class="col q-pb-none"
                />
                <q-select
                  v-model="form.sinkAndTap"
                  :options="options.sinkAndTap"
                  label="Sink and Tap"
                  outlined
                  multiple
                  emit-value
                  map-options
                  stack-label
                  class="col q-pb-none"
                />
                <q-select
                  v-model="form.worktop"
                  :options="options.worktop"
                  label="Worktop"
                  outlined
                  multiple
                  emit-value
                  map-options
                  stack-label
                  class="col q-pb-none"
                />

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
                    label="Calculate"
                    @click="onClickSubmit"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </modal-dialog>
</template>
<script>
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
      form: {
        drawingNo: '',
        fittingAndAccessories: [],
        kitchenAppliances: [],
        sinkAndTap: [],
        worktop: [],
      },
      options: {
        fittingAndAccessories: [],
        kitchenAppliances: [],
        sinkAndTap: [],
        worktop: [],
      }

    }
  },

  methods: {
    onDialogShow() {
      // TODO: Load all options
      console.log('Show drawing number dialog')
    },

    onClickSubmit() {
      // TODO
    },

    reset() {
      this.form = {
        drawingNo: '',
        fittingAndAccessories: [],
        kitchenAppliances: [],
        sinkAndTap: [],
        worktop: [],
      }
    },
  }
}
</script>
