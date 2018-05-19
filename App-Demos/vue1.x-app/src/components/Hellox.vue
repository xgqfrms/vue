<template>
  <div class="Hellox" id="appx">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
new Vue( {
  el:'#appx';
  data () {
    return {
      msg: 'Hellox xgqfrms!'
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: #42ff83;
}
</style>