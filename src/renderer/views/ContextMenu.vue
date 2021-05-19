<template>
    <div class="menu" :class="{checked, ...windowPosition}">
        <button type="button" data-value="Свернуть программу" class="menu-item"
                @click="change(dictionary.collapseApp)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256,0C114.508,0,0,114.497,0,256c0,141.493,114.497,256,256,256c141.492,0,256-114.497,256-256    C512,114.507,397.503,0,256,0z M256,472c-119.384,0-216-96.607-216-216c0-119.385,96.607-216,216-216    c119.384,0,216,96.607,216,216C472,375.385,375.393,472,256,472z"/>
                <path d="M343.586,315.302L284.284,256l59.302-59.302c7.81-7.81,7.811-20.473,0.001-28.284c-7.812-7.811-20.475-7.81-28.284,0    L256,227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284,0c-7.81,7.811-7.81,20.474,0.001,28.284L227.716,256    l-59.302,59.302c-7.811,7.811-7.812,20.474-0.001,28.284c7.813,7.812,20.476,7.809,28.284,0L256,284.284l59.303,59.302    c7.808,7.81,20.473,7.811,28.284,0C351.398,335.775,351.397,323.112,343.586,315.302z"/>
            </svg>
        </button>
        <button type="button" data-value="Авторизоваться" v-if="!isAuth" class="menu-item"
                @click="change(dictionary.auth)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 478.024 478.024">
                <path d="M411.703,73.561c-45.117-47.093-107.542-73.67-172.76-73.55C107.145-0.155,0.166,106.554,0,238.353    c-0.082,65.17,26.492,127.538,73.55,172.623c0.137,0.136,0.188,0.341,0.324,0.461c1.382,1.331,2.884,2.458,4.284,3.738    c3.84,3.413,7.68,6.946,11.725,10.24c2.167,1.707,4.42,3.413,6.639,4.983c3.823,2.85,7.646,5.7,11.639,8.329    c2.714,1.707,5.513,3.413,8.294,5.12c3.686,2.219,7.356,4.454,11.162,6.485c3.226,1.707,6.519,3.174,9.796,4.727    c3.584,1.707,7.117,3.413,10.786,4.949c3.669,1.536,7.356,2.731,11.076,4.062s6.929,2.56,10.496,3.652    c4.028,1.212,8.158,2.15,12.254,3.157c3.413,0.836,6.724,1.792,10.24,2.475c4.71,0.939,9.489,1.536,14.268,2.185    c2.953,0.41,5.837,0.99,8.823,1.28c7.817,0.768,15.701,1.195,23.654,1.195s15.838-0.427,23.654-1.195    c2.987-0.29,5.871-0.87,8.823-1.28c4.779-0.649,9.557-1.246,14.268-2.185c3.413-0.683,6.827-1.707,10.24-2.475    c4.096-1.007,8.226-1.946,12.254-3.157c3.567-1.092,7.014-2.423,10.496-3.652c3.482-1.229,7.441-2.56,11.076-4.062    s7.202-3.26,10.786-4.949c3.277-1.553,6.571-3.021,9.796-4.727c3.806-2.031,7.475-4.267,11.162-6.485    c2.782-1.707,5.581-3.26,8.294-5.12c3.994-2.628,7.817-5.478,11.639-8.329c2.219-1.707,4.471-3.243,6.639-4.983    c4.045-3.243,7.885-6.69,11.725-10.24c1.399-1.28,2.901-2.406,4.284-3.738c0.136-0.119,0.188-0.324,0.324-0.461    C499.644,319.798,502.881,168.732,411.703,73.561z M373.344,393.107c-3.106,2.731-6.315,5.325-9.557,7.834    c-1.911,1.468-3.823,2.918-5.786,4.318c-3.089,2.236-6.229,4.352-9.421,6.383c-2.321,1.485-4.693,2.918-7.083,4.318    c-3.004,1.707-6.059,3.413-9.148,5.12c-2.731,1.399-5.513,2.714-8.311,4.011s-5.888,2.679-8.909,3.891    c-3.021,1.212-6.229,2.355-9.387,3.413c-2.884,0.99-5.768,2.014-8.687,2.884c-3.413,1.024-6.98,1.86-10.513,2.714    c-2.765,0.648-5.495,1.382-8.294,1.929c-4.045,0.785-8.175,1.331-12.322,1.894c-2.355,0.307-4.693,0.734-7.066,0.973    c-6.554,0.631-13.193,1.007-19.9,1.007s-13.346-0.375-19.9-1.007c-2.372-0.239-4.71-0.666-7.066-0.973    c-4.147-0.563-8.277-1.109-12.322-1.894c-2.799-0.546-5.53-1.28-8.294-1.929c-3.533-0.853-7.049-1.707-10.513-2.714    c-2.918-0.87-5.803-1.894-8.687-2.884c-3.157-1.092-6.315-2.202-9.387-3.413c-3.072-1.212-5.973-2.543-8.909-3.891    s-5.581-2.611-8.311-4.011c-3.089-1.604-6.144-3.294-9.148-5.12c-2.389-1.399-4.762-2.833-7.083-4.318    c-3.191-2.031-6.332-4.147-9.421-6.383c-1.963-1.399-3.874-2.85-5.786-4.318c-3.243-2.509-6.451-5.12-9.557-7.834    c-0.751-0.563-1.434-1.28-2.167-1.929c0.763-58.057,38.06-109.321,93.065-127.915c27.503,13.083,59.435,13.083,86.938,0    c55.004,18.594,92.301,69.857,93.065,127.915C374.76,391.827,374.077,392.476,373.344,393.107z M179.43,136.849    c18.479-32.864,60.1-44.525,92.964-26.046s44.525,60.1,26.046,92.964c-6.131,10.904-15.141,19.914-26.046,26.046    c-0.085,0-0.188,0-0.29,0.102c-4.526,2.519-9.309,4.545-14.268,6.042c-0.887,0.256-1.707,0.597-2.645,0.819    c-1.707,0.444-3.499,0.751-5.257,1.058c-3.31,0.579-6.659,0.915-10.018,1.007h-1.946c-3.359-0.092-6.708-0.428-10.018-1.007    c-1.707-0.307-3.516-0.614-5.256-1.058c-0.905-0.222-1.707-0.563-2.645-0.819c-4.959-1.497-9.742-3.522-14.268-6.042l-0.307-0.102    C172.612,211.334,160.951,169.713,179.43,136.849z M405.753,357.336L405.753,357.336c-10.952-51.083-44.59-94.39-91.375-117.64    c38.245-41.661,35.475-106.438-6.186-144.683c-41.661-38.245-106.438-35.475-144.683,6.186    c-35.954,39.166-35.954,99.332,0,138.497c-46.785,23.251-80.423,66.557-91.375,117.64C6.69,265.153,28.366,137.371,120.549,71.927    s219.965-43.768,285.409,48.415c24.601,34.653,37.807,76.104,37.786,118.602C443.744,281.405,430.46,322.802,405.753,357.336z"/>
            </svg>
        </button>
        <button type="button" class="menu-item"
                data-value="Центр уведомлений"
                @click="change(dictionary.link, 'https://gos24.kz/notification')"
                :data-notify-count="countNotify">
            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M17.5 17V10.75C17.5 6.9125 15.4625 3.7 11.875 2.85V2C11.875 0.9625 11.0375 0.125 10 0.125C8.9625 0.125 8.125 0.9625 8.125 2V2.85C4.55 3.7 2.5 6.9 2.5 10.75V17L0 19.5V20.75H20V19.5L17.5 17ZM10 24.5C11.375 24.5 12.5 23.375 12.5 22H7.5C7.5 23.375 8.625 24.5 10 24.5ZM5 18.25H15V10.75C15 7.65 13.1125 5.125 10 5.125C6.8875 5.125 5 7.65 5 10.75V18.25Z"/>
            </svg>
        </button>
        <button type="button" data-value="Задать вопрос" class="menu-item"
                @click="change(dictionary.link, 'https://gos24.kz/qa/new')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 27" fill="none">
                <path d="M30.1233 25.3059L28.7772 21.2677C28.7024 21.0358 28.7249 20.7891 28.8371 20.5722C29.8466 18.6054 30.2654 16.2872 29.8317 13.8418C29.1586 10.0952 26.4141 6.97679 22.8545 5.78027C23.7743 8.0013 24.051 10.4691 23.5948 12.9145C22.66 17.8875 18.6816 21.836 13.6862 22.7259C13.0431 22.8456 12.385 22.8979 11.7344 22.9129C13.2525 24.5506 15.279 25.7097 17.5375 26.121C19.9679 26.5548 22.2787 26.1509 24.2379 25.1563C24.4548 25.0442 24.7016 25.0217 24.9259 25.0965L28.9791 26.4501C29.6896 26.6894 30.3626 26.0163 30.1233 25.3059Z" fill="#FFAC00"/>
                <path d="M9.39357 0.186758C5.18333 0.971971 1.81066 4.38952 1.05536 8.60723C0.614144 11.0526 1.03292 13.3709 2.04996 15.3376C2.16213 15.5545 2.18457 15.8013 2.10979 16.0331L0.763708 20.0713C0.524405 20.7818 1.20492 21.4548 1.91535 21.223L5.96855 19.8694C6.20037 19.7946 6.43967 19.8171 6.65654 19.9292C8.61583 20.9238 10.9266 21.3277 13.357 20.8939C17.5598 20.1386 20.9698 16.7734 21.7625 12.5782C23.146 5.17473 16.7895 -1.18176 9.39357 0.186758ZM11.3304 17.3717C10.5976 17.3717 9.9993 16.7734 9.9993 16.0406C9.9993 15.3077 10.5976 14.7095 11.3304 14.7095C12.0633 14.7095 12.6615 15.3077 12.6615 16.0406C12.6615 16.7734 12.0633 17.3717 11.3304 17.3717ZM12.6167 11.5462L12.6391 12.0696C12.6391 12.795 12.0558 13.3783 11.3304 13.3783C10.605 13.3783 10.0217 12.795 10.0217 12.0696V11.5985C10.0217 10.4618 10.7097 9.45227 11.7417 9.08583C12.2203 8.91384 12.5494 8.45766 12.5494 7.94167C12.5494 7.63506 12.4148 7.32098 12.1829 7.08915C11.9436 6.84985 11.6595 6.7302 11.3304 6.72272C10.6649 6.72272 10.119 7.27611 10.119 7.94167C10.119 8.66705 9.53565 9.25035 8.81027 9.25035C8.08488 9.25035 7.50158 8.66705 7.50158 7.94167C7.50158 5.84029 9.21409 4.1203 11.3155 4.10534C12.3325 4.06795 13.3122 4.51664 14.0375 5.24203C14.7629 5.96742 15.1817 6.96202 15.1742 7.9641C15.1593 9.55696 14.1348 11.0003 12.6167 11.5462Z"/>
            </svg>
        </button>
        <button type="button" data-value="Обратиться к куратору" class="menu-item"
                @click="change(dictionary.link, 'https://gos24.kz/support/new')">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
                <path d="M27.3726 9.63445L15.23 16.8379C15.1061 16.9113 15.0318 17.0418 15.0318 17.1887V30.5921C15.0318 30.9021 15.3785 31.106 15.6509 30.9429L27.7936 24.0168C27.9175 23.9434 28 23.8129 28 23.666V9.98524C28 9.66708 27.6533 9.47129 27.3726 9.63445ZM0.627359 9.63445C0.346698 9.47129 0 9.66708 0 9.98524V23.666C0 23.8129 0.0825472 23.9434 0.206368 24.0168L12.3491 30.9429C12.6215 31.0979 12.9682 30.9021 12.9682 30.5921V17.1805C12.9682 17.0337 12.8939 16.9031 12.77 16.8297L0.627359 9.63445ZM8.04009 22.0589L7.42925 21.7326V23.7802C7.42925 24.0576 7.20637 24.1555 6.92571 24.0087L5.35731 23.1766C5.07665 23.0297 4.85377 22.6871 4.85377 22.4097V20.3621L4.24292 20.0358C3.81368 19.8073 3.58255 19.1792 3.86321 19.0079L5.77005 17.8495C5.96816 17.7271 6.33137 17.9147 6.52948 18.2492L8.43632 21.4226C8.70047 21.9039 8.46934 22.2873 8.04009 22.0589Z"/>
                <path d="M18.7463 2.65123L14.198 0.0570189C14.0742 -0.0164021 13.9091 -0.0164021 13.7852 0.0570189L1.50222 7.06465C1.22982 7.21965 1.22982 7.61123 1.49397 7.76623L6.18265 10.5481C6.31472 10.6297 6.47982 10.6297 6.60364 10.5481L18.7463 3.34465C19.027 3.18965 19.0187 2.80623 18.7463 2.65123ZM26.9515 7.08097L24.8796 2.62676C24.7805 2.40649 24.4999 2.31676 24.2935 2.44728L12.0022 9.73228C11.8289 9.83834 11.7546 10.0586 11.8371 10.2462L13.8183 14.7575C13.9173 14.986 14.198 15.0757 14.4126 14.9452L26.7947 7.60307C26.968 7.49702 27.0341 7.2686 26.9515 7.08097Z"/>
            </svg>
        </button>
        <button type="button" data-value="Открыть портал" class="menu-item"
                @click="change(dictionary.link, 'https://gos24.kz')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.02 27.02" fill="none">
                <path d="M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581   c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0   c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"/>
                <path d="M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0   L13.732,1.54L0,13.635z"/>
                <polygon points="23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752  "/>
            </svg>
        </button>
    </div>
</template>

<script>
    import HomeSlot from '../components/common/Home';

    export default {
        name: 'ContextMenu',
        components: {
            HomeSlot
        },
        data () {
            return {
                dictionary: {
                    auth: 'auth',
                    changeUser: 'change-user',
                    link: 'link',
                    collapseApp: 'collapse-app'
                },
                checked: false,
                countNotify: 0,
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

            this.$bus.$on('changeUser', async () => {
                await this.socketConn('leave');
                await this.$store.commit('LOGOUT_USER');
                await this.$electron.ipcRenderer.send('page-auth');
            });
            this.$electron.ipcRenderer.on('modal-show', (event, data) => {
                this.checked = data
            });
        },
        beforeDestroy () {
            if (this.isAuth) {
                this.socketConn('leave');
            }
            this.$bus.$off('changeUser');
        },
        methods: {
            toggle (type) {
                const status = this.checked = !this.checked;
                this.checked = status;

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
                }
                this.toggle(type)
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
                    this.updateNotifi();
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
$blue: #094380;
$columns: 7;
$margin: 70;
    .menu {
        font-size: 20px;
        flex-direction: column;
        position: relative;
        min-height: 400px;
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

        svg {
            width: 20px;
            height: 20px;
            fill: #fff;
        }

        &:hover {
            background: #f2f2f2;
            &:before {
                background: #f2f2f2;
                color: $blue;
            }
            svg {
                fill: #000;
            }
        }

        &:nth-child(2) {
            transition-duration: 180ms;
        }

        &:nth-child(3) {
            transition-duration: 180ms;
        }

        &:nth-child(4) {
            transition-duration: 180ms;
        }

        &:nth-child(5) {
            transition-duration: 180ms;
        }

        &:nth-child(6) {
            transition-duration: 180ms;
        }

        &:nth-child(7) {
            transition-duration: 180ms;
        }

        &:nth-child(8) {
            transition-duration: 180ms;
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