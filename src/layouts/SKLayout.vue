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
          <q-btn
            label="Logout"
            flat
            text-color="white"
            @click="onClickLogout"
          />
        </q-toolbar>
        <q-tabs
          v-model="currentTab"
          inline-label
          switch-indicator
          active-color="black"
          indicator-color="white"
          class="bg-grey-3 text-black shadow-0"
          align="left"
          active-bg-color="white"
        >
          <q-tab
            v-for="(header) in menus"
            :key="header.name"
            :name="header.name"
            :label="header.label"
          />
        </q-tabs>
        <q-tab-panels
          v-for="(header) in menus"
          :key="header.name"
          v-model="currentTab"
          class="text-black"
        >
          <q-tab-panel :name="header.name" class="q-pa-none">
            <panel-button-group
              v-model="link"
              :current-link="link"
              :buttons="header.buttons"
            />
          </q-tab-panel>
        </q-tab-panels>
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
import PanelButtonGroup from '../components/PanelButtonGroup'
import { mapGetters, mapState } from 'vuex'

export default {

  components: {
    PanelButtonGroup
  },
  data() {
    return {
      link: 'inbox',
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ]),
    ...mapState({
      activeMenu: state => state.app.activeMenu
    }),
    currentTab: {
      set(currentTab) {
        this.$store.dispatch('SetActiveMenu', currentTab)
      },
      get() {
        return this.activeMenu
      }
    }
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
