<template>
    <div id="back-top"
         ref="backTop"
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
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        }
    },
    methods: {
        back() {
            let backTop = this.$refs.backTop;
            backTop.classList.add("backtop");
            var backTopTimer = window.setInterval(function() {
                var scrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                var speed = scrollTop / 4;
                if (scrollTop === 0) {
                    clearInterval(backTopTimer);
                } else {
                    document.documentElement.scrollTop -= speed;
                    document.body.scrollTop -= speed;
                }
            }, 10);
            // backTop.addEventListener("animationend", function() {
            //     backTop.classList.remove("backtop");
            // });
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
@media screen and (max-width: 480px) {
    #back-top {
        width: 70px !important;
        height: 70px !important;
        right: 20px !important;
        bottom: 40px !important;
    }
} /* 超小设备（手机，小于 480px） */
#back-top {
    z-index: 100;
    padding: 0;
    margin: 0;
    width: 100px;
    height: 100px;
    position: fixed;
    right: 50px;
    bottom: 100px;
    transition: all 0.8s ease;
    background: url(../../assets/images/backtop.png) no-repeat;
    background-size: 100% 100%;
}

.show {
    transform: translateX(0);
    opacity: 1;
    cursor: pointer;
}
.hidden {
    transform: translateX(200%);
    opacity: 0;
}

.backtop {
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
        transform: translateX(2px);
    }
    100% {
        transform: translateY(-1000px);
    }
}
</style>
