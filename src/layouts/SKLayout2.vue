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
<<<<<<< Updated upstream
      <q-tabs
        v-model="tab"
        inline-label
        switch-indicator
        active-color="black"
        indicator-color="primary"
        class="bg-grey-1 text-black shadow-2 "
        align="justify"
      >
        <q-tab name="usermanagment" label="User Management"/>
        <q-tab name="onlineleads"  label="Online Leads" />
        <q-tab name="qualifiedleads"  label="Qualified Leads" />
        <q-tab name="designproposal"  label="Design Proposal" />
        <q-tab name="orderconfirmation"  label="Order Confirmation" />
        <q-tab name="servicereport"  label="Service Report" />
      </q-tabs>
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="black"
        class="bg-white text-grey-9 shadow-0"
        align="justify-left"
      >
        <q-tab name="contractor" icon="fas fa-user-plus"  label="Add User" />
      </q-tabs>
=======
        <q-tabs
          v-model="tab"
          inline-label
          switch-indicator
          active-color="black"
          indicator-color="primary"
          class="bg-grey-4 text-black shadow-2 "
          align="justify"
          active-bg-color="white"
        >
          <q-tab name="usermanagement" label="User Management" />
          <q-tab name="onlineleads" label="Online Leads" />
          <q-tab name="qualifiedleads" label="Qualified Leads" />
          <q-tab name="designproposal" label="Design Proposal" />
          <q-tab name="orderconfirmation" label="Order Confirmation" />
          <q-tab name="servicereport" label="Service Report" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="text-black"
        >
          <q-tab-panel name="usermanagement" class="q-gutter-lg">
            <div class="row">
              <q-item
                v-ripple
                clickable
                :active="link === 'adduser'"
                active-class="my-menu-link"
                @click="link = 'adduser'"
              >
                <q-btn
                  icon="fas fa-user-plus"
                  label="Add User"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'edit'"
                active-class="my-menu-link"
                @click="link = 'edit'"
              >
                <q-btn
                  icon="fas fa-edit"
                  label="Edit"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'delete'"
                active-class="my-menu-link"
                @click="link = 'delete'"
              >
                <q-btn
                  icon="fas fa-trash-alt"
                  label="Delete"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'filter'"
                active-class="my-menu-link"
                @click="link = 'filter'"
              >
                <q-btn
                  icon="fas fa-filter"
                  label="Filter by"
                  stack
                  flat
                />
              </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="onlineleads" class="q-gutter-lg">
            <div class="row">
              <q-item
                v-ripple
                clickable
                :active="link === 'assign'"
                active-class="my-menu-link"
                @click="link = 'assign'"
              >
                <q-btn
                  icon="fas fa-user-tag"
                  label="Assign to"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'disqualify'"
                active-class="my-menu-link"
                @click="link = 'disqualify'"
              >
                <q-btn
                  icon="fas fa-user-minus"
                  label="Disqualify"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'delete'"
                active-class="my-menu-link"
                @click="link = 'delete'"
              >
                <q-btn
                  icon="fas fa-trash-alt"
                  label="Delete"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'filter'"
                active-class="my-menu-link"
                @click="link = 'filter'"
              >
                <q-btn
                  icon="fas fa-filter"
                  label="Filter by"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'addview'"
                active-class="my-menu-link"
                @click="link = 'addview'"
              >
                <q-btn
                  icon="fas fa-binoculars"
                  label="Add View"
                  stack
                  flat
                />
              </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="qualifiedleads" class="q-gutter-lg">
            <div class="row">
              <q-item
                v-ripple
                clickable
                :active="link === 'todesign'"
                active-class="my-menu-link"
                @click="link = 'todesign'"
              >
                <q-btn
                  icon="fas fa-user-plus"
                  label="To Design Proposal"
                  stack
                  flat
                  style="max-width:100px"
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'disqualify'"
                active-class="my-menu-link"
                @click="link = 'disqualify'"
              >
                <q-btn
                  icon="fas fa-edit"
                  label="Disqualify"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'delete'"
                active-class="my-menu-link"
                @click="link = 'delete'"
              >
                <q-btn
                  icon="fas fa-trash-alt"
                  label="Delete"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'filter'"
                active-class="my-menu-link"
                @click="link = 'filter'"
              >
                <q-btn
                  icon="fas fa-filter"
                  label="Filter by"
                  stack
                  flat
                />
              </q-item>
              <q-item
                v-ripple
                clickable
                :active="link === 'addview'"
                active-class="my-menu-link"
                @click="link = 'addview'"
              >
                <q-btn
                  icon="fas fa-binoculars"
                  label="Add View"
                  stack
                  flat
                />
              </q-item>
            </div>
          </q-tab-panel>
        </q-tab-panels>
>>>>>>> Stashed changes
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
  },
}
<<<<<<< Updated upstream
</script>
=======
</script>

<style scoped>
.my-menu-link{
  color: blue;
  /* background: #F2C037 */
}
</style>
>>>>>>> Stashed changes
