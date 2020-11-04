<template>
  <div>
    <q-layout
      view="lHh lpr lFf"
      style="height: 400px"
      class=" rounded-borders"
    >
      <q-header bordered class="bg-white">
        <q-toolbar class="bg-black">
          <img src="~assets/sklogo.png" width="100">
        </q-toolbar>
        <q-tabs
          v-model="tab"
          inline-label
          switch-indicator
          active-color="black"
          indicator-color="white"
          class="bg-grey-3 text-black shadow-0"
          align="left"
          active-bg-color="white"
        >
          <q-tab
            v-for="(header) in buttonHeaders"
            :key="header.name"
            :name="header.name"
            :label="header.label"
          />
        </q-tabs>
        <q-tab-panels
          v-for="(access) in accesses"
          :key="access.name"
          v-model="tab"
          class="text-black"
        >
          <q-tab-panel :name="access.name" class="q-pa-none">
            <panel-button-group
              v-model="link"
              :current-link="link"
              :buttons="access.buttons"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-header>

      <q-page-container class="bg-grey-3">
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import PanelButtonGroup from '../components/PanelButtonGroup'

export default {

  components: {
    PanelButtonGroup
  },
  data() {
    return {
      tab: 'usermanagement',
      link: 'inbox',
      buttonHeaders: [
        {
          name: 'usermanagement',
          label: 'SK Management'
        },
        {
          name: 'branch',
          label: 'Branch'
        },
        {
          name: 'onlineleads',
          label: 'Online Leads'
        },
        {
          name: 'qualifiedleads',
          label: 'Qualified Leads'
        },
        {
          name: 'designproposal',
          label: 'Design Proposal'
        },
        {
          name: 'orderconfirmation',
          label: 'Order Confirmation'
        },
        {
          name: 'servicereport',
          label: 'Service Report'
        },
      ],
      accesses: [
        {
          name: 'usermanagement',
          buttons: [
            {
              category: 'User',
              tos: [
                {
                  name: 'adduser',
                  icon: 'fas fa-user-plus',
                  label: 'Add User',
                  disabled: false
                },
                {
                  name: 'deleteuser',
                  icon: 'fas fa-trash-alt',
                  label: 'Delete',
                  disabled: false
                },
              ]
            },
            {
              category: 'Access',
              tos: [
                {
                  name: 'assignrole',
                  icon: 'fas fa-user-tag',
                  label: 'Scope',
                  disabled: false
                }
              ]
            },
            {
              category: 'Assign',
              tos: [
                {
                  name: 'assignrole',
                  icon: 'fas fa-plus',
                  label: 'Assign Role',
                  disabled: false
                },
                {
                  name: 'assignbranch',
                  icon: 'fas fa-plus',
                  label: 'Assign Branch',
                  disabled: false
                }
              ]
            },
            {
              category: 'Filter',
              tos: [
                {
                  name: 'filterbyrole',
                  icon: 'fas fa-filter',
                  label: 'By Role',
                  disabled: false
                },
                {
                  name: 'filterbybranch',
                  icon: 'fas fa-filter',
                  label: 'By Branch',
                  disabled: false
                },
                {
                  name: 'customfilter',
                  icon: 'fas fa-filter',
                  label: 'Filter',
                  disabled: false
                }
              ]
            }
          ]
        },
        {
          name: 'branch',
          buttons: [
            {
              category: 'Management',
              tos: [
                {
                  name: 'addbranch',
                  icon: 'fas fa-user-plus',
                  label: 'Add Branch',
                  disabled: false
                },
                {
                  name: 'edituser',
                  icon: 'fas fa-edit',
                  label: 'Edit',
                  disabled: false
                },
                {
                  name: 'deleteuser',
                  icon: 'fas fa-trash-alt',
                  label: 'Delete',
                  disabled: false
                },
              ]
            },
            {
              category: 'User',
              tos: [
                {
                  name: 'adduser',
                  icon: 'fas fa-user-plus',
                  label: 'Add User',
                  disabled: false
                },
              ]
            }
          ]
        },
        {
          name: 'onlineleads',
          buttons: [
            {
              category: 'Data',
              tos: [
                {
                  name: 'assign',
                  icon: 'fas fa-upload',
                  label: 'Import',
                  disabled: false
                }
              ]
            },
            {
              category: 'Leads',
              tos: [
                {
                  name: 'assign',
                  icon: 'fas fa-user-tag',
                  label: 'Assign To',
                  disabled: false
                },
                {
                  name: 'disqualify',
                  icon: 'fas fa-user-minus',
                  label: 'Disqualify',
                  disabled: false
                },
                {
                  name: 'filtercustomer',
                  icon: 'fas fa-filter',
                  label: 'Filter',
                  disabled: false
                },
              ]
            }
          ]
        }
      ]
      ,
    }
  }
}
</script>
