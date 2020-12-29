<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      style="height: 100%"
      class=" rounded-borders"
    >
      <q-chip color="primary" text-color="white">Drawing ID, {{ form.drawingNumber }}</q-chip>
      <div class="text-h6 q-mt-md">
        Item Details
      </div>
      <q-card class="q-mt-md">
        <q-card-section>
          <q-list>
              <q-item v-for="item in quotationItem" :key="item.uuid">
                  <div class="row">
                      <div class="col-4">
                          {{ item.brandGoodName}}
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
                          {{ item.recommendedRetailPrice }}
                      </div>
                  </div>
              </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <div class="text-h6 q-mt-md">
        Trading Items
      </div>
      <q-card class="q-mt-md">
        <q-card-section>
        </q-card-section>
      </q-card>
      <div class="text-h6 q-mt-md">
        Kitchen Appliances
      </div>
      <q-card class="q-mt-md">
        <q-card-section>
        </q-card-section>
      </q-card>
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
        totalPrice: null
      }
    }
  },
  computed: {

  },
  async created() {
    this.quotation = await this.$store.dispatch('GetDesigns', this.$route.params.designId)
    this.form.drawingNumber = this.quotation.drawingNumber
    this.quotationItem = this.quotation.quotationDetails
    console.log(this.quotation)
  },

  methods: {

  },
}
</script>
