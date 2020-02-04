<template>
    <div id="Admin">
        <div class="admin-main">
            <transition name="card">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import Axios from "axios";

export default {
    name: "admin",
    components: {},
    data() {
        return {};
    },
    methods: {
        checkLogin() {
            this.$router.push("/login");
        }
    },
    mounted() {
        // this.checkLogin();
    }
};
</script>

<style scoped>
#admin {
    position: relative;
}
.admin-main {
    width: 100%;
}

.card-enter {
    transform: translateX(-80%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
.card-enter-active {
    transition: all 1s ease;
}
.card-enter-to {
    transform: translateX(0);
    /* transform: scale(1); */
    opacity: 1;
}

.card-leave {
    transform: translateX(0);
    /* transform: scale(1); */
    opacity: 1;
}
.card-leave-active {
    transition: all 1s ease;
    /* animation: card-out 1s ease; */
}
.card-leave-to {
    transform: translateX(150%);
    /* transform: scale(0.3); */
    opacity: 0.3;
}
</style>
