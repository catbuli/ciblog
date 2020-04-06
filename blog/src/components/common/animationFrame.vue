<template>
    <div ref="frame"
         :class="this.className">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "animationFrame",
    props: {
        className: {
            type: String,
            required: true
        }
    },
    methods: {
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var dom = this.$refs.frame;
            if (dom) {
                if (
                    scrollTop + document.body.clientHeight - 200 >=
                    dom.offsetTop
                ) {
                    dom.classList.add(this.className + "-show");
                }
            }
        }
    },
    mounted() {
        document.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        document.removeEventListener("scroll", this.handleScroll, true);
    }
};
</script>

<style lang="less" scoped>
div {
    width: 100%;
}
// 圆形扩散  从无到有
.circular-diffusion {
    visibility: hidden;
}
.circular-diffusion-show {
    visibility: visible !important;
    animation: circular-diffusion 1s ease;
    animation-fill-mode: forwards;
}
@keyframes circular-diffusion {
    0% {
        clip-path: circle(0% at 50% 50%);
    }
    100% {
        clip-path: circle(100% at 50% 50%);
    }
}

.fade-out-sway {
    opacity: 0;
    visibility: hidden;
}
.fade-out-sway-show {
    visibility: visible !important;
    animation: fade-out-sway-show 1.5s ease;
    animation-fill-mode: forwards;
}
@keyframes fade-out-sway-show {
    0% {
        opacity: 0;
        transform: scale(0.4) rotateZ(-2deg);
    }
    20% {
        transform: rotateZ(2deg);
    }
    40% {
        transform: rotateZ(-2deg);
    }
    60% {
        transform: rotateZ(2deg);
    }
    80% {
        transform: rotateZ(-2deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotateZ(0);
    }
}
// 从小到大 从无到有 左右晃动
</style>