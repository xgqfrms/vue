<template>
  <div class="new">
    <h1>{{ msg }}</h1>
    <button v-on:click="onClickVue">click me</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello new xgqfrms!'
      }
    },
    methods: {
      onClickVue: function () {
        console.log("onClickVue has been executed!")
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: #42b983;
  }
</style>
