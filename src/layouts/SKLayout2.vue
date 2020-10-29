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
        class="bg-grey-2 text-black shadow-2 "
      >
        <q-tab name="contractor"  label="Contractor" />
        <q-tab name="plan"  label="Plan" />
        <q-tab name="process"  label="Process" />
        <q-tab name="documents"  label="Documents" />
        <q-tab name="finance"  label="Finance" />
        <q-tab name="analytics"  label="Analytics" />
        <q-tab name="database"  label="Database" />
        <q-tab name="directory"  label="Directory" />
        <q-tab name="service"  label="Service" />
      </q-tabs>
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="black"
        class="bg-white text-grey-9 shadow-2"
      >
        <q-tab name="contractor" icon="fas fa-user-plus"  label="Add User" />
        <q-tab name="plan" icon="fas fa-user-friends"  label="Plan" />
        <q-tab name="process" icon="far fa-clock" label="Process" />
        <q-tab name="documents" icon="far fa-calendar-alt"  label="Documents" />
        <q-tab name="finance" icon="fas fa-edit" label="Finance" />
        <q-tab name="analytics" icon="far fa-sticky-note" label="Analytics" />
        <q-tab name="database" icon="far fa-plus-square" label="Database" />
        <q-tab name="directory" icon="far fa-check-circle" label="Directory" />
        <q-tab name="service" icon="fas fa-phone-square-alt" label="Service" />
        <!-- <q-route-tab to="/dashboard2" exact name="service" icon="fas fa-phone-square-alt" label="Service" />
        <q-route-tab to="/graph" exact name="service" icon="fas fa-phone-square-alt" label="Service" /> -->
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

<style scoped>

</style>
