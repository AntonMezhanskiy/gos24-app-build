<template>
    <div class="Base1cOldWindowsVersion">
        <h1>Мои 1с базы</h1>
        <button type="button" v-for="base in base1c" @click="linkOpenBasePage(base.id)">{{ base.name }}</button>
    </div>
</template>

<script>
export default {
    name: 'Base1cOldWindowsVersion',
    data () {
        return {
            base1c: [
                {id: 1, name: 'dsfsafawes'}
            ]
        }
    },
    methods: {
        linkOpenBasePage (slug) {
            this.$electron.shell.openExternal(`https://gos24.kz/base-1c/${slug}`);
            this.activeButton = null
        }
    }
}
</script>

<style scoped lang="scss">
$gray: #f2f2f2;
$blue: #094380;
.Base1cOldWindowsVersion {
    display: flex;
    flex-direction: column;
    h1 {
        margin-top: 1rem;
        margin-bottom: 2rem;
        font-size: 26px;
        padding: 10px 15px;
    }
    button {
        border: 0;
        border-bottom: 1px solid #000000;
        margin-bottom: 1rem;
        background: transparent;
        padding: 10px 15px;
        cursor: pointer;
        text-align: left;
        min-height: 35px;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background: $blue;
            color: #fff;
        }
    }
}
</style>
