<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      style="height: 100%"
      class=" rounded-borders"
    >
      <q-chip color="primary" text-color="white">
        Drawing ID, {{ form.drawingNumber }}
      </q-chip>
      <div class="text-h6 q-mt-md">
        Item Details
      </div>
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="row">
            <div class="col-4 text-weight-bold">
              BrandGood Name
            </div>
            <div class="col-2 text-weight-bold">
              Product Number
            </div>
            <div class="col-2 text-weight-bold">
              Material
            </div>
            <div class="col-2 text-weight-bold">
              Quantity
            </div>
            <div class="col-2 text-weight-bold">
              RRP (RM)
            </div>
          </div>
          <q-list>
            <q-item
              v-for="item in quotationItem"
              :key="item.uuid"
              class="row"
            >
              <div class="col-4">
                {{ item.brandGoodName }}
              </div>
              <div class="col-2">
                {{ item.productNumber }}
              </div>
              <div class="col-2">
                {{ item.materialName }}
              </div>
              <div class="col-2">
                {{ item.quantity }}
              </div>
              <div class="col-2">
                {{ item.recommendedRetailPrice.toFixed(2) }}
              </div>
            </q-item>
          </q-list>
          <div class="row">
            <div class="col-9 q-ml-xl text-weight-bold">
            </div>
            <q-input
              v-model="form.totalPrice"
              class="col-2 q-pb-none q-gutter-sm justify"
              outlined
              label="Total Price (RM)"
              disable
            />
          </div>
        </q-card-section>
      </q-card>
      <div class="text-h6 q-mt-md">
        Trading Items
      </div>
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="col-4 q-mb-md text-weight-bold">
            Worktop
          </div>
          <div class="row q-gutter-sm justify">
            <q-select
              v-model="form.worktop"
              :options="options.worktop"
              label="Subcategory"
              outlined
              multiple
              emit-value
              map-options
              stack-label
              class="col-3 q-pb-none"
            />
            <q-select
              v-model="form.worktop"
              :options="options.worktop"
              label="Name"
              outlined
              multiple
              emit-value
              map-options
              stack-label
              class="col-3 q-pb-none q-ml-md"
            />
            <q-btn
              class="col-2 q-pb-none q-ml-md"
              color="primary"
              label="Add"
              @click="onClickAddWorktop"
            />
          </div>
        </q-card-section>
      </q-card>
      <q-card class="q-mt-md">
        <q-card-section>
          <div class="col-4 q-mb-md text-weight-bold">
            Kitchen Appliances
          </div>
          <div class="row q-gutter-sm justify">
            <q-select
              v-model="form.worktop"
              :options="options.worktop"
              label="Subcategory"
              outlined
              multiple
              emit-value
              map-options
              stack-label
              class="col-3 q-pb-none"
            />
            <q-select
              v-model="form.worktop"
              :options="options.worktop"
              label="Name"
              outlined
              multiple
              emit-value
              map-options
              stack-label
              class="col-3 q-pb-none q-ml-md"
            />
            <q-btn
              class="col-2 q-pb-none q-ml-md"
              color="primary"
              label="Add"
              @click="onClickAddKitchen"
            />
          </div>
        </q-card-section>
      </q-card>
      <div class="q-mt-md" align="right">
        <q-btn
          color="primary"
          label="Confirm"
          @click="onClickConfirm"
        />
      </div>
    </q-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      quotation: {},
      quotationItem: [],
      brandGoods: [],
      form: {
        drawingNumber: '',
        totalPrice: null,
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
  computed: {

  },

  async created() {
    this.quotation = await this.$store.dispatch('GetDesigns', this.$route.params.designId)
    this.form.drawingNumber = this.quotation.drawingNumber
    this.form.totalPrice = this.quotation.totalPrice
    this.quotationItem = this.quotation.quotationDetails
    console.log(this.quotation)
  },

  methods: {
    onClickAddWorktop() {
      // TODO
      console.log('test')
    },

    onClickAddKitchen() {
      // TODO
      console.log('test')
    },

    onClickConfirm() {
      // TODO
      console.log('test')
    },
  },
}
</script>
