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
/* #admin-title {
} */
h2 {
    text-align: left;
    font-weight: bold;
    margin: 30px auto;
    display: inline-block;
}
</style>