<template>



  <div>

    <!-- <div  class="text-right q-pb-md">
        <q-btn
          color="teal-6"
          text-color="white"
          :label="`New Customer`"
          @click="isCreateDialogOpened = !isCreateDialogOpened"
        />
    </div> -->

        <!-- <q-table
          title="Leads"
          :data="leads"
          :columns="columns"
          row-key="orderid"
          binary-state-sort
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="orderid" :props="props">
                {{ props.row.orderid }}
              </q-td>
              <q-td key="branch" :props="props">
                {{ props.row.branch }}
              </q-td>
              <q-td key="branchCode" :props="props">
                {{ props.row.branchCode }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name">
                  <q-input
                    v-model="props.row.name"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="contact" :props="props">
                {{ props.row.contact }}
                <q-popup-edit v-model="props.row.contact">
                  <q-input
                    v-model="props.row.contact"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
                <q-popup-edit v-model="props.row.email">
                  <q-input
                    v-model="props.row.email"
                    dense
                    autofocus
                    counter
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="person_inc" :props="props">
                {{ props.row.person_inc }}
              </q-td>
              <q-td key="status" :props="props">
                {{ props.row.status }}
              </q-td>
            </q-tr>
          </template>
        </q-table> -->

    <databox
      title="Customer"
      :crud="['create', 'update', 'delete', 'read']"
      :editablescol="['mobile', 'email']"
      :rows="users"
      :columns="columns"
      :menus="menus"
      @delete="onDelete"
      @onAdd="onAddUser"
    >
      <template v-slot:create-dialog-body>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              v-model="form.name"
              outlined
              label="Name"
            />
          </div>
          <div class="col">
            <q-input
              v-model="form.mobile"
              outlined
              label="Mobile"
            />
          </div>
          <div class="col">
            <q-input
              v-model="form.email"
              outlined
              label="Email"
            />
          </div>
          <div class="col">
            <q-input
              v-model="form.address"
              outlined
              type="address"
              label="Address"
            />
          </div>
        </div>
      </template>
    </databox>

    <q-dialog v-model="dialog.show">
      <q-card style="min-width: 300px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Assigning Roles
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            @click="onClickCancel"
          />
        </q-card-section>

        <q-card-section>
          <q-list separator bordered>
            <q-item v-for="(role, index) in roles" :key="role.$id">
              <q-item-section>
                <q-item-label>{{ role.name }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-if="dialog.roleArr[index]"
                  v-model="dialog.roleArr[index].value"
                  @input="assignRole(index)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Databox from '../components/Databox'
import User from '../models/User'
import Role from '../models/Role'

export default {

  components: {
    Databox
  },
  data() {
    return {

      columns: [
        { name: 'orderid', required: true, label: 'Order ID', align: 'left', field: row => row.orderid, sortable: true },
        { name: 'branch', label: 'Branch Location', align: 'left', field: 'branch', sortable: true },
        { name: 'branchCode', label: 'Branch Code', align: 'left', field: 'branchCode', sortable: true },
        { name: 'name', label: 'Lead Name', align: 'left', field: 'name', sortable: true },
        { name: 'contact', label: 'Contact', align: 'left', field: 'contact', sortable: true },
        { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'person_inc', label: 'Sales Person', align: 'left', field: 'person_inc' },
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
      ],
      leads: [
        {
          name: 'Iman Irfan',
          branch: 'Petaling Jaya',
          branchCode: 'PJF',
          orderid: '3443447-6d36-4eb2-dcb8-043dasd8106ce',
          person_inc: 'Faris Sufyan',
          contact: '0123432424',
          email: 'imnirfn@yahoo.com',
          status: 'Online',
        },
        {
          name: 'Muaz Wazir',
          branch: 'Johor Bahru',
          branchCode: 'DJB',
          orderid: '30301447-6d36-4eb2-bcb8-043d758106ce',
          person_inc: 'Khairunuqman',
          contact: '01542343242',
          email: 'muazwazir@gmail.com',
          status: 'Qualified',
        }
      ],


      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile' },
        { name: 'action', align: 'center', label: 'Status' }
      ],
      menus: [
        {
          label: 'Manage Roles',
          trigger: this.manageRole
        }
      ],
      options: {
        roles: []
      },
      dialog: {
        show: false,
        userId: '',
        roleArr: []
      },
      form: {
        mobile: '',
        name: '',
        email: '',
        address: ''
      }
    }
  },

  computed: {
    users() {
      return User.query().withAll().get()
    },
    roles() {
      return Role.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllUsers')
  },

  mounted() {
    this.loadAllRoles()
  },

  methods: {
    async loadAllRoles() {
      const loadRoles = await this.$store.dispatch('GetAllRoles')
      loadRoles.forEach(role => {
        this.options.roles.push({
          value: role.uuid,
          label: role.name
        })
      })
    },
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    onAddUser() {
      this.$store.dispatch('RegisterUser', this.form)
        .then(res => {
        })
    },

    async manageRole(id) {
      this.dialog.roleArr = []

      // const user = User.query().whereId(id).with('roles').first()

      for await (const arole of this.roles) {
        this.dialog.roleArr.push({
          id: arole.uuid,
          value: false
        })
      }

      const userRoles = await this.$store.dispatch('GetUserRoles', id)
      for await (const urole of userRoles) {
        const u = this.dialog.roleArr.find(element => element.id === urole.uuid)
        if (u) {
          console.log(u.id)
          u.value = true
        }
      }

      this.dialog.userId = id
      this.dialog.show = true
    },

    onClickSave() {

    },

    onClickCancel() {
      this.dialog.roleArr = []
      this.dialog.userId = ''
      this.dialog.show = false
    },

    assignRole(index) {
      const data = {
        roleId: this.dialog.roleArr[index].id,
        userId: this.dialog.userId
      }

      if (this.dialog.roleArr[index].value) {
        this.$store.dispatch('AssignUserRole', data)
      } else {
        this.$store.dispatch('UnassignUserRole', data)
      }
    }
  }
}
</script>
