<template>
    <div class="Home">
        <h1>Центр уведомлений</h1>
        <div class="Home-head">
            <InputRadio text="Все" nameInput="type" valueInput="2" :valueProp="`${query.type}`" nameProp="type"
                        @get="selectedValue"/>
            <InputRadio text="Не прочитанные" nameInput="type" valueInput="0" :valueProp="`${query.type}`"
                        nameProp="type"
                        @get="selectedValue"/>
        </div>
        <Loading v-show="loading && items.length === 0"/>

        <template v-for="(item, index) in items">
            <NotificationList :item="item" :key="'NotificationList-'+index"/>
        </template>

        <NotificationNoContent v-show="!loading && items.length === 0"/>

        <div v-if="items.length > 0" class="notification-footer">
            <Pagination :query="query" :count="count" :loading="loading" @change="pagination"/>
            <button v-if="showMarkAll" @click="changeMark">Пометить все как прочитанные</button>
        </div>
    </div>
</template>

<script>
    import Loading from '../components/ui/Loading.vue'
    import InputRadio from '../components/ui/InputRadio.vue'
    import Pagination from '../components/ui/Pagination.vue'
    import NotificationList from '../components/notification/NotificationList.vue'
    import NotificationNoContent from '../components/notification/NotificationNoContent.vue'

    export default {
        name: 'Home',
        components: {
            Loading,
            InputRadio,
            NotificationList,
            NotificationNoContent,
            Pagination
        },
        data () {
            return {
                query: {
                    type: this.$route.query.type || '2', // 0
                    page: +this.$route.query.page || 1,
                    service: this.$route.query.service || ''
                },
                loading: false,
                items: [],
                next: null,
                previous: null,
                count: null,
                showMarkAll: false,
                roomName: 'room_notify_' + this.$store.state.user.userId
            }
        },
        created () {
            this.$socket.client.emit('join', this.roomName);
            this.loadPage()
        },
        sockets: {
            NOTIFY_PING: function (response) {
                this.loadPage();
                this.$electron.ipcRenderer.send('notify-on');
            },
            connect () {
                console.info('socket connected');
            },
            disconnect () {
                console.info('socket disconnected');
            },
            reconnect () {
                this.$socket.client.emit('join', this.roomName);
            }
        },
        beforeDestroy () {
            console.log('beforeDestroy');
            this.$socket.client.emit('leave', this.roomName);
        },
        methods: {
            selectedValue (val) {
                this.query.page = 1;
                this.query[val.name] = val.value;

                this.loadPage()
            },
            pagination (val) {
                switch (val) {
                case 'next':
                    if (this.next !== null) {
                        this.query.page++;
                        this.loading = true;
                        this.loadPage()
                    }
                    break;
                case 'prev':
                    if (this.previous !== null) {
                        this.query.page--;
                        this.loading = true;
                        this.loadPage()
                    }
                    break;
                }
            },
            async changeMark () {
                const {data} = await this.$axios.put('notification/mark/');
                if (data.message === 'ok') {
                    this.loadPage();
                }
            },
            async loadPage () {
                this.loading = true;
                this.items = [];

                try {
                    const {data} = await this.$axios.get('notification/', {params: this.query});
                    this.next = data.next;
                    this.previous = data.previous;
                    this.count = data.count;
                    this.items = data.results;
                    this.showMarkAll = data.results.some(({viewed}) => viewed === false);
                } catch (error) {
                    console.log('Ошибка при получение "Уведомления".', error)
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>
    .Home {
        background: #fff;
        padding: 1rem;
        border-radius: 4px;
    }

    .Home-head {
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }

    .Home-head div {
        margin-bottom: 0;
        margin-left: 1rem;
    }

    .Home-head div:first-child {
        margin-left: 0;
    }

    .Home h1 {
        font-size: 20px;
        text-align: center;
    }

    .notification-footer button {
        font-size: 85%;
        opacity: 0.8;
        background: #094380;
        color: #fff;
        padding: 6px 10px;
        border-radius: 100px;
        border: 0;
    }

    .notification-footer button:hover {
        opacity: 0.7;
    }
</style>
