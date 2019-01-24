/* eslint-disable no-undef */
<template>
    <div class="search-container">
        <Error :error="errorObj"/>
        <div class="message" :class="{show: infoMessage}">{{infoMessage}}</div>
        <input ref="autocomplete"
        placeholder="Search"
        class="search-location"
        @focus="clearInput"
        @keyup.enter="showInfoMessage"
        type="text" />
        <ul class="fav-list">
            <li v-for="location in favorites" :key="location.id">
                <a :href="'#'+location.city.name">{{location.city.name}}</a>
                <img src="../assets/delete.png" @click="removeFav(location.city.name)">
            </li>
        </ul>
    </div>
</template>

<script>
import Error from './Error'
import { mapState } from 'vuex'

export default {
  name: 'search-city',
  data () {
    return {
      infoMessage: ''
    }
  },
  components: {
    Error
  },
  computed: mapState('weather', {
    errorObj: 'error',
    favorites: 'favorites'
  }),
  methods: {
    removeFav (city) {
      this.$store.dispatch('weather/removeLocation', city)
    },
    clearInput () {
      const field = this.$refs.autocomplete
      field.value = ''
      field.placeholder = ''
      this.$store.dispatch('weather/clearError')
    },
    showInfoMessage () {
      this.infoMessage = 'Please, choose one from list!'
    }
  },
  mounted () {
    // eslint-disable-next-line
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ['geocode'] }
    )
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      const coord = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      }
      this.infoMessage = ''
      this.$store.dispatch('weather/getLocationWeather', { coord })
    })
  }
}
</script>

<style lang="less">
.search-container {
  margin: 0 auto;
  width: 60vw;
  .message {
    color: #d8000c;
    opacity: 0;
    height: 25px;
    position: relative;
    &.show {
      opacity: 1;
    }
  }
  .search-location {
    border: 0;
    border-bottom: 2px solid #fff;
    width: 90%;
    outline: 0;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    background: transparent;
    color: #fff;
    transition: all ease .5s;
  }
  .fav-list {
    display: flex;
    margin: 10px 0 0;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    li {
      margin-right: 5px;
      padding: 5px;
      display: flex;
      align-items: center;
      border: 1px solid #f8f9fa;
      a {
        text-decoration: none;
        color: #fff;
        font-weight: 700;
      }
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
