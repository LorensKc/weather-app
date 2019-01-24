<template>
  <div id="app">
    <header-bar />
    <CitySearch />
    <div class="container">
      <Location v-if="city" :weather="weather" :city="city"/>
      <div class="fav-locations" v-for="location in favorites" :key="location.id">
        <Location :weather="location.timestamp" :city="location.city"/>
      </div>
    </div>
    <div class="to-top">
      <a href="#header">TOP</a>
    </div>
  </div>
</template>

<script>
import Location from './components/Location'
import HeaderBar from './components/HeaderBar'
import CitySearch from './components/CitySearch'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Location,
    HeaderBar,
    CitySearch
  },
  computed: mapState('weather', {
    weather: 'timestamp',
    city: 'city',
    favorites: 'favorites'
  })
}
</script>

<style lang="less">
#app {
  text-align: center;
  overflow: hidden;
  width: 100%;
  .to-top {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 30px 10px;
    border-radius: 40px;
    a {
      text-decoration: none;
      color: #f8f9fa;
    }
  }
}
// .fav-locations {
//   margin: auto;
// }
</style>
