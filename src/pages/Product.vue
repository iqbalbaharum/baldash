<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Product" v-if="data.tabs === 'product'" />
        <q-breadcrumbs-el label="Category" v-if="data.tabs === 'category'" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-tabs
          narrow-indicator
          dense
          align="left"
          v-model="data.tabs"
          class="text-primary"
        >
          <q-tab name="product" label="Products" />
          <q-tab name="category" label="Categories" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'category'" class="flex flex-center">
      <category-box />
    </div>

    <div v-if="data.tabs === 'product'" class="flex flex-center">
      <product-box />
    </div>

  </div>
</template>

<script>
import CategoryBox from './Tab/Category'
import ProductBox from './Tab/Product'

export default {
  data() {
    return {
      data: {
        tabs: 'product'
      },
    }
  },

  computed: {
  },

  created() {
  },

  components: {
    ProductBox,
    CategoryBox
  },

  methods: {
  }
}
</script>
