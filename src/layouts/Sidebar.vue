<template>
  <div>
    <q-list>
      <q-item-label
        header
        class="text-grey-1 bg-teal-6 text-h5 text-center"
      >
        Material
      </q-item-label>
      <EssentialLink
        v-for="link in menus"
        :key="link.meta.title"
        :title="link.meta.title"
        :link="link.path"
        :icon="link.meta.icon"
      />
    </q-list>
  </div>
</template>

<script>
import EssentialLink from '../components/EssentialLink'
import { mapGetters } from 'vuex'

export default {
  components: {
    EssentialLink
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'menus'
    ])
  },

}
</script>
