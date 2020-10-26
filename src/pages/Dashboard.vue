<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
    <q-card class="my-card">
      <q-card-section>
        {{ lorem }}
        <div class="small">
            <line-chart :chart-data="datacollection"></line-chart>
            <button @click="fillData()">Randomize</button>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        {{ lorem }}
        <div class="small">
            <line-chart :chart-data="datacollection"></line-chart>
            <button @click="fillData()">Randomize</button>
        </div>
      </q-card-section>
    </q-card>

        <div class="row justify-evenly q-gutter-md q-pa-md">
            <q-card flat bordered class="col text-center q-gutter-md q-pa-md" style="border-color: purple">
                <q-avatar icon="money">
                    
                </q-avatar>
                <q-separator light inset />
                <div class="text-h5 text-weight-bold text-purple-8">36%</div>
            </q-card>

            <q-card flat bordered class="col text-center q-gutter-md q-pa-md" style="border-color: purple">
                <q-avatar icon="money">
                    
                </q-avatar>
                <q-separator light inset />
                <div class="text-h5 text-weight-bold text-purple-8">36%</div>
            </q-card>

                <q-card flat bordered class="col text-center q-gutter-md q-pa-md" style="border-color: purple">
                <q-avatar icon="money">
                    
                </q-avatar>
                <q-separator light inset />
                <div class="text-h5 text-weight-bold text-purple-8">36%</div>
            </q-card>
            <q-card flat bordered class="col text-center q-gutter-md q-pa-md" style="border-color: purple">
                <q-avatar icon="money">
                    
                </q-avatar>
                <q-separator light inset />
                <div class="text-h5 text-weight-bold text-purple-8">36%</div>
            </q-card>
        </div>
    </div>

  </div>
</template>

<script>
import LineChart from '../boot/LineChart.js'

export default {
  data() {
    return {
      datacollection: null,
      data: {
        tabs: 'list'
      },
    }
  },
  mounted () {
  this.fillData()
    },

  components: {
    LineChart
    // Rolebox,
    // Userbox,
    // UserSessionbox,
  },

    methods: {
    fillData () {
    this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
        }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
        }
        ]
    }
    },
    getRandomInt () {
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

