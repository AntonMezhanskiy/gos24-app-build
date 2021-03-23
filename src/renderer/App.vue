<template>
    <div id="app">
        <ButtonCreate/>
        <router-view></router-view>
        <ProgressUpdater/>
    </div>
</template>

<script>
    import ButtonCreate from './components/common/ButtonCreate.vue'
    import ProgressUpdater from './components/common/ProgressUpdater.vue'

    export default {
        name: 'gos24-electron',
        components: {
            ButtonCreate,
            ProgressUpdater
        }
    }
</script>

<style>
    #app {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem 0;
    }
</style>
