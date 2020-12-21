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
          Status
        </div>
        <div class="fit row wrap justify-start items-start content-start">
          <q-option-group
            v-model="filter.where.or"
            :options="opts"
            class="col-5"
            type="checkbox"
            :inline="true"
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
export default {
  data() {
    return {
      isMenuOpen: false,
      form: {
        name: ''
      },
      filter: {
        include: 'leads',
        where: {
          or: []
        }
      },
      opts: [
        {
          label: 'Disqualified',
          value: { 'state': 'QL', 'status': 'disqualified', 'branchId': this.$store.state.user.branchId }
        },
        {
          label: 'Not Active',
          value: { 'state': 'QL', 'status': 'notactive' }
        },
        {
          label: 'Active',
          value: { 'state': 'QL', 'status': 'active' }
        },
      ]
    }
  },

  methods: {
    onClickClearFilter() {
      this.filter = {
        include: 'leads',
        where: {
          or: []
        }
      }
    },
    onClickFilter() {
      this.isMenuOpen = false

      if (this.form.name.length > 0) {
        this.filter.where.or.push({
          name: this.form.name
        })
      }
      this.$store.dispatch('FilterTable', Object.assign({}, this.filter))
      this.onClickClearFilter()
    },

  }
}
</script>
