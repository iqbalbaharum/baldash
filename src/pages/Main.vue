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
    >
      <template v-slot:top>
        <q-btn
          v-show="selected.length !== 0 && datatabs[activeDataTab].remove_action"
          color="negative"
          size="sm"
          icon="fas fa-trash-alt"
          label="Delete Selected"
          @click="removeSelected"
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
    },
    removeSelected() {
      const actionName = this.datatabs[this.activeDataTab].remove_action
      this.selected.forEach(data => {
        this.$store.dispatch(actionName, data.uuid)
      })
    }
  },
}
</script>

