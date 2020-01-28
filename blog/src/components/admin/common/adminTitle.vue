<template>
    <h2 id="admin-title"
        v-text="this.title"></h2>
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
#admin-title {
    text-align: left;
    font-weight: bold;
}
</style>