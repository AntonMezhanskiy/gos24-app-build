<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {subscriptionToElectron} from './Mixin'
    export default {
        name: 'gos24-electron',
        mixins: [subscriptionToElectron],
        created () {
            document.title = 'Госсектор24';
        },
        mounted () {
            this.$electron.ipcRenderer.send('show-logout-btn', this.$store.getters['isAuth']);
        },
        beforeDestroy () {
            console.log('beforeDestroy');
            this.$electron.ipcRenderer.send('close-app');
        }
    }
</script>

<style>
    #app {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
</style>
