<template>
    <div id="back-top"
         @click="back"
         :class="[isShow ? 'show' : 'hidden']">
    </div>
</template>

<script>
export default {
    name: "backTop",
    data() {
        return {
            isShow: false
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
    },
    methods: {
        back() {
            var backTopEl = document.getElementById("back-top");
            backTopEl.classList.add("hidden-animation");
            var backTopTimer = setInterval(function() {
                var scrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                var speed = scrollTop / 6;
                if (document.documentElement.scrollTop === 0) {
                    clearInterval(backTopTimer);
                } else {
                    document.documentElement.scrollTop -= speed;
                }
            }, 10);
            var showAnimationTimer = setTimeout(function() {
                backTopEl.classList.remove("hidden-animation");
            }, 1500);
        },
        handleScroll(e) {
            // var backTopEl = document.getElementById('back-top');
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 400) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        }
    }
};
</script>

<style scoped>
#back-top {
    padding: 0;
    margin: 0;
    width: 100px;
    height: 100px;
    position: fixed;
    right: 50px;
    bottom: 100px;
    transition: all 0.8s ease;
    background: url(../../assets/images/backtop.png) no-repeat;
    background-size: 100px 100px;
}

.show {
    opacity: 1;
    cursor: pointer;
}
.hidden {
    opacity: 0;
    cursor: Default;
}

.hidden-animation {
    animation: backtop 0.5s 1;
}

@keyframes backtop {
    0% {
        opacity: 1;
        transform: translateX(-2px);
    }
    10% {
        transform: translateX(2px);
    }
    20% {
        transform: translateX(-2px);
    }
    30% {
        transform: translateX(2px);
    }
    40% {
        transform: translateX(-2px);
    }
    50% {
        opacity: 1;
        transform: translateX(2px);
    }
    100% {
        opacity: 0;
        transform: translateY(-1000px);
    }
}
</style>
