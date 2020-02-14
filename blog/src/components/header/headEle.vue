<template>
    <header :style="{height:height}">
        <div class="information"
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
        }
    }
};
</script>

<style scoped>
header {
    height: 100%;
    width: 100%;
    color: black;
    background: url(https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/bg/bg4.jpg)
        center center no-repeat;
    background-size: cover;
    z-index: -1;
    position: relative;
    margin-bottom: 50px;
    animation: show 1s 1;
    display: flex;
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
    transform: translateY(-20%);
    color: white;
    position: absolute;
    margin: 0 auto;
    text-shadow: 0 0 5px #c3c3c3;
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
