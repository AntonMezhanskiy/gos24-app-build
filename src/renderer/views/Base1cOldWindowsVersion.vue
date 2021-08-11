<template>
    <div class="Base1cOldWindowsVersion">
        <h1>Мои 1с базы</h1>
        <div>
            <button type="button" v-for="base in base1c" @click="linkOpenBasePage(base.base_url)">{{ base.name }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Base1cOldWindowsVersion',
    data () {
        return {
            base1c: []
        }
    },
    created () {
        this.getBase1c()
    },
    methods: {
        async getBase1c () {
            try {
                const response = await this.$axios.get('base/base_1c/')
                this.base1c = response.data
            } catch (e) {
                console.log(e)
            }
        },
        linkOpenBasePage (url) {
            this.$electron.shell.openExternal(url);
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
    div {
        padding: 0 15px;
    }
    button {
        display: block;
        width: 100%;
        border: 0;
        border-bottom: 1px solid #000000;
        margin-bottom: 10px;
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
