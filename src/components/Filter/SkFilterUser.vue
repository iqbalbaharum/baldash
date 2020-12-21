<template>
  <q-menu v-model="isMenuOpen">
    <q-card style="width:500px">
      <q-card-section>
        <div class="fit row wrap justify-start items-start content-start">
          <q-input
            v-model="form.name"
            placeholder="Search Name"
            class="full-width"
            outlined
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-weight-bold text-uppercase text-grey-5">
          Branch
        </div>
        <div class="fit row wrap justify-start items-start content-start">
          <q-option-group
            v-model="filter.branch.where.or"
            :options="branches"
            class="col-5"
            type="checkbox"
            :inline="true"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-weight-bold text-uppercase text-grey-5">
          Role
        </div>
        <div class="fit row wrap justify-start items-start content-start">
          <q-checkbox
            v-for="(role, index) in roles"
            :key="role.uuid"
            v-model="form.roleId[index]"
            class="col-5"
            :label="role.name"
            :true-value="role.uuid"
            :false-value="null"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          flat
          label="Clear All Filter"
          color="negative"
          @click="onClickClearFilter"
        />

        <q-space />

        <q-btn
          label="Filter in New Tab"
          color="primary"
          @click="onClickFilter"
        />
      </q-card-actions>
    </q-card>
  </q-menu>
</template>

<script>
import Branch from '../../models/Branch'
import Role from '../../models/Role'

export default {
  data() {
    return {
      form: {
        branchId: [],
        roleId: [],
        name: ''
      },
      isMenuOpen: false,
      filter: {
        branch: {
          include: 'user',
          where: {
            or: [
            ]
          },
        },
        role: {
          include: 'role',
          where: {
            or: []
          }
        }
      }
    }
  },

  computed: {
    branches() {
      const branches = Branch.all()
      const opts = branches.map((branch) => {
        const container = []
        container.label = branch.name.charAt(0).toUpperCase() + branch.name.slice(1)
        container.value = { 'branchId': branch.uuid }
        return container
      })
      return opts
    },
    roles() {
      return Role.all()
    }
  },

  methods: {
    onClickClearFilter() {
      this.form.name = ''

      this.filter = {
        branch: {
          include: 'user',
          where: {
            or: [
            ]
          },
        },
        role: {
          include: 'role',
          where: {
            or: []
          }
        }
      }
    },
    onClickFilter() {
      this.isMenuOpen = false

      if (this.form.name.length > 0) {
        this.filter.branch.where.or.push({
          name: this.form.name
        })
      }
      this.$store.dispatch('FilterTable', Object.assign({}, this.filter.branch))
      this.onClickClearFilter()
    },

  }
}
</script>
