<template>
    <div class="pagination">
        <button :disabled="countFull === 1" @click="change('prev')">Назад</button>
        <Loading v-show="loading" class="small"/>
        <span v-if="query" v-show="!loading"
        >Страница {{ query.page }} из {{ countFull() }}</span
        >
        <button :disabled="countFull === 1" @click="change('next')">Вперед</button>
    </div>
</template>

<script>
    import Loading from './Loading.vue';

    export default {
        name: 'Pagination',
        components: {
            Loading
        },
        props: {
            query: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            loading: {
                type: Boolean,
                required: true
            },
            showQueryParams: {
                type: Boolean,
                default: () => true
            }
        },
        methods: {
            countFull () {
                return this.count === 0
                    ? 1
                    : Math.ceil(this.count / this.$store.state.paginationLimit);
            },
            change (isChange) {
                this.$emit('change', isChange);
            }
        }
    };
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0 10px;
        font-size: 12px;
        font-weight: 300;
    }

    .pagination.up {
        padding-top: 0;
        min-height: 52px;
    }

    .pagination button {
        font-weight: 500;
        color: #094380;
        background: transparent;
        border: 0;
    }
</style>
