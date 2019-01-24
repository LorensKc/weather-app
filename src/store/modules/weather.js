import config from '../../../apiconfig.js'
import axios from 'axios'

const defaultState = () => {
  return {
    timestamp: {},
    city: '',
    favorites: [],
    error: {}
  }
}
export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    SET_CURRENT_WEATHER (state, weather) {
      const weatherForecast = weather.list
      const days = {}
      weatherForecast.forEach(forecast => {
        const day = new Date(forecast.dt * 1000).getDate()
        if (!days[day]) {
          days[day] = {}
        }

        const hour = new Date(forecast.dt * 1000).getHours()
        days[day][hour] = forecast
      })
      state.timestamp = days
      state.city = weather.city
    },
    ADD_FAVORITE_CITY (state, weather) {
      const weatherForecast = weather.list
      const days = {}
      weatherForecast.forEach(forecast => {
        const day = new Date(forecast.dt * 1000).getDate()
        if (!days[day]) {
          days[day] = {}
        }
        const hour = new Date(forecast.dt * 1000).getHours()
        days[day][hour] = forecast
      })
      const favoriteData = {
        timestamp: days,
        city: weather.city
      }
      state.favorites.push(favoriteData)
    },
    REMOVE_LOCATION (state, city) {
      const removedIndex = state.favorites.map(location => location.city).indexOf(city)
      state.favorites.splice(removedIndex, 1)
    },
    SET_ERROR (state, error) {
      state.error = error
    }
  },
  actions: {
    getCurrentWeather ({ commit }, { coord }) {
      axios.get(`${config.API_HOST}/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&APPID=${config.WEATHER_API_KEY}`)
        .then(response => {
          commit('SET_CURRENT_WEATHER', response.data)
        })
        .catch(e => {
          commit('SET_ERROR', e)
        })
    },
    getLocationWeather ({ commit }, { coord }) {
      axios.get(`${config.API_HOST}/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&APPID=${config.WEATHER_API_KEY}`)
        .then(response => {
          commit('ADD_FAVORITE_CITY', response.data)
        })
        .catch(e => {
          commit('SET_ERROR', e)
        })
    },
    removeLocation ({ commit }, city) {
      commit('REMOVE_LOCATION', city)
    },
    clearError ({ commit }) {
      commit('SET_ERROR', null)
    }
  }
}
