<template>
  <div class="weather-container" :id="city.name">
    <div class="city-info">
      <span>{{city.name}}, </span>
      <span>{{city.country}}</span>
    </div>
    <div class="date-row">
      <ul>
        <li v-for="dayWeather in forecast"
        :key="dayWeather.id"
        @click="chooseDay(dayWeather)"
        :class="{'active': ifChoosen(dayWeather)}">
          <span>{{getDate(dayWeather)}}</span>
        </li>
      </ul>
    </div>
      <div class="other-days-state" v-for="dayWeather in forecast"
      :key="dayWeather.id"
      v-show="ifChoosen(dayWeather)">
        <ul class="state">
          <li v-for="weather in dayWeather" :key="weather.id">
            <div class="status">
              <span>{{weather.weather[0].main}}</span>
              <i class="wu wu-black wu-32" :class="'wu-' + iconClass(weather.weather[0].main)"></i>
            </div>
            <div class="summary">
              <div>
                {{toCelsium(weather.main.temp_max)}}
                <span>℃</span>
              </div>
              <div>
                {{weather.wind.speed}}
                <span>m/s</span>
              </div>
              <div class="time">
                {{getTime(weather.dt_txt)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Location',
  data () {
    return {
      choosenDay: ''
    }
  },
  props: ['weather', 'city'],
  computed: {
    forecast () {
      return Object.values(this.weather)
    }
  },
  methods: {
    ifChoosen (day) {
      return this.choosenDay === this.getDate(day)
    },
    chooseDay (day) {
      const date = this.getDate(day)
      this.choosenDay = date
    },
    getDate (array) {
      const elements = Object.values(array)
      if (!elements) {
        return ''
      }
      const firstEl = elements[0]
      return moment(firstEl.dt_txt).format('dddd')
    },
    getTime (time) {
      return moment(time).format('h:mm a')
    },
    toCelsium (temp) {
      return (temp - 273.15).toFixed(2)
    },
    iconClass (status) {
      switch (status) {
        case 'Clear':
          return 'clear'
        case 'Clouds':
          return 'cloudy'
        case 'Rain':
          return 'rain'
        case 'Thunderstorm':
          return 'tstorms'
        case 'Drizzle':
          return 'sleet'
        case 'Snow':
          return 'snow'
        case 'Atmosphere':
          return 'fog'
        default:
          return 'unknown'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.forecast.length) {
        this.choosenDay = this.getDate(this.forecast[0])
      }
    })
  }
}
</script>

<style lang="less">
.weather-container {
  width: calc(100% - 90px);
  max-width: 750px;
  background: transparent;
  border: 2px solid #fff;
  margin: 20px auto;
  padding: 10px 0 10px;
  .city-info {
    display: flex;
    justify-content: center;
    padding: 10px;
    font-weight: 500;
    color: #fff;
  }
  .state {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .time {
      border-top: 2px solid #f8f9fa;
      padding: 5px 0 0 0;
      margin-top: 5px;
      font-size: 14px;
    }
    .summary {
      text-align: left;
      padding-right: 5px;
    }
    &.current {
      margin: 10px 0 10px 0;
    }
    li {
      margin: 0 0 15px;
      min-width: 100px;
      padding: 5px;
      background-color: rgb(109, 64, 220);
      border: 1px solid #f8f9fa;
      color: #f8f9fa;
      &:nth-child(even) {
        background-color: #f8f9fa;
        color: #2c3e50;
        .time {
          border-top: 2px solid #2c3e50;
        }
      }
    }
  }
  .date-row {
    ul {
      display: flex;
      width: 100%;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      border-top: 2px solid #f8f9fa;
      border-bottom: 2px solid #f8f9fa;
      li {
        // margin: 10px 0;
        width: 100%;
        cursor: pointer;
        color: #fff;
        padding: 10px 15px;
        border-right: 1px solid #f8f9fa;
        background: transparent;
        transition: all ease .5s;
        &.active {
          background: #f8f9fa;
          color: #000;
          font-weight: 500;
          pointer-events: none;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.8);
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .other-days-state {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    .date {
      align-self: flex-end;
    }
    .state {
      padding: 15px 0 0;
    }
  }
}
</style>
