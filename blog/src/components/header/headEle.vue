<template>
    <div id="head"
         :style="{height:height}"></div>
</template>

<script>
export default {
    name: "headEle",
    props: {
        height: {
            type: String,
            default: "100%"
        }
    }
};
</script>

<style scoped>
#head {
    height: 100%;
    width: 100%;
    color: black;
    background: url(https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/bg/bg4.jpg)
        center center no-repeat;
    background-size: cover;
    z-index: -1;
    position: relative;
    margin-bottom: 50px;
}
</style>
