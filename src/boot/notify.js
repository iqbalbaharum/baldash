import { Notify, QSpinnerGears } from 'quasar'

const notificationTypes = {
  loading: (message) => Notify.create({
    spinner: QSpinnerGears,
    group: false,
    timeout: 0,
    message,
  }),

  success: (message) => Notify.create({
    type: 'positive',
    group: true,
    position: 'top',
    message,
  }),

  error: (message) => Notify.create({
    type: 'negative',
    group: false,
    position: 'top',
    message
  })

}

export default async({ Vue }) => {
  Vue.prototype.$notify = (type, message) => {
  /**
   * Usage in a Vue component:
   * this.$notify('loading', 'Loading, please wait...')
   * this.$notify('success', 'Successfully logged in!')
   */
    return notificationTypes[type](message)
  }
}
