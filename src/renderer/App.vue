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
            this.$electron.ipcRenderer.on('update-client-user', (event, data) => {
                this.$store.commit('SET_USER', data.user);
                this.$store.commit('STORE_ACCESS_TOKEN', data.accessToken);
                this.$store.commit('STORE_REFRESH_TOKEN', data.refreshToken);
            });
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
