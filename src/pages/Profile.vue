<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Profile" />
        <q-breadcrumbs-el label="Basic Information" v-if="data.tabs === 'basic'" />
        <q-breadcrumbs-el label="Shop Information" v-if="data.tabs === 'shop'" />
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
          <q-tab name="basic" label="Basic Information" />
          <q-tab name="shop" label="Shop Information" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'basic'" class="flex flex-center">
      <basic-profile />
    </div>

    <div v-if="data.tabs === 'courier'" class="flex flex-center">
      <courier-box />
    </div>
  </div>
</template>

<script>
import BasicProfile from './Tab/BasicProfile'

export default {
  data() {
    return {
      data: {
        tabs: 'basic'
      },
    }
  },

  components: {
    BasicProfile
  }
}
</script>
