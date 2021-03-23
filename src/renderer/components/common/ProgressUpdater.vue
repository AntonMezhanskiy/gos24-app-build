<template>
    <div class="ProgressUpdater">
        <p class="version">Текущая версия — {{version}}</p>
        <div class="updating" v-if="message && message.type !== 'not-found'">
            <img src="../../assets/emblem.png" alt="" />
            <template v-if="message.type === 'process'">
                <h2>{{ message.text }}</h2>
                <p>скорость: {{ message.process.speed }} мб/c</p>
                <p>загружено: {{ message.process.percent }}%</p>
            </template>
            <h2 v-else>{{ message.text }}</h2>
            <Loading v-if="message.type !== 'not-found'"/>
        </div>
    </div>
</template>

<script>
    import Loading from '../ui/Loading';
    export default {
        name: 'ProgressUpdater',
        components: {
            Loading
        },
        data () {
            return {
                version: this.$electron.remote.app.getVersion(),
                message: null
            }
        },
        created () {
            this.$electron.ipcRenderer.on('updateStatus', (event, text) => {
                this.message = text;
            })
        }
    }
</script>

<style scoped lang="scss">
    .ProgressUpdater {
        .version {
            margin: 1rem 0 -10px;
            font-weight: 500;
            font-size: 75%;
            text-align: center;
            opacity: .6;
            letter-spacing: 0.5px;
        }
        .updating {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: #e8e8e8;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            img {
                width: 100px;
            }
            h2 {
                margin: 1rem 0 10px;
            }
            p {
                font-size: 85%;
            }
        }
    }
</style>
