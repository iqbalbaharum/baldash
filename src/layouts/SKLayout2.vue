<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      style="height: 400px"
      class=" rounded-borders"
    >
      <q-header elevated>
        <q-toolbar class="bg-teal">
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
          />
          <q-avatar>
            <q-icon name="style" />
          </q-avatar>
          <q-toolbar-title>SK</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="whatshot"
          />
        </q-toolbar>
        <q-tabs
          v-model="tab"
          inline-label
          switch-indicator
          active-color="black"
          indicator-color="primary"
          class="bg-grey-1 text-black shadow-2 "
          align="justify"
        >
          <q-tab name="usermanagment" label="User Management" />
          <q-tab name="onlineleads" label="Online Leads" />
          <q-tab name="qualifiedleads" label="Qualified Leads" />
          <q-tab name="designproposal" label="Design Proposal" />
          <q-tab name="orderconfirmation" label="Order Confirmation" />
          <q-tab name="servicereport" label="Service Report" />
        </q-tabs>
        <q-tabs
          v-model="tab"
          indicator-color="transparent"
          active-color="black"
          class="bg-white text-grey-9 shadow-0"
          align="justify-left"
        >
          <q-tab
            name="contractor"
            icon="fas fa-user-plus"
            label="Add User"
          />
        </q-tabs>
      </q-header>
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 'mails',
      link: 'inbox',
    }
  }
}
</script>
