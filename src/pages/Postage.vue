<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Postage" />
        <q-breadcrumbs-el label="Delivery Covered Area" v-if="data.tabs === 'zone'" />
        <q-breadcrumbs-el label="Couriers" v-if="data.tabs === 'courier'" />
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
          <q-tab name="zone" label="Delivery Covered Area" />
          <q-tab name="courier" label="Couriers" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'zone'" class="flex flex-center">
      <zone-box />
    </div>

    <div v-if="data.tabs === 'courier'" class="flex flex-center">
      <courier-box />
    </div>

  </div>
</template>

<script>
import ZoneBox from './Tab/Zone'
import CourierBox from './Tab/Courier'

export default {
  data() {
    return {
      data: {
        tabs: 'zone'
      },
    }
  },

  computed: {
  },

  created() {
    this.$store.dispatch('GetAllCategories')
  },

  components: {
    ZoneBox,
    CourierBox
  },

  methods: {
  }
}
</script>
