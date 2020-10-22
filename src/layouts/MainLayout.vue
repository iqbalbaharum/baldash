<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          
        </q-toolbar-title>

        <q-btn-dropdown stretch flat label="M. Iqbal">
          <q-list>
            <q-item clickable v-close-popup tabindex="0" to="/profile">
              <q-item-section avatar>
                <q-avatar text-color="grey" icon="account_box" />
              </q-item-section>

              <q-item-section>Shop Profile</q-item-section>
            </q-item>

            <q-item clickable v-close-popup tabindex="1">
              <q-item-section avatar>
                <q-avatar text-color="grey" icon="logout" />
              </q-item-section>

              <q-item-section @click="onClickLogout">Logout</q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <sidebar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Sidebar from './Sidebar'

export default {
  name: 'MainLayout',
  components: { Sidebar },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    onClickLogout() {
      this.$store.dispatch('Logout')
        .then(res => {
          this.$router.push('/login')
        })
    }
  },
}
</script>
