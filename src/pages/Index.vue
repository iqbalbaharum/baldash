<template>
  <q-page class="q-pa-md">
    <div class="text-h4">Welcome {{ name }}</div>
    <div class="row justify-center q-gutter-x-xl q-gutter-y-md q-mt-md">
      <div class="col-4" v-for="(button) in buttons" :key="button.label">
        <q-btn
          size="xl"
          padding="xl lg"
          :to="button.to"
          class="full-width dashboard-button"
          align="left"
          no-caps
        >
          <div class="column">
            <q-icon class="col" :name="button.icon" />
            <div class="col text-body text-center capitalize">{{ button.label }}</div>
          </div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      buttons: [
        {
          label: 'My Account',
          icon: 'eco',
          to: '/'
        },
        {
          label: 'Product',
          icon: 'eco',
          to: '/'
        },
        {
          label: 'Sales',
          icon: 'eco',
          to: '/'
        },
        {
          label: 'Sales',
          icon: 'eco',
          to: '/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
}
</script>

<style scoped>
.dashboard-button {
  height: 250px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
