<template>
    <div id="app">
        <p class="version">{{version}}</p>
        <ButtonCreate/>
        <router-view></router-view>
    </div>
</template>

<script>
  import ButtonCreate from './components/common/ButtonCreate.vue'

  export default {
    name: 'gos24-electron',
    components: {
      ButtonCreate
    },
    data () {
      return {
        version: this.$electron.remote.app.getVersion()
      }
    }
  }
</script>

<style>
    #app {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem 0;
    }
    .version {
        margin: 0 0 1rem 0;
        background-color: #008261;
        color: #fff;
    }
</style>
