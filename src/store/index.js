import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import getters from './getters'
import database from '../database'

import user from './modules/user'
import app from './modules/app'
import modal from './modules/modal'
import session from './modules/session'
import zone from './modules/zone'
import role from './modules/role'
import branch from './modules/branch'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      app,
      modal,
      session,
      zone,
      role,
      branch
    },
    getters,
    plugins: [VuexORM.install(database)],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
