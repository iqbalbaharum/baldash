<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <div class="q-pa-md">
        <q-table
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
        </q-table>
      </div>

      <div class="row justify-evenly q-gutter-md q-pa-md">
        <q-card
          flat
          bordered
          class="col text-center q-gutter-md q-pa-md"
          style="border-color: purple"
        >
          <q-avatar icon="money" />
          <q-separator light inset />
          <div class="text-h5 text-weight-bold text-purple-8">
            36%
          </div>
        </q-card>

        <q-card
          flat
          bordered
          class="col text-center q-gutter-md q-pa-md"
          style="border-color: purple"
        >
          <q-avatar icon="money" />
          <q-separator light inset />
          <div class="text-h5 text-weight-bold text-purple-8">
            36%
          </div>
        </q-card>

        <q-card
          flat
          bordered
          class="col text-center q-gutter-md q-pa-md"
          style="border-color: purple"
        >
          <q-avatar icon="money" />
          <q-separator light inset />
          <div class="text-h5 text-weight-bold text-purple-8">
            36%
          </div>
        </q-card>
        <q-card
          flat
          bordered
          class="col text-center q-gutter-md q-pa-md"
          style="border-color: purple"
        >
          <q-avatar icon="money" />
          <q-separator light inset />
          <div class="text-h5 text-weight-bold text-purple-8">
            36%
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import LineChart from '../boot/LineChart.js'

export default {

  components: {
    //  LineChart
    // Rolebox,
    // Userbox,
    // UserSessionbox,
  },
  data() {
    return {
      datacollection: null,
      data: {
        tabs: 'list'
      },
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
    }
  },
  mounted() {
    this.fillData()
    console.log(this.leads)
  },

  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data sdne',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>

