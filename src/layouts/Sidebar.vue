<template>
  <div>
    <q-list class="q-pt-md">

      <q-item clickable to="/profile">
        <q-item-section side top>
          <q-avatar color="primary" />
        </q-item-section>
        <q-item-section lines="2">
          <q-item-label><span class="text-weight-medium text-uppercase">{{ name }}</span></q-item-label>
          <q-item-label>
            <span class="text-caption">Click to display profile</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section>New Messages</q-item-section>
        <q-item-section side>
          <q-badge color="warning">0</q-badge>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    
      <EssentialLink
        v-for="link in menus"
        :key="link.meta.title"
        :title="link.meta.title"
        :caption="link.meta.title"
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
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'menus'
    ])
  },

  components: {
    EssentialLink
  }
}
</script>
