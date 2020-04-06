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
.circular-diffusion {
    visibility: hidden;
}
.circular-diffusion-show {
    visibility: visible !important;
    animation: add-comment-show 1s ease;
    animation-fill-mode: forwards;
}
@keyframes add-comment-show {
    0% {
        clip-path: circle(0% at 50% 50%);
    }
    100% {
        clip-path: circle(100% at 50% 50%);
    }
}
</style>