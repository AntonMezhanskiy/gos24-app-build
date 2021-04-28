<template>
    <div class="home-template" :class="{checked}">
        <slot :propData="$data" :change="change" :isAuth="isAuth" :toggle="toggle"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                dictionary: {
                    auth: 'auth',
                    changeUser: 'change-user',
                    link: 'link',
                    collapseApp: 'collapse-app'
                },
                checked: false,
                countNotify: 0
            }
        },
        created () {
            this.$bus.$on('changeUser', async () => {
                await this.socketConn('leave');
                await this.$store.commit('LOGOUT_USER');
                await this.$electron.ipcRenderer.send('page-auth');
            })
        },
        beforeDestroy () {
            if (this.isAuth) {
                this.socketConn('leave');
            }
            this.$bus.$off('changeUser')
        },
        methods: {
            toggle (type) {
                const status = this.checked = !this.checked;
                this.checked = status;

                if (!status && type !== this.dictionary.auth) {
                    this.$electron.ipcRenderer.send('close-child-window');
                }
            },
            change (type, data) {
                switch (type) {
                case this.dictionary.collapseApp:
                    this.$electron.remote.getCurrentWindow().close();
                    break;
                case this.dictionary.link:
                    this.$electron.shell.openExternal(data);
                    break;
                case this.dictionary.changeUser:
                    this.socketConn('leave');
                    this.$store.commit('LOGOUT_USER');
                    break;
                case this.dictionary.auth:
                    this.$electron.ipcRenderer.send('page-auth');
                    break;
                }
                this.toggle(type)
            },
            socketConn (status) {
                if (status === 'join') {
                    this.$socket.client.emit('join', this.roomName);
                    this.updateNotifi();
                    return
                }
                this.$socket.client.emit('leave', this.roomName);
                this.countNotify = 0
            },
            async updateNotifi () {
                try {
                    const {data} = await this.$axios.get('notification/ping/');
                    this.countNotify = data.count;
                } catch (error) {
                    console.log('при проверке Уведомления  ошибка ', error)
                }
            }
        },
        computed: {
            isAuth () {
                const auth = this.$store.getters['isAuth'];
                if (auth) {
                    this.socketConn('join');
                }
                return auth
            },
            roomName () {
                return this.$store.getters['isAuth'] ? 'room_notify_' + this.$store.state.user.userId : '';
            }
        },
        sockets: {
            NOTIFY_PING ({count}) {
                if (+count > 0) {
                    this.$electron.ipcRenderer.send('notify-on');
                }
                this.countNotify = +count;
            },
            connect () {
                console.info('socket connected');
            },
            disconnect () {
                console.info('socket disconnected');
            },
            reconnect () {
                if (this.isAuth) {
                    this.socketConn('join');
                }
            }
        }
    }
</script>

<style scoped>

</style>
