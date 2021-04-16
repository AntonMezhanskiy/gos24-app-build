<template>
    <div class="Home" :class="{checked}">
        <nav class="menu">
            <div class="menu-open-button" @click="toggle">
                <span :data-dot-show="+countNotify > 0" class="dot"></span>
                <img class="hamburger-logo" src="../assets/emblem.png" alt="">
                <span class="hamburger hamburger-1"></span>
                <span class="hamburger hamburger-3"></span>
            </div>
            <button type="button" data-value="Закрыть программу" @click="closeApp" class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256,0C114.508,0,0,114.497,0,256c0,141.493,114.497,256,256,256c141.492,0,256-114.497,256-256    C512,114.507,397.503,0,256,0z M256,472c-119.384,0-216-96.607-216-216c0-119.385,96.607-216,216-216    c119.384,0,216,96.607,216,216C472,375.385,375.393,472,256,472z"/>
                    <path d="M343.586,315.302L284.284,256l59.302-59.302c7.81-7.81,7.811-20.473,0.001-28.284c-7.812-7.811-20.475-7.81-28.284,0    L256,227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284,0c-7.81,7.811-7.81,20.474,0.001,28.284L227.716,256    l-59.302,59.302c-7.811,7.811-7.812,20.474-0.001,28.284c7.813,7.812,20.476,7.809,28.284,0L256,284.284l59.303,59.302    c7.808,7.81,20.473,7.811,28.284,0C351.398,335.775,351.397,323.112,343.586,315.302z"/>
                </svg>
            </button>
            <button type="button" data-value="Сменить аккаунт" @click="changeUser" v-if="isAuth" class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.016 512">
                    <path d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0"/>
                    <path d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0"/>
                    <path d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0"/>
                    <path d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0"/>
                    <path d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0"/>
                </svg>
            </button>
            <button type="button" data-value="Авторизоваться" @click="showAuthPage" v-else class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 478.024 478.024">
                    <path d="M411.703,73.561c-45.117-47.093-107.542-73.67-172.76-73.55C107.145-0.155,0.166,106.554,0,238.353    c-0.082,65.17,26.492,127.538,73.55,172.623c0.137,0.136,0.188,0.341,0.324,0.461c1.382,1.331,2.884,2.458,4.284,3.738    c3.84,3.413,7.68,6.946,11.725,10.24c2.167,1.707,4.42,3.413,6.639,4.983c3.823,2.85,7.646,5.7,11.639,8.329    c2.714,1.707,5.513,3.413,8.294,5.12c3.686,2.219,7.356,4.454,11.162,6.485c3.226,1.707,6.519,3.174,9.796,4.727    c3.584,1.707,7.117,3.413,10.786,4.949c3.669,1.536,7.356,2.731,11.076,4.062s6.929,2.56,10.496,3.652    c4.028,1.212,8.158,2.15,12.254,3.157c3.413,0.836,6.724,1.792,10.24,2.475c4.71,0.939,9.489,1.536,14.268,2.185    c2.953,0.41,5.837,0.99,8.823,1.28c7.817,0.768,15.701,1.195,23.654,1.195s15.838-0.427,23.654-1.195    c2.987-0.29,5.871-0.87,8.823-1.28c4.779-0.649,9.557-1.246,14.268-2.185c3.413-0.683,6.827-1.707,10.24-2.475    c4.096-1.007,8.226-1.946,12.254-3.157c3.567-1.092,7.014-2.423,10.496-3.652c3.482-1.229,7.441-2.56,11.076-4.062    s7.202-3.26,10.786-4.949c3.277-1.553,6.571-3.021,9.796-4.727c3.806-2.031,7.475-4.267,11.162-6.485    c2.782-1.707,5.581-3.26,8.294-5.12c3.994-2.628,7.817-5.478,11.639-8.329c2.219-1.707,4.471-3.243,6.639-4.983    c4.045-3.243,7.885-6.69,11.725-10.24c1.399-1.28,2.901-2.406,4.284-3.738c0.136-0.119,0.188-0.324,0.324-0.461    C499.644,319.798,502.881,168.732,411.703,73.561z M373.344,393.107c-3.106,2.731-6.315,5.325-9.557,7.834    c-1.911,1.468-3.823,2.918-5.786,4.318c-3.089,2.236-6.229,4.352-9.421,6.383c-2.321,1.485-4.693,2.918-7.083,4.318    c-3.004,1.707-6.059,3.413-9.148,5.12c-2.731,1.399-5.513,2.714-8.311,4.011s-5.888,2.679-8.909,3.891    c-3.021,1.212-6.229,2.355-9.387,3.413c-2.884,0.99-5.768,2.014-8.687,2.884c-3.413,1.024-6.98,1.86-10.513,2.714    c-2.765,0.648-5.495,1.382-8.294,1.929c-4.045,0.785-8.175,1.331-12.322,1.894c-2.355,0.307-4.693,0.734-7.066,0.973    c-6.554,0.631-13.193,1.007-19.9,1.007s-13.346-0.375-19.9-1.007c-2.372-0.239-4.71-0.666-7.066-0.973    c-4.147-0.563-8.277-1.109-12.322-1.894c-2.799-0.546-5.53-1.28-8.294-1.929c-3.533-0.853-7.049-1.707-10.513-2.714    c-2.918-0.87-5.803-1.894-8.687-2.884c-3.157-1.092-6.315-2.202-9.387-3.413c-3.072-1.212-5.973-2.543-8.909-3.891    s-5.581-2.611-8.311-4.011c-3.089-1.604-6.144-3.294-9.148-5.12c-2.389-1.399-4.762-2.833-7.083-4.318    c-3.191-2.031-6.332-4.147-9.421-6.383c-1.963-1.399-3.874-2.85-5.786-4.318c-3.243-2.509-6.451-5.12-9.557-7.834    c-0.751-0.563-1.434-1.28-2.167-1.929c0.763-58.057,38.06-109.321,93.065-127.915c27.503,13.083,59.435,13.083,86.938,0    c55.004,18.594,92.301,69.857,93.065,127.915C374.76,391.827,374.077,392.476,373.344,393.107z M179.43,136.849    c18.479-32.864,60.1-44.525,92.964-26.046s44.525,60.1,26.046,92.964c-6.131,10.904-15.141,19.914-26.046,26.046    c-0.085,0-0.188,0-0.29,0.102c-4.526,2.519-9.309,4.545-14.268,6.042c-0.887,0.256-1.707,0.597-2.645,0.819    c-1.707,0.444-3.499,0.751-5.257,1.058c-3.31,0.579-6.659,0.915-10.018,1.007h-1.946c-3.359-0.092-6.708-0.428-10.018-1.007    c-1.707-0.307-3.516-0.614-5.256-1.058c-0.905-0.222-1.707-0.563-2.645-0.819c-4.959-1.497-9.742-3.522-14.268-6.042l-0.307-0.102    C172.612,211.334,160.951,169.713,179.43,136.849z M405.753,357.336L405.753,357.336c-10.952-51.083-44.59-94.39-91.375-117.64    c38.245-41.661,35.475-106.438-6.186-144.683c-41.661-38.245-106.438-35.475-144.683,6.186    c-35.954,39.166-35.954,99.332,0,138.497c-46.785,23.251-80.423,66.557-91.375,117.64C6.69,265.153,28.366,137.371,120.549,71.927    s219.965-43.768,285.409,48.415c24.601,34.653,37.807,76.104,37.786,118.602C443.744,281.405,430.46,322.802,405.753,357.336z"/>
                </svg>
            </button>
            <button type="button" data-value="Перейти на портал" @click="openLink('https://gos24.kz')" class="menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.02 27.02" fill="none">
                    <path d="M3.674,24.876c0,0-0.024,0.604,0.566,0.604c0.734,0,6.811-0.008,6.811-0.008l0.01-5.581   c0,0-0.096-0.92,0.797-0.92h2.826c1.056,0,0.991,0.92,0.991,0.92l-0.012,5.563c0,0,5.762,0,6.667,0   c0.749,0,0.715-0.752,0.715-0.752V14.413l-9.396-8.358l-9.975,8.358C3.674,14.413,3.674,24.876,3.674,24.876z"/>
                    <path d="M0,13.635c0,0,0.847,1.561,2.694,0l11.038-9.338l10.349,9.28c2.138,1.542,2.939,0,2.939,0   L13.732,1.54L0,13.635z"/>
                    <polygon points="23.83,4.275 21.168,4.275 21.179,7.503 23.83,9.752  "/>
                </svg>
            </button>
            <button type="button" data-value="Центр уведомлений" @click="openLink('https://gos24.kz/notification')" :data-notify-count="countNotify" class="menu-item">
                <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M17.5 17V10.75C17.5 6.9125 15.4625 3.7 11.875 2.85V2C11.875 0.9625 11.0375 0.125 10 0.125C8.9625 0.125 8.125 0.9625 8.125 2V2.85C4.55 3.7 2.5 6.9 2.5 10.75V17L0 19.5V20.75H20V19.5L17.5 17ZM10 24.5C11.375 24.5 12.5 23.375 12.5 22H7.5C7.5 23.375 8.625 24.5 10 24.5ZM5 18.25H15V10.75C15 7.65 13.1125 5.125 10 5.125C6.8875 5.125 5 7.65 5 10.75V18.25Z"/>
                </svg>
            </button>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                checked: false,
                countNotify: '11'
            }
        },
        methods: {
            toggle () {
                const status = this.checked = !this.checked;
                let setWindowSize = {};
                this.checked = status;

                if (status) {
                    setWindowSize = { width: 220, height: 500 };
                } else {
                    this.$electron.ipcRenderer.send('close-child-window');
                }
                this.$electron.ipcRenderer.send('set-window-position', setWindowSize);
            },
            closeApp () {
                this.$electron.ipcRenderer.send('close-app');
            },
            openLink (link) {
                this.$electron.shell.openExternal(link)
            },
            showAuthPage () {
                this.$electron.ipcRenderer.send('page-auth');
            },
            async changeUser () {
                await this.$store.commit('LOGOUT_USER');
                await this.$electron.ipcRenderer.send('show-logout-btn', false);
            }
        },
        computed: {
            isAuth () {
                return this.$store.getters['isAuth']
            }
        }
        // created () {
        //     this.$socket.client.emit('join', this.roomName);
        // },
        // sockets: {
        //     NOTIFY_PING ({count}) {
        //         if (count > 0) {
        //             this.$electron.ipcRenderer.send('notify-on');
        //         }
        //     },
        //     connect () {
        //         console.info('socket connected');
        //     },
        //     disconnect () {
        //         console.info('socket disconnected');
        //     },
        //     reconnect () {
        //         this.$socket.client.emit('join', this.roomName);
        //     }
        // },
        // beforeDestroy () {
        //     console.log('beforeDestroy');
        //     this.$socket.client.emit('leave', this.roomName);
        // },
    }
</script>

<style scoped lang="scss">
    $height: 60px;
    $blue: #094380;
    .Home {
        display: flex;
        flex-direction: column;
        position: relative;

        .menu {
            width: 60px;
            height: 60px;
            font-size: 20px;
        }

        .menu-item, .menu-open-button {
            background: $blue;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            position: absolute;
            bottom: 0;
            right: 5px;
            color: white;
            text-align: center;
            line-height: 50px;
            transform: translate3d(0, 0, 0);
            transition: transform ease-out 200ms;
            .dot[data-dot-show=true] {
                width: 10px;
                height: 10px;
                background-color: $blue;
                border-radius: 50%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 50;
                animation: load 1.5s ease-out infinite;
            }
        }

        .hamburger {
            width: 25px;
            height: 3px;
            background: white;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -12.5px;
            margin-top: -1.5px;
            transition: transform 200ms;
            opacity: 0;

            &-logo {
                width: 55px;
                height: 55px;
                max-height: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(0, 0, 0) translate(-50%, -50%);
            }

            &-1 {
                transform: translate3d(0, 0, 0) rotate(45deg);
            }

            &-3 {
                transform: translate3d(0, 0, 0) rotate(-45deg);
            }
        }

        .menu-item {
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

        .menu-open-button {
            z-index: 2;
            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-duration: 400ms;
            transform: scale(1.1, 1.1) translate3d(0, 0, 0);
            cursor: pointer;
            margin-bottom: 0;
        }

        .menu-open-button:hover {
            transform: scale(1.2, 1.2) translate3d(0, 0, 0);
        }

        &.checked {
            .menu {
                height: 480px;
                width: 200px;
            }
            .menu-open-button .hamburger {
                opacity: 1;
            }

            .menu-open-button .hamburger-logo {
                opacity: 0;
            }

            .menu-open-button {
                transition-timing-function: linear;
                transition-duration: 200ms;
                transform: translate3d(0, 0, 0);
                .dot {
                    opacity: 0;
                }
            }

            .menu-item {
                opacity: 1;
                transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
            }

            .menu-item:nth-child(2) {
                transition-duration: 180ms;
                transform: translate3d(0, -70px, 0);
            }

            .menu-item:nth-child(3) {
                transition-duration: 280ms;
                transform: translate3d(0, -140px, 0);
            }

            .menu-item:nth-child(4) {
                transition-duration: 380ms;
                transform: translate3d(0, -210px, 0);
            }

            .menu-item:nth-child(5) {
                transition-duration: 480ms;
                transform: translate3d(0, -280px, 0);
            }

            .menu-item:nth-child(6) {
                transition-duration: 580ms;
                transform: translate3d(0, -350px, 0);
            }

            .menu-item:nth-child(7) {
                transition-duration: 680ms;
                transform: translate3d(0, -420px, 0);
            }

            .menu-item:nth-child(8) {
                transition-duration: 780ms;
                transform: translate3d(0, -450px, 0);
            }
        }
    }
    @keyframes load {
        0% {
            border: 0 solid transparent;
        }
        50% {
            border: 5px solid #fff;
        }
        100% {
            border: 0 solid transparent;
        }
    }
</style>
