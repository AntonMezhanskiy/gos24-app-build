<template>
    <div class="notification-noContent">
        <img src="../../assets/icon/notification.svg" alt="notification gos24.kz"/>
        <h4>У вас пока нет уведомлений.</h4>
    </div>
</template>

<script>
    export default {
        name: 'NotificationNoContent'
    };
</script>

<style scoped>
    .notification-noContent {
        text-align: center;
        padding-top: 3rem;
    }

    .notification-noContent img {
        margin-bottom: 2rem;
        display: inline-block;
    }
</style>
