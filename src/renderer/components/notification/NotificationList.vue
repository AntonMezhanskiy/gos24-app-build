<template>
    <a
      v-if="item"
      @click="openLink(`https://gos24.kz${item.url}`)"
      :class="['notification-list', { 'no-view': !item.viewed }]"
    >
        <div class="notification-list__img">
            <img :src="changeImg()" alt="gos24.kz"/>
        </div>
        <div class="notification-list__body">
            <header>
                <div>{{ item.service }}<span>/</span>{{ item.parent_preview }}</div>
                <div class="notification-list__date">
                    {{ $moment(item.created).format("DD MMM YYYY") }}
                </div>
            </header>
            <p>{{ item.message }}</p>
        </div>

        <div v-if="!item.viewed" class="notification-list__viewed">
            <img src="../../assets/icon/point.svg" alt="point"/>
        </div>
    </a>
</template>

<script>
    export default {
        name: 'NotificationList',
        props: {
            item: Object
        },
        created () {
            // заменяет все теги на без тегов <span>aaaaaaa</span>, <p>pppppp</p>, <div>ddddddddddd</div> = aaaaaaa, pppppp, ddddddddddd
            this.item.message = this.item.message.replace(
                /(<[^>]+>|<[^>]>|<\/[^>]>)/g,
                ' '
            );
        },
        methods: {
            openLink (link) {
                this.$electron.shell.openExternal(link)
            },
            changeImg () {
                let img = null;
                switch (this.item.notification_type) {
                case 'new_entry':
                    img = 'new.svg';
                    break;
                case 'new_status':
                    img = 'notificationsBlue.svg';
                    break;
                case 'new_comment':
                default:
                    img = 'mail.svg';
                }
                return require(`../../assets/icon/${img}`);
            }
        }
    };
</script>

<style scoped>
    .notification-list {
        border-bottom: 1px solid rgba(9, 67, 128, 0.22);
        position: relative;
        display: flex;
        align-items: flex-start;
        color: #094380;
        cursor: pointer;
        padding: 8px 0;
    }

    .notification-list.no-view {
        background: #f1f1f1;
    }

    .notification-list__img {
        width: 20px;
        min-width: 20px;
        margin-right: 10px;
        opacity: 0.8;
    }

    .notification-list__img img {
        width: 100%;
    }

    .notification-list__viewed {
        width: 18px;
        min-width: 18px;
        margin-top: -5px;
        margin-left: 5px;
    }

    .notification-list__body {
        flex-grow: 1;
        line-height: 1.4;
    }

    .notification-list__body header {
        display: flex;
    }

    .notification-list__body header div {
        color: #7f7f7f;
        font-size: 90%;
        padding-right: 8px;
    }

    .notification-list__body p {
        font-weight: 500;
    }

    .notification-list__date {
        margin-left: auto;
        color: inherit !important;
        white-space: nowrap;
        padding-left: 10px;
    }

    .notification-list__body header {
        flex-wrap: wrap;
    }

    .notification-list__body p {
        font-size: 100%;
    }

    .notification-list__date {
        width: 100%;
        color: #094380;
        padding-left: 0;
    }

    .notification-list__viewed {
        position: absolute;
        top: 6px;
        right: 0;
        margin: 0;
    }
</style>
