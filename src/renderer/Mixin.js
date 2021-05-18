export const subscriptionToElectron = {
    created () {
        this.$electron.ipcRenderer.on('logout', async () => {
            await this.$store.commit('LOGOUT_USER');
            await this.$bus.$emit('changeUser')
        });

        this.$electron.ipcRenderer.on('update-client:update-user', (event, data) => {
            this.$store.commit('SET_USER', data.user);
            this.$store.commit('STORE_ACCESS_TOKEN', data.accessToken);
            this.$store.commit('STORE_REFRESH_TOKEN', data.refreshToken);
        });
    }
}
