<template>
    <div class="button-create">
        <button type="button" @click="open = !open" class="button">
            Создать
            <img :src="require(`../../assets/icon/${toggle(open)}`)" alt="Создать"/>
        </button>
        <div v-if="open" class="b-c__content shadow">
            <template v-if="items">
                <button type="button"
                        class="button-link"
                        v-for="(item, idx) in items.toAll"
                        :key="'button-create' + idx"
                        @click="openLink(`https://gos24.kz${item.url}`)">{{ item.name }}</button>
                <h4 v-if="items.admin">Для админа</h4>
                <button  v-for="(item, idx) in items.adminLinks"
                         :key="'button-create-admin' + idx"
                         type="button"
                         @click="openLink(`https://gos24.kz${item.url}`)">{{ item.name }}</button>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ButtonCreate',
    data () {
        return {
            open: false
        };
    },
    methods: {
        toggle (bool) {
            return bool ? 'buttonUp2.svg' : 'buttonDown2.svg';
        },
        openLink (link) {
            this.$electron.shell.openExternal(link)
        }
    },
    computed: {
        user () {
            return this.$store.getters['user'];
        },
        isAdmin () {
            return this.$store.getters['adminQa'] || this.$store.getters['adminBlog'];
        },
        isAuth () {
            return this.$store.getters['isAuth'];
        },
        items () {
            const items = [
                {name: 'Задать вопрос', url: '/qa/new'},
                {name: 'Вопрос в комплексное сопровождение', url: '/support/new'},
                {name: 'Вопрос в техподдержку', url: '/user/support/new'},
                {name: 'Заказать обратный звонок', url: '/contact'}
            ];
            const adminLinks = [
                {name: 'Вопрос-ответ', url: '/question-answer/new'},
                {name: 'Новость', url: '/blog/new'},
                {name: 'Статья', url: '/article/new'},
                {
                    name: 'Официальное разъяснение',
                    url: '/official-clarification/new'
                },
                {name: 'Вебинар', url: '/education/webinar/new'},
                {name: 'Мастер-класс', url: '/education/master-class/new'},
                {name: 'Курс', url: '/education/course/new'},
                {name: 'База знаний', url: '/knowledgebase/new'},
                {name: 'Продукт', url: '/products/new'},
                {name: 'Открытый диалог', url: '/open-dialog'}
            ];
            return {
                toAll: items,
                admin: this.isAdmin,
                adminLinks: this.isAdmin ? adminLinks : []
            };
        }
    }
};
</script>

<style scoped lang="scss">
    .button-create {
        width: 100%;
        position: relative;
        margin-bottom: 15px;
        .button {
            width: 100%;
            background: #094380;
            border-radius: 4px;
            color: #fff;
            padding: 12px;
            font-weight: 600;
            font-size: 16px;
            white-space: nowrap;
            img {
                width: 18px;
                display: inline-block;
            }
        }
        .b-c__content {
            min-width: 265px;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            right: unset;
            bottom: unset;
            background: #fff;
            border-radius: 4px;
            padding: 1rem 1.5rem;
            z-index: 55;
            h4 {
                margin: 20px 0 0;
                font-size: 1.4rem;
                color: #717171;
                opacity: 0.6;
            }
            .button-link {
                display: block;
                font-weight: 500;
                font-size: 16px;
                line-height: 110%;
                margin-top: 10px;
                color: #094380;
                font-weight: 500;
                border: 0;
                &:first-child {
                    margin-top: 0;
                }
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
