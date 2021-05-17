<template>
    <div class="Home" :class="{checked}">
        <div class="menu-open-button"
             @click="toggle()"
             @mousedown="mousedown">
            <span :data-dot-show="countNotify > 0" class="dot"></span>
            <img class="hamburger-logo" src="../assets/emblem.png" alt="">
            <span class="hamburger hamburger-1"></span>
            <span class="hamburger hamburger-3"></span>
        </div>
    </div>
</template>

<script>
    let durationClick = 0
    export default {
        name: 'Home',
        data () {
            return {
                isMove: false,
                checked: false,
                countNotify: 0,
                animationId: 0,
                mouseX: 0,
                mouseY: 0
            }
        },
        mounted () {
            this.$electron.ipcRenderer.on('windowMoved', (event, data) => {
                console.log('data', data)
            });
        },
        methods: {
            toggle (type) {
                if (this.isMove) {
                    return;
                }

                console.log('click')
                const status = this.checked = !this.checked;
                this.checked = status;
                this.$electron.ipcRenderer.send('toogle-modal', status)
            },
            mouseup (e) {
                document.removeEventListener('mouseup', this.mouseup)
                window.cancelAnimationFrame(this.animationId);
                if (durationClick > 10) {
                    this.isMove = true;
                    this.$electron.ipcRenderer.send('windowMoved')
                }
                durationClick = 0;
            },
            mousedown (e) {
                this.isMove = false;
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                document.addEventListener('mouseup', this.mouseup, true)
                this.animationId = window.requestAnimationFrame(this.mousemove);
            },
            mousemove (e) {
                durationClick++
                this.$electron.ipcRenderer.send('windowMoving', { mouseX: this.mouseX, mouseY: this.mouseY });
                window.cancelAnimationFrame(this.animationId)
                this.animationId = window.requestAnimationFrame(this.mousemove);
            }
        }
    }
</script>

<style scoped lang="scss">
$height: 70px;
$width: 70px;
$blue: #094380;
    .Home {
        width: $width;
        height: $height;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;

        .menu-open-button {
            background: $blue;
            border-radius: 100%;
            width: 50px;
            height: 50px;
            color: white;
            text-align: center;
            line-height: 50px;
            transition: transform ease-out 200ms;
            z-index: 2;
            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition-duration: 400ms;
            transform: scale(1.1, 1.1) translate3d(0, 0, 0);
            cursor: pointer;
            margin-bottom: 0;
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
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                z-index: 2;
            }
            &:hover {
                transform: scale(1.2, 1.2) translate3d(0, 0, 0);
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
            transform: translate(-50%, -50%);
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
                transform:  translate(-50%, -50%) translate3d(0, 0, 0) rotate(45deg);
            }

            &-3 {
                transform:  translate(-50%, -50%) translate3d(0, 0, 0) rotate(-45deg);
            }
        }

        &.checked {
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
        }
    }
</style>
