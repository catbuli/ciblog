<template>
    <menu id="menu">
        <router-link to="/">Home</router-link>
    </menu>
</template>

<script>
export default {
    name: "menuEle",
    methods: {}
};
</script>

<style scoped>
#menu {
    overflow: hidden;
    width: 100%;
}
#menu a {
    background-color: silver;
    line-height: 50px;
    height: 50px;
    display: inline-block;
    width: 100%;
    font-weight: bold;
    color: #2c3e50;
}

#menu a.router-link-exact-active {
    color: #42b983;
}
</style>