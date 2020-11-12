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
      class="sticky-table"
      virtual-scroll
      :columns="datatabs[activeDataTab].columns"
      :data="datatabs[activeDataTab].data"
      :style="{ height: computedTableHeight }"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      @update:fullscreen="(value) => isTableFullscreen = value"
    >
      <template v-slot:top="props">
        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
    </q-table>

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
      isTableFullscreen: false,
      pagination: {
        rowsPerPage: 0
      },
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
    },
    computedTableHeight: function() {
      return this.isTableFullscreen ? '100vh' : '500px'
    }
  },

  methods: {
    onChangeTab(newTab) {
      console.log(newTab)
    }
  },
}
</script>
<style lang="sass">
.sticky-table
  /* height or max-height is important */
  /* height: 410px */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>

