<template>
    <header id="header">
        <div>WeatherApp</div>
        <button @click="getLocation">Detect my Location</button>
    </header>
</template>

<script>
export default {
  name: 'header-bar',
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocationWeather)
      } else {
        console.info('Geolocation is not supported by this browser.')
      }
    },
    getLocationWeather (position) {
      const coord = {
        lon: position.coords.longitude,
        lat: position.coords.latitude
      }
      this.$store.dispatch('weather/getCurrentWeather', { coord })
    }
  }
}
</script>

<style lang="less">
header {
  width: 100vw;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;

  div {
    color: #fff;
    font-weight: 700;
  }

  button {
    padding: 15px;
    text-decoration: none;
    color: #fff;
    border: 1px solid #f8f9fa;
    background: transparent;
    transition: 0.5s;
    outline: none;
    cursor: pointer;
    &:hover {
      background: #f8f9fa;
      color: #000;
      border: 1px solid #f8f9fa;
    }
  }

}
</style>
