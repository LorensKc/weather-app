<template>
    <div class="error-msg" v-if="error">
        {{message}}
    </div>
</template>

<script>
export default {
  name: 'error-message',
  props: ['error'],
  computed: {
    message () {
      return this.error.response.data.message
    }
  }
}
</script>

<style lang="less">
.error-msg {
  color: #d8000c;
  background-color: #ffd2d2;
  padding: 5px;
  border-radius: 4px;
}
</style>
