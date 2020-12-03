<template>
  <q-btn
    v-if="activeMenu.includes(allowedTabs)"
    flat
    dense
    icon="filter_alt"
    color="primary"
    @click="onClickFilter"
  >
    <sk-filter-user v-if="activeMenu === 'usermanagement'" />
  </q-btn>
</template>

<script>
import SkFilterUser from './SkFilterUser'
import { mapGetters } from 'vuex'

export default {

  components: {
    SkFilterUser
  },

  data() {
    return {
      allowedTabs: ['usermanagement']
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
