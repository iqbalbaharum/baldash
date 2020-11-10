<template>
  <div class="q-pa-md q-gutter-y-sm">
    <q-tabs
      v-model="currentTab"
      inline-label
      shrink
      stretch
      align="left"
      @input="onChangeTab"
    >
      <q-tab
        v-for="(tab) in datatabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.name"
      />
    </q-tabs>

    <q-table
      v-if="datatabs[activeDataTab]"
      :columns="datatabs[activeDataTab].columns"
      :data="datatabs[activeDataTab].data"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
    />

    <dialog-plugins />
  </div>
</template>

<script>
import DialogPlugins from '../components/Dialogs/Index'
import { mapGetters, mapState } from 'vuex'

export default {

  components: {
    DialogPlugins
  },
  data() {
    return {
      selected: [],
    }
  },

  computed: {
    ...mapGetters([
      'datatabs',
      'activeDataTab'
    ]),
    ...mapState({
      activeMenu: state => state.app.activeMenu
    }),
    currentTab: {
      set(value) {
        this.$store.dispatch('SetActiveMenu', value)
      },
      get() {
        return this.activeMenu
      }
    }
  },

  methods: {
    onChangeTab(newTab) {
      console.log(newTab)
    }
  },
}
</script>

