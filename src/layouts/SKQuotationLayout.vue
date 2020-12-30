<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      style="height: 400px"
      class=" rounded-borders"
    >
      <q-header bordered class="bg-white">
        <q-toolbar class="bg-black">
          <img src="~assets/sklogo.png" width="100">
          <q-space />
        </q-toolbar>
      </q-header>

      <q-page-container class="bg-grey-3">
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  computed: {

  },
  async created() {
    await this.$store.dispatch('InitializePage')
  },

  methods: {
    onClickLogout() {
      this.$store.dispatch('Logout')
      this.$router.push({ path: '/login' })
    }
  },
}
</script>
