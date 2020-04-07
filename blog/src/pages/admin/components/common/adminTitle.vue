<template>
    <div id="admin-title">
        <h2 v-text="this.title">
        </h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "adminTitle",
    props: {
        title: String
    }
};
</script>

<style scoped>
/* 媒体查询 */
@media screen and (max-width: 960px) {
    h2 {
        font-size: 2.5rem;
    }
} /* 超小设备（手机，小于 480px） */
h2 {
    text-align: left;
    font-weight: bold;
    margin: 30px auto;
    display: inline-block;
}
</style>