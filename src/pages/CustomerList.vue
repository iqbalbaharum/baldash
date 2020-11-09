<template>
  <div class="q-pa-md">
    <q-table
      :data="leads"
      :columns="columns"
      row-key="orderid"
      binary-state-sort
      virtual-scroll
      :rows-per-page-options="[0]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="check" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="contact" :props="props">
            {{ props.row.contact }}
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.location }}
            <q-popup-edit v-model="props.row.location">
              <q-input
                v-model="props.row.location"
                dense
                autofocus
                counter
              />
            </q-popup-edit>
          </q-td>
          <q-td key="propertytype" :props="props">
            {{ props.row.propertytype }}
            <q-popup-edit v-model="props.row.propertytype">
              <q-input
                v-model="props.row.propertytype"
                dense
                autofocus
                counter
              />
            </q-popup-edit>
          </q-td>
          <q-td key="age" :props="props">
            {{ props.row.age }}
            <q-popup-edit v-model="props.row.age">
              <q-input
                v-model="props.row.age"
                dense
                autofocus
                counter
              />
            </q-popup-edit>
          </q-td>
          <q-td key="propertyvalue" :props="props">
            {{ props.row.propertyvalue }}
          </q-td>
          <q-td key="appointment" :props="props">
            {{ props.row.appointment }}
          </q-td>
          <q-td key="source" :props="props">
            {{ props.row.source }}
          </q-td>
          <q-td key="channel" :props="props">
            {{ props.row.channel }}
          </q-td>
          <q-td key="campaign" :props="props">
            {{ props.row.campaign }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <dialog-plugins />
  </div>
</template>

<script>
import DialogPlugins from '../components/Dialogs/Index'

export default {

  components: {
    DialogPlugins
  },
  data() {
    return {
      datacollection: null,
      data: { tabs: 'list'
      },

      columns: [
        { name: 'name', required: true, label: 'Customer Name', align: 'left', field: row => row.orderid, sortable: true },
        { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'contact', label: 'Mobile No.', align: 'left', field: 'contact', sortable: true },
        { name: 'location', label: 'Property Location', align: 'left', field: 'location', sortable: true },
        { name: 'propertytype', label: 'Property Type', align: 'left', field: 'propertytype', sortable: true },
        { name: 'age', label: 'Age Group', align: 'left', field: 'age' },
        { name: 'propertyvalue', label: 'Property Value', field: 'propertyvalue', align: 'left', sortable: true },
        { name: 'appointment', label: 'Appointment Time', field: 'appointment', align: 'left', sortable: true },
        { name: 'source', label: 'Lead Source', field: 'source', align: 'left', sortable: true },
        { name: 'channel', label: 'Contact Channel', field: 'channel', align: 'left', sortable: true }
      ],
      leads: [
        {
          name: 'Arif Kadir',
          email: 'muhammad.arif.kadir@gmail.com',
          contact: '0176194601',
          location: 'NEGERI SEMBILAN',
          propertytype: 'Landed - Link',
          age: '30-39',
          propertyvalue: 'BELOW 500K',
          appointment: '8am-10am',
          source: 'Google',
          channel: 'SK Website',
          campaign: 'Triple Value Promo',
        },
        {
          name: 'Haizlene Abd Halim',
          email: 'kuchaizz@gmail.com',
          contact: '0123133500',
          location: 'SHAH ALAM',
          propertytype: 'Landed - Semi-D / Banglow House',
          age: '30-39',
          propertyvalue: '',
          appointment: '',
          source: 'Google',
          channel: 'SK Website',
          campaign: 'General inquiries 2020',
        },
        {
          name: 'Nellieezzd',
          email: 'natalieyan18@gmail.com',
          contact: '0103724983',
          location: 'PERAK',
          propertytype: 'Landed - Semi-D / Banglow House',
          age: '29 and below',
          propertyvalue: '',
          appointment: '',
          source: 'Instagram',
          channel: 'SK Website',
          campaign: 'October 2020',
        },
        {
          name: 'Chin Ai Vye',
          email: 'aivyechin@gmail.com',
          contact: '0192238830',
          location: 'BANGSAR',
          propertytype: 'Landed - Semi-D / Banglow House',
          age: '50 and above',
          propertyvalue: '',
          appointment: '',
          source: 'Google',
          channel: 'SK Website',
          campaign: 'October 2020',
        },
        {
          name: 'purushoth',
          email: 'purushothlavan96@gmail.com',
          contact: '01115540416',
          location: 'NEGERI SEMBILAN',
          propertytype: 'Landed - Semi-D / Banglow House',
          age: '29 and below',
          propertyvalue: '',
          appointment: '',
          source: '',
          channel: 'SK Website',
          campaign: 'October 2020',
        },

        {
          name: 'Vivian lee',
          email: 'vivianleecw@gmail.com',
          contact: '0122328248',
          location: 'JOHOR',
          propertytype: 'Landed - Semi-D / Banglow House',
          age: '30-39',
          propertyvalue: 'Google',
          appointment: '',
          source: '',
          channel: 'SK Website',
          campaign: 'October 2020',
        },

        {
          name: 'fadhil',
          email: 'fadhilrasul@gmail.com',
          contact: '0193380807',
          location: 'KUALA LUMPUR',
          propertytype: 'Condominium',
          age: '30-39',
          propertyvalue: '',
          appointment: '',
          source: 'Instagram',
          channel: 'SK Website',
          campaign: 'October 2020',
        },

        {
          name: 'Zenn Lee',
          email: 'lycutely@gmail.com',
          contact: '0122629527',
          location: 'SELANGOR',
          propertytype: 'Landed - Link',
          age: '30-39',
          propertyvalue: '',
          appointment: '',
          source: 'Google',
          channel: 'SK Website',
          campaign: 'October 2020',
        },

        {
          name: 'Khair izwan',
          email: 'khairizwan.khudzari@outlook.com',
          contact: '0133369745',
          location: 'SELANGOR',
          propertytype: 'Landed - Link',
          age: '30-39',
          propertyvalue: '',
          appointment: '',
          source: 'Instagram',
          channel: 'SK Website',
          campaign: 'October 2020',
        },

      ],
    }
  },

  created() {
    this.$root.$on('header-btn-clicked', this.onHeaderBtnClicked)
  },
  beforeDestroy() {
    this.$root.$off('header-btn-clicked', this.onHeaderBtnClicked)
  },

  methods: {
    addColumn() {
      this.columns.push({ name: 'campaign', label: 'Campaign Name', field: 'campaign', align: 'left', sortable: true },)
    },
    onHeaderBtnClicked(btnName) {
      if (btnName !== 'importonlineleads') return
      this.showImportOnlineLeadsDialog = true
    }
  },
}
</script>

