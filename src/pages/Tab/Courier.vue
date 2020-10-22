<template>
  <div>
    <databox 
			title="Courier" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="couriers" 
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
import Courier from './../../models/Courier'

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
    couriers() {
      return Courier.all()
		}
  },

  created() {
		this.$store.dispatch('GetAllCouriers')
	},

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteCourier', id)
    },
    onAdd() {
			this.$store.dispatch('AddCourier', this.form)
    },

  }
}
</script>
