<template>
    <div id="app">
        <p class="version">{{version}}</p>
        <p class="download" v-if="message">{{message}}</p>
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
        version: this.$electron.remote.app.getVersion(),
        message: ''
      }
    },
    created () {
      this.$electron.ipcRenderer.on('message', (event, text) => {
        this.message = text;
      })
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
    .download {
        margin: 0 0 1rem 0;
        background-color: #d5d5d5;
        color: #333;
    }
</style>
