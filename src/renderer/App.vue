<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'gos24-electron',
        components: {

        },
        created () {
            this.$electron.ipcRenderer.on('logout', async () => {
                await this.$store.commit('LOGOUT_USER');
                await this.$router.replace('/login')
            });
        },
        mounted () {
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
