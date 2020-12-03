import Vue from 'vue'
import Vuex from 'vuex'

import database from './../database'

Vue.prototype.$database = database
Vuex.Store.prototype.$database = database
