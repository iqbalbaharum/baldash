<template>
  <div>
    <databox 
			title="Category" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="categories" 
			:columns="columns"
			@onAdd="onAdd"
		>
			<template v-slot:create-dialog-body>
				<div class="row q-gutter-sm">
					<div class="col">
						<q-input outlined v-model="form.name" label="Name" />
					</div>
				</div>
			</template>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Category from './../../models/Category'

export default {
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
			],
      form: {
        name: ''
      }
    }
  },

  computed: {
    categories() {
      return Category.all()
		}
  },

  created() {
		this.$store.dispatch('GetAllCategories')
	},

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteCategory', id)
    },
    onAdd() {
			this.$store.dispatch('AddCategory', this.form)
    },

  }
}
</script>
