<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'gos24-electron',
        created () {
            document.title = 'Госсектор24';
        },
        mounted () {
            this.$electron.ipcRenderer.on('logout', async () => {
                await this.$store.commit('LOGOUT_USER');
                await this.$bus.$emit('changeUser');
            });

            this.$electron.ipcRenderer.on('update-client:update-user', (event, data) => {
                this.$store.commit('SET_USER', data.user);
                this.$store.commit('STORE_ACCESS_TOKEN', data.accessToken);
                this.$store.commit('STORE_REFRESH_TOKEN', data.refreshToken);
                this.$bus.$emit('update-user');
            });

            this.$electron.ipcRenderer.send('show-logout-btn', this.auth);
        },
        computed: {
            auth () {
                return this.$store.getters['isAuth']
            }
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
        max-width: 500px;
        margin: 0 auto;
    }
</style>
