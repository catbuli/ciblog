<template>
    <header :style="{height:height,backgroundImage:backgroundImage}">
        <div class="information one"
             ref="original"
             v-if="isShowInfo">
            <h1 class="name-info"
                v-html="$store.state.global.personalData.nickname"></h1>
            <h2 class="description-info"
                v-html="$store.state.global.personalData.description"></h2>
        </div>
        <div class="information two"
             ref="copy"
             v-if="isShowInfo">
            <h1 class="name-info"
                v-html="$store.state.global.personalData.nickname"></h1>
            <h2 class="description-info"
                v-html="$store.state.global.personalData.description"></h2>
        </div>
    </header>
</template>

<script>
export default {
    name: "headEle",
    props: {
        height: {
            type: String,
            default: "100%"
        },
        isShowInfo: {
            type: Boolean,
            default: true
        },
        backgroundImage: {
            type: String,
            default:
                "url('https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/bg/bg4.jpg')"
        }
    },
    methods: {
        handleAnimation() {
            if (this.isShowInfo) {
                var original = this.$refs.original;
                var copy = this.$refs.copy;
                original.addEventListener("animationend", function() {
                    original.classList.remove("one");
                });
                copy.addEventListener("animationend", function() {
                    copy.remove();
                });
                // 博客↑
            } else {
                return;
            }
        }
    },
    computed: {},
    mounted() {
        console.log(this.backgroundImage);
        this.handleAnimation();
    }
};
</script>

<style scoped>
header {
    height: 100%;
    width: 100%;
    color: black;
    background-size: cover;
    z-index: -1;
    position: relative;
    margin-bottom: 50px;
    animation: show 1s 1;
    display: flex;
    background-position: center center;
    background-repeat: no-repeat;
    justify-content: center; /* 水平居中 */
    align-items: center;
}
/* 页头动画 */
@keyframes show {
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
}
/* 信息显示 */
.information {
    top: 35%;
    color: white;
    position: absolute;
    margin: 0 auto;
    text-shadow: 0 0 5px #c3c3c3;
}
.one {
    clip-path: polygon(0 0, 75% 0, 25% 100%, 0% 100%);
    transform: translateX(-200%) translateY(100%);
    animation: information 1s ease 1s 1;
    animation-fill-mode: forwards;
    z-index: 10;
}
.two {
    clip-path: polygon(100% 0, 75% 0, 25% 100%, 100% 100%);
    transform: translateX(200%) translateY(-100%);
    animation: information2 1s ease 1s 1;
    animation-fill-mode: forwards;
    z-index: 5;
}
@keyframes information {
    0% {
        transform: translateX(-200%) translateY(100%);
    }
    100% {
        transform: translateX(0) translateY(0);
    }
}
@keyframes information2 {
    0% {
        transform: translateX(200%) translateY(-100%);
    }
    100% {
        transform: translateX(0) translateY(0);
    }
}
.name-info {
    font-weight: 300;
    margin: 10px 0;
    font-size: 5rem;
}
.description-info {
    margin: 10px 0;
    font-size: 1.5rem;
}
</style>
