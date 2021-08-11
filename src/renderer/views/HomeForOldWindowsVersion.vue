<template>
    <div class="HomeForOldWindowsVersion" :class="{checked}">
        <button type="button" class="menu-item"
                v-for="(button, idx) in items" :key="'menu-item-'+idx"
                :data-value="button.name"
                v-if="button.auth"
                @click="change(button.type, button.url)"
                :data-notify-count="button.isNotify && countNotify != null ? countNotify : false">
            <IconSvg :name="button.iconName"/>
        </button>
    </div>
</template>

<script>
    import IconSvg from '../components/ui/IconSvg';
    const dictionary = {
        auth: 'auth',
        changeUser: 'change-user',
        link: 'link',
        base1c: 'base1c',
        collapseApp: 'collapse-app'
    }
    export default {
        name: 'HomeForOldWindowsVersion',
        components: {
            IconSvg
        },
        data () {
            return {
                dictionary: dictionary,
                checked: false,
                items: [
                    {
                        name: 'Свернуть программу',
                        iconName: 'minimize-the-program',
                        type: dictionary.collapseApp,
                        url: '',
                        auth: true
                    },
                    {
                        name: 'Авторизоваться',
                        iconName: 'auth',
                        type: dictionary.auth,
                        url: '',
                        auth: true
                    },
                    {
                        name: 'Центр уведомлений',
                        iconName: 'notify',
                        type: dictionary.link,
                        url: 'https://gos24.kz/notification',
                        isNotify: true,
                        auth: true
                    },
                    {
                        name: 'Задать вопрос',
                        iconName: 'ask_a_question',
                        type: dictionary.link,
                        url: 'https://gos24.kz/qa/new',
                        auth: true
                    },
                    {
                        name: 'Обратиться к куратору',
                        iconName: 'contact_the_curator',
                        type: dictionary.link,
                        url: 'https://gos24.kz/support/new',
                        auth: true
                    },
                    {
                        name: 'Открыть Базу 1С',
                        iconName: 'contact_the_curator',
                        type: dictionary.base1c,
                        url: 'https://gos24.kz/base-1c/',
                        auth: true
                    },
                    {
                        name: 'Открыть портал',
                        iconName: 'home',
                        type: dictionary.link,
                        url: 'https://gos24.kz',
                        auth: true
                    }
                ],
                base1c: [],
                countNotify: 0
            }
        },
        created () {
            this.$bus.$on('changeUser', async () => {
                await this.socketConn('leave');
                await this.$store.commit('LOGOUT_USER');
                await this.$electron.ipcRenderer.send('page-auth');
            })
            this.$bus.$on('update-user', async () => {
                this.toggleButtonAuth(false)
                await this.updateNotifi();
                await this.socketConn('join');
                await this.getBase1c()
            });

            const data = {
                user: JSON.parse(localStorage.getItem('user')) || null,
                accessToken: localStorage.getItem('accessToken') || null,
                refreshToken: localStorage.getItem('refreshToken') || null
            }
            if (!this.auth && (data.user && data.accessToken && data.refreshToken)) {
                this.$electron.ipcRenderer.send('update-client', 'update-user', data);
            }
        },
        beforeDestroy () {
            if (this.isAuth) {
                this.socketConn('leave');
            }
            this.$bus.$off('changeUser')
        },
        methods: {
            async getBase1c () {
                try {
                    const response = await this.$axios.get('base/base_1c/')
                    this.base1c = response.data
                    this.base1c = [1, 2]
                    const found = this.items.find(i => i.type === this.dictionary.base1c)
                    if (found) found.name = this.base1c.length > 0 ? 'Мои базы 1с' : found.name
                } catch (e) {
                    console.log(e)
                }
            },
            toggleButtonAuth (type) {
                const button = this.items.find(b => b.type === this.dictionary.auth)
                button.auth = type
            },
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
                case this.dictionary.base1c:
                    if (this.base1c.length > 0) {
                        this.$electron.ipcRenderer.send('page-base1c');
                    } else {
                        this.$electron.shell.openExternal(data);
                    }
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
                    this.updateNotifi();
                    this.getBase1c();
                    this.socketConn('join');
                }
                this.toggleButtonAuth(!auth)
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

<style scoped lang="scss">
    $blue: #094380;
    .HomeForOldWindowsVersion {
        display: flex;
        flex-direction: column-reverse;
        button {
            background-color: transparent;
            border: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            outline: none;
            padding: 1rem 0;
            cursor: pointer;
            position: relative;
            &:after {
                content: attr(data-value);
                font-weight: 500;
                font-size: 100%;
            }
            &[data-notify-count]:not([data-notify-count="0"]):before {
                content: attr(data-notify-count);
                position: absolute;
                top: 10px;
                right: calc(50% - 20px);
                transform: translateX(50%);
                white-space: nowrap;
                background-color: #fff;
                color: $blue;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                font-size: 80%;
                line-height: initial;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.55);
            }
            &:hover {
                background-color: #e8e8e8;
            }
        }
    }
</style>
<style lang="scss">
$blue: #094380;
    .HomeForOldWindowsVersion .menu-item {
        svg {
            width: 30px;
            height: 30px;
            fill: $blue;
            margin-bottom: 13px;
        }
    }
</style>
