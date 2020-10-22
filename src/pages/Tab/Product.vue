<template>
  <div>
    
    <databox 
			title="Product" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="products" 
			:columns="columns"
      :expandable="true"
      expandableFlag="haveVariation"
      rowKey="$id"
			@onAdd="onAdd"
		>

			<template v-slot:create-dialog-body>
				<div class="row q-gutter-sm">
          <div class="col-12">
            <h6 class="text-h6 text-grey">Details</h6>
          </div>

					<div class="col-12">
						<q-input outlined v-model="form.name" label="Name" />
					</div>
          <div class="col-12">
						<q-input type="textarea" outlined v-model="form.description" label="Description" />
					</div>
				</div>

        <div class="row q-gutter-sm">
          
          <!--  -->
          <div class="col-8">
            <q-input outlined v-model="form.brand" label="Brand" />
          </div>

          <!--  -->
          <div class="col-8">
            <q-input outlined v-model="form.material" label="Material" />
          </div>

          <div class="col-4">
            <q-input outlined v-model="form.weight" type="number" label="Weight (gram)" />
          </div>

        </div>

        <div class="row q-gutter-sm">
          <div class="col-4">
            <q-input outlined v-model="form.price" type="number" label="Price" />
          </div>
          <div class="col-4">
            <q-input outlined v-model="form.stock" type="number" label="Stock" />
          </div>
        </div>

        <div class="row q-gutter-sm">
          <div class="col-12">
            <q-list>
              <q-item tag="label">
                <q-item-section>
                  <q-item-label>Is there item variations? E.g color, size</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-toggle color="blue" v-model="form.haveVariation" val="true" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        
        <div class="row q-gutter-sm">
          <div class="col-12">
            <h6 class="text-h6">Medias</h6>
          </div>

          <div class="col-4">
            <q-uploader
              label="Cover Photo"
              url="http://localhost:4444/upload"
              style="max-width: 100%"
            />
          </div>
        </div>

        <div class="row q-gutter-sm">
          <div class="col">
            <q-uploader
              label="Image 1"
              url="http://localhost:4444/upload"
              style="max-width: 100%"
            />
          </div>
          <div class="col">
            <q-uploader
              label="Image 2"
              url="http://localhost:4444/upload"
              style="max-width: 100%"
            />
          </div>
          <div class="col">
            <q-uploader
              label="Image 3"
              url="http://localhost:4444/upload"
              style="max-width: 100%"  
            />
          </div>
          
        </div>

        <div class="row q-gutter-sm">
          <div class="col-4">
            <q-uploader
              label="Image 4"
              url="http://localhost:4444/upload"
              style="max-width: 100%"
            />
          </div>
          <div class="col-4">
            <q-uploader
              label="Image 5"
              url="http://localhost:4444/upload"
              style="max-width: 100%"
            />
          </div>
          
        </div>

			</template>

      <template v-slot:expand-body>
        <div class="q-pb-md q-gutter-sm">
          <div class="row q-gutter-sm">
            <q-btn flat color="primary" icon="add" label="Add Variants" @click="onClickAddVariants" />
            <q-btn outline color="positive" label="Manage Variants" />
          </div>

          <div class="row q-gutter-sm" v-for="(variant, index) in data.variants" :key="index">
            <div class="col-4">
              <q-input filled dense v-model="data.variants[index].name" label="Name" />
            </div>
            <div class="col-6">
              <q-select
                label="Options"
                filled
                dense
                v-model="data.variants[index].options"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
              />
            </div>
            <div class="col-1">
              <q-btn flat icon="check" color="positive" @click="onClickSaveVariants(index)" />
              <q-btn flat icon="delete" color="negative" @click="onClickDeleteVariants(index)" />
            </div>
          </div>
          
        </div>
      </template>

		</databox>
    
  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Product from './../../models/Product'

export default {
  data() {
    return {
      columns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: true },
        { name: 'stock', align: 'center', label: 'Stock', field: 'stock', sortable: true },
        { name: 'variation', align: 'left', label: 'Variation', field: 'haveVariation', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
			],
      form: {
        name: '',
        description: '',
        weight: 0,
        brand: '',
        material: '',
        price: 0,
        stock: 0,
        haveVariation: false
      },
      data: {
        variants: []
      },
      dialog: {
        show: false,
      }
    }
  },

  computed: {
    products() {
      return Product.all()
		}
  },

  created() {
		this.$store.dispatch('GetAllProducts')
	},

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteProduct', id)
    },
    onAdd() {
			this.$store.dispatch('AddProduct', this.form)
    },
    
    onClickSave() {
			
		},

		onClickCancel() {
			this.dialog.roleArr = []
			this.dialog.userId = ''
			this.dialog.show = false
    },
    
    onClickAddVariants() {
      this.data.variants.push({
        id: '',
        name: '',
        options: []
      },)
    },

    onClickSaveVariants(index) {
      const id = this.data.variants[index].id
      if(id) {
        // update
      } else {
        // save
      }
    },

    onClickDeleteVariants(index) {
      const id = this.data.variants[index].id
      if(id) {
        
      }

      this.data.variants.splice(index, 1)
    }
  }
}
</script>
