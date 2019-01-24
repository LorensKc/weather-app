import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import weather from './modules/weather'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  modules: ['weather']
})
export default new Vuex.Store({
  modules: {
    weather
  },
  plugins: [vuexLocal.plugin]
})
