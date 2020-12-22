<template>
  <div class="q-pa-md q-gutter-y-sm">
    <q-tabs
      v-model="currentTab"
      inline-label
      shrink
      stretch
      align="left"
    >
      <q-tab
        v-for="(tab, index) in datatabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.name"
      >
        <q-btn
          v-if="index > 0"
          flat
          icon="close"
          dense
          round
          size="sm"
          color="grey"
          class="q-ml-sm"
          @click="onClickCloseDataTab(index)"
        />
      </q-tab>
    </q-tabs>

    <q-table
      v-if="datatabs[activeDataTab]"
      class="sticky-table"
      virtual-scroll
      :columns="datatabs[activeDataTab].columns"
      :data="datatabs[activeDataTab].data"
      :style="{ height: computedTableHeight }"
      :row-key="datatabs[activeDataTab].key"
      selection="multiple"
      :selected.sync="selection"
      :pagination.sync="pagination"
      :filter="search"
      @update:fullscreen="(value) => isTableFullscreen = value"
    >
      <template v-slot:top="props">
        <filter-plugins />

        <q-space />

        <q-input
          v-model="search"
          dense
          debounce="300"
          placeholder="Search"
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

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
import FilterPlugins from '../components/Filter/Index'
import { mapGetters, mapState } from 'vuex'

export default {

  components: {
    DialogPlugins, FilterPlugins
  },
  data() {
    return {
      search: '',
      isTableFullscreen: false,
      pagination: {
        rowsPerPage: 0
      },
    }
  },

  computed: {
    ...mapGetters([
      'datatabs',
      'activeDataTab',
    ]),
    ...mapState({
      activeMenu: state => state.app.activeMenu,
      tableSelection: state => state.app.tableSelection
    }),
    currentTab: {
      set(value) {
        const index = this.datatabs.findIndex(element => element.name === value)
        if (index >= 0) {
          this.$store.dispatch('SetActiveDataTab', index)
        }
      },
      get() {
        const currentDatatab = this.datatabs[this.activeDataTab]
        if (currentDatatab) {
          return currentDatatab.name
        }

        return ''
      }
    },
    selection: {
      set(selection) {
        this.$store.dispatch('OnTableSelection', selection)
      },
      get() {
        return this.tableSelection
      }
    },
    computedTableHeight: function() {
      return this.isTableFullscreen ? '100vh' : '500px'
    }
  },

  methods: {
    onClickFilter() {

    },
    onClickCloseDataTab(index) {
      this.$store.dispatch('CloseDataTab', index)
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

