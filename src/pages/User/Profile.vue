<template>
  <q-page class="q-pa-md row justify-center q-gutter-md">
    <q-card class="col-12">
      <q-card-section horizontal class="q-pa-md">

        <q-card-section>
          <q-avatar size="100px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </q-card-section>

        <q-card-section class="q-gutter-y-sm">
          <span class="text-h5 text-capitalize">{{ name }} <q-btn flat label="Edit Profile" color="primary" @click="onClickEditButton" /></span>
          
          <div class="text-grey text-body">
            <q-icon name="mail" class="q-mx-sm" color="orange" /><span>{{ email }}</span>
            <q-icon name="fab fa-instagram" class="q-mx-sm" color="red"/><span>iqbalbaharum</span>
            <q-icon name="fab fa-facebook" class="q-mx-sm" color="blue" /><span>iqbalbaharum</span>
            <q-icon name="fab fa-twitter" class="q-mx-sm" color="primary" /><span>iqbalbaharum</span>
          </div>
          <!-- <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis eros et nulla dictum congue. Aenean aliquet bibendum erat a bibendum. Vivamus ac nulla a mi condimentum ultricies. Cras at risus vitae nisl semper faucibus. Aenean vitae hendrerit leo, at lacinia enim. Vestibulum fringilla, justo at scelerisque auctor, purus purus faucibus ante, eu blandit ipsum turpis a est. Aliquam nec dapibus erat.
          </div> -->
          
          <div class="text-grey text-body">
            <q-chip square size="md" color="primary" class="text-white text-capitalize">
              <q-avatar icon="fas fa-check-double" color="green" text-color="white" />
              SSM
            </q-chip>
            <q-chip square size="md" color="primary" class="text-white text-capitalize">
              <q-avatar icon="fas fa-check-double" color="green" text-color="white" />
              Verified Seller
            </q-chip>
          </div>

        </q-card-section>

      </q-card-section>

      <q-separator />

      <q-card-section class="bg-blue-1">
        <div class="row q-gutter-x-md">
          <q-card class="col row justify-center" flat>
            <q-item>
              <q-item-section avatar>
                <q-icon name="fas fa-boxes" size="lg" color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h4">5</q-item-label>
                <q-item-label class="text-body text-grey">
                  Total Product
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

          <q-card class="col row justify-center" flat>
            <q-item>
              <q-item-section avatar>
                <q-icon name="fas fa-truck-loading" size="lg" color="positive" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h4">100</q-item-label>
                <q-item-label class="text-body text-grey">
                  Item Sold
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

          <q-card class="col row justify-center" flat>
            <q-item>
              <q-item-section avatar>
                <q-icon name="fas fa-star" size="lg" color="yellow" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h4 row items-center">4.5</q-item-label>
                <q-item-label class="text-body text-grey">
                  Avg. Reviews
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>

        </div>
      </q-card-section>

      <q-separator />
    </q-card>

    <div class="col-12" flat>
      <div class="text-grey text-body q-py-md">
        Total of 12 products
      </div>

      <q-list class="row">
        <q-item v-for="(index) in products" :key="index" class="col-4">
          <q-card>
            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  Ikan Masin
                </div>
              </div>
              <div class="text-caption text-grey">
                Small plates, salads & sandwiches in an intimate setting.
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h4">
                RM 10.00
              </div>
              
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat color="primary">
                Add To Cart
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tab: '',
      products: [{}, {}, {}, {}]
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'email'
    ])
  },
}
</script>

<style scoped>
</style>