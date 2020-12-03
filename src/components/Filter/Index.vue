<template>
  <q-btn
    v-if="allowedTabs.includes(activeMenu)"
    flat
    dense
    icon="filter_alt"
    color="primary"
    @click="onClickFilter"
  >
    <sk-filter-user v-if="activeMenu === 'usermanagement'" />
    <sk-filter-lead-OL v-if="activeMenu === 'onlineleads'" />
    <sk-filter-lead-QL v-if="activeMenu === 'qualifiedleads'" />
  </q-btn>
</template>

<script>
import SkFilterUser from './SkFilterUser'
import SkFilterLeadOL from './SkFilterLeadOL'
import SkFilterLeadQL from './SkFilterLeadQL'
import { mapGetters } from 'vuex'

export default {

  components: {
    SkFilterUser, SkFilterLeadOL, SkFilterLeadQL
  },

  data() {
    return {
      allowedTabs: ['onlineleads', 'usermanagement', 'qualifiedleads']
    }
  },

  computed: {
    ...mapGetters([
      'activeMenu',
    ]),
  },

  methods: {
    onClickFilter() {

    }
  }
}
</script>
