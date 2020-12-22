<template>
  <q-menu v-model="isMenuOpen">
    <q-card style="width:500px">
      <q-card style="width:500px">
        <q-card-section>
          <div class="fit row wrap justify-start items-start content-start">
            <q-input
              v-model="form.name"
              placeholder="Search Name"
              class="full-width"
              outlined
            />
            <q-input
            v-model="form.email"
            placeholder="Search Email"
            class="full-width"
            outlined
          />
          <q-input
            v-model="form.phone"
            placeholder="Search Telephone No."
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
    </q-card>
  </q-menu>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      form: {
        name: '',
        email: '',
        phone: ''
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
          value: { 'state': 'OL', 'status': 'disqualified' }
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
      if (this.form.email.length > 0) {
        this.filter.where.or.push({
          email: this.form.email
        })
      }
      if (this.form.phone.length > 0) {
        this.filter.where.or.push({
          phone: this.form.phone
        })
      }
      this.$store.dispatch('FilterTable', Object.assign({}, this.filter))
      this.onClickClearFilter()
    },

  }
}
</script>
