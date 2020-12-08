import * as VueApexCharts from 'vue-apexcharts'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async({ Vue }) => {
  Vue.component('apexchart', VueApexCharts)

  Sentry.init({
    Vue,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  })
}

