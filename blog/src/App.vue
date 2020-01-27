<template>
    <div id="app">
        <navEle @handleWeight="handleWeight"></navEle>
        <div id="mian"
             :class="[isShow ? '' : 'handle-main']">
            <transition name="fade"
                        mode="out-in">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
import navEle from "@/components/nav/navEle.vue";
export default {
    name: "app",
    data() {
        return {
            isShow: true
        };
    },
    watch: {
        $route: function(to, from) {
            scrollTo(0, 0);
        }
    },
    components: {
        navEle
    },
    methods: {
        handleWeight(params) {
            this.isShow = params;
        }
    }
};
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 400;
}
html {
    height: 100%;
    width: 100%;
}
input,
button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
}
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background-color: #f2f2f2;
}
a {
    text-decoration: none;
}
body,
ul,
li,
p,
menu {
    margin: 0;
    padding: 0;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
}

#mian {
    position: absolute;
    width: 85%;
    left: 15%;
    transition: all 0.5s ease;
}

.handle-main {
    width: 100% !important;
    left: 0 !important;
    transition: all 0.5s ease;
}

.fade-enter {
    opacity: 0;
    /* transform:translateX(500px); */
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
    /* transform-origin: center top; */
}

.fade-leave {
    opacity: 1;
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    transform: rotateY(0deg);
    /* transform:translateX(0px); */
    /* transform: rotate(0deg); */
}

.fade-enter-active {
    transition: all 0.9s ease;
}

.fade-leave-active {
}
</style>
