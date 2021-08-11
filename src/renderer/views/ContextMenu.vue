<template>
    <div class="menu" :class="{checked, ...windowPosition}">
        <button type="button" class="menu-item"
                v-for="(button, idx) in items" :key="'menu-item-'+idx"
                :data-value="button.name"
                v-if="button.auth"
                @click="change(button.type, button.url)"
                :class="{opacity: activeButton && activeButton !== button.type}"
                :data-notify-count="button.isNotify && countNotify != null ? countNotify : false">
            <IconSvg :name="button.iconName"/>
        </button>
        <div class="baza1c" v-show="activeButton">
          <button type="button" v-for="base in base1c" @click="linkOpenBasePage(base.base_url)">{{ base.name }}</button>
        </div>
    </div>
</template>

<script>
    import HomeSlot from '../components/common/Home';
    import IconSvg from '../components/ui/IconSvg';
    const dictionary = {
        auth: 'auth',
        changeUser: 'change-user',
        link: 'link',
        base1c: 'base1c',
        collapseApp: 'collapse-app'
    }
    export default {
        name: 'ContextMenu',
        components: {
            HomeSlot,
            IconSvg
        },
        data () {
            return {
                dictionary: dictionary,
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
                checked: false,
                countNotify: 0,
                base1c: [],
                activeButton: null,
                windowPosition: {
                    top: false,
                    left: false,
                    right: true,
                    bottom: true
                }
            }
        },
        created () {
            this.$electron.ipcRenderer.on('windowMoved', (event, data) => {
                this.windowPosition = data
            })

            this.$bus.$on('update-user', async () => {
                this.toggleButtonAuth(false)
                await this.updateNotifi();
                await this.socketConn('join');
                await this.getBase1c()
            });
            this.$bus.$on('changeUser', async () => {
                await this.socketConn('leave');
                await this.$store.commit('LOGOUT_USER');
                await this.$electron.ipcRenderer.send('page-auth');
                this.toggleButtonAuth(true)
            });
            this.$electron.ipcRenderer.on('modal-show', (event, data) => {
                this.checked = data
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
            this.$bus.$off('changeUser');
        },
        methods: {
            async getBase1c () {
                try {
                    const response = await this.$axios.get('base/base_1c/')
                    this.base1c = response.data
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
            linkOpenBasePage (url) {
                this.$electron.shell.openExternal(url);
                this.toggle(this.dictionary.base1c)
            },
            toggle (type) {
                const status = this.checked = !this.checked;
                this.checked = status;
                this.activeButton = null;

                if (!status && type !== this.dictionary.auth) {
                    this.$electron.ipcRenderer.send('close-child-window');
                }
                if (type !== this.dictionary.collapseApp) {
                    this.$electron.ipcRenderer.send('update-client', 'pageToggle');
                }
            },
            change (type, data) {
                switch (type) {
                case this.dictionary.collapseApp:
                    this.$electron.ipcRenderer.send('close-window');
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
                        this.activeButton = type
                    } else {
                        this.$electron.shell.openExternal(data);
                    }
                    break;
                }
                if (this.dictionary.base1c !== type && this.base1c.length === 0) {
                    this.toggle(type)
                }
            },
            socketConn (status) {
                if (status === 'join') {
                    this.$socket.client.emit('join', this.roomName);
                    return
                }
                this.$socket.client.emit('leave', this.roomName);
                this.countNotify = 0;
                this.$electron.ipcRenderer.send('update-client', 'NOTIFY_PING', 0);
            },
            async updateNotifi () {
                try {
                    const {data} = await this.$axios.get('notification/ping/');
                    this.countNotify = data.count;
                    this.$electron.ipcRenderer.send('update-client', 'NOTIFY_PING', data.count);
                } catch (error) {
                    console.log('при проверке Уведомления  ошибка ', error)
                }
            }
        },
        computed: {
            isAuth () {
                const auth = this.$store.getters['isAuth'];
                if (auth) {
                    this.getBase1c();
                    this.updateNotifi();
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
                this.$electron.ipcRenderer.send('update-client', 'NOTIFY_PING', +count);
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
$height: 60px;
$gray: #f2f2f2;
$blue: #094380;
$columns: 7;
$margin: 70;
    .menu {
        font-size: 20px;
        flex-direction: column;
        position: relative;
        min-height: 480px;
        overflow: hidden;
    }

    .menu-item {
        background: $blue;
        border-radius: 100%;
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0;
        right: 10px;
        color: white;
        text-align: center;
        line-height: 50px;
        transform: translate3d(0, 0, 0);
        transition: transform ease-out 200ms;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        border: 0;
        cursor: pointer;
        outline: none;

        &:before {
            content: attr(data-value);
            position: absolute;
            top: 50%;
            right: calc(100% + 10px);
            background-color: $blue;
            color: #fff;
            transform: translateY(-50%);
            font-weight: 500;
            max-width: 145px;
            white-space: nowrap;
            width: auto;
            padding: 10px 15px;
            line-height: initial;
        }
        &.opacity {
          opacity: .3 !important;
        }
        &[data-notify-count]:not([data-notify-count="0"]):after {
            content: attr(data-notify-count);
            position: absolute;
            top: -6px;
            right: -3px;
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
            background: $gray;
            opacity: 1 !important;
            &:before {
                background: $gray;
                color: $blue;
            }
        }

        @for $i from 1 through $columns {
          &:nth-child(#{$i}) {
            transition-duration: 180ms;
          }
        }
    }
    .baza1c {
        position: absolute;
        top: 87px;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        max-height: 393px;
        overflow-y: auto;
        width: 240px;

        button {
            border: 0;
            background: $blue;
            margin-bottom: 1rem;
            padding: 10px 20px;
            color: #fff;
            cursor: pointer;
            text-align: left;
            min-height: 35px;
            &:last-child {
                margin-bottom: 0;
            }
            &:hover {
                background: $gray;
                color: #000;
            }
        }
    }
    .left {
        .menu-item {
            right: unset;
            left: 10px;
            &::before {
                right: unset;
                left: calc(100% + 10px);
            }
        }
    }
    .checked {
        .menu-item {
            opacity: 1;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .menu-item {
            margin-bottom: -#{$margin}px;
        }
        @for $i from 1 through $columns {
            .menu-item:nth-child(#{$i}) {
                transition-duration: #{180 * $i}ms;
                transform: translate3d(0, -#{$margin * $i}px, 0);
            }
        }
        &.top {
            .menu-item {
                margin-bottom: 0;
                margin-top: -#{$margin}px;
                top: 0;
                bottom: unset;
            }
            @for $i from 1 through $columns {
                .menu-item:nth-child(#{$i}) {
                    transition-duration: #{180 * $i}ms;
                    transform: translate3d(0, #{$margin * $i}px, 0);
                }
            }
        }
    }
</style>
<style lang="scss">
    .menu-item {
        svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }
        &:hover {
            svg {
              fill: #000;
            }
        }
    }
</style>
