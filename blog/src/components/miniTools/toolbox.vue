<template>
    <div id="toolbox"
         ref="toolbox"
         :class="[isShow?'':'hidden']">
        <!-- <div class="drag-bar"
             @mousedown="mousedown">
            <i class="el-icon-rank"></i>
        </div> -->
        <div class="head-portrait"
             @mousedown="mousedown">
            <img :src="personalData.imgurl"
                 title="双击进入归档页面"
                 @dblclick="jump"
                 alt />
        </div>
    </div>
</template>

<script>
export default {
    name: "toolbox",
    data() {
        return {
            isDrop: false,
            layerX: 0,
            layerY: 0,
            isShow: false,
            body: {},
            DOM: {},
            offsetWidth: 0
        };
    },
    computed: {
        personalData() {
            return this.$store.state.global.personalData;
        },
        header() {
            return this.$store.state.global.headerDOM
                ? this.$store.state.global.headerDOM
                : 800;
        },
        categoryList() {
            return this.$store.state.category.categoryList;
        },
        isShowLeftNav() {
            return this.$store.state.global.isShowLeftNav;
        }
    },
    watch: {
        "$store.state.global.isShowLeftNav"(newValue, oldValue) {
            if (!newValue) {
                this.offsetWidth = 0;
            } else {
                this.offsetWidth = this.$store.state.global.navDOM;
            }
        }
    },
    methods: {
        jump() {
            if (this.$route.fullPath != "/log") {
                this.$router.push({
                    path: `/log`
                });
            }
        },
        categoryJump(name, mid) {
            this.$router.push({
                path: `/search/category/${mid}`
            });
        },
        getCategoryList() {
            this.$store.dispatch("getCategoryListAction");
        },
        mousedown(e) {
            this.body = document.body;
            this.isDrop = true;
            this.layerX = e.layerX;
            this.layerY = e.layerY;
            // 博客↑
            document.addEventListener("mousemove", this.mousemove);
        },
        mousemove(e) {
            // console.log(body.offsetWidth);
            // console.log(toolbox.offsetLeft);
            // console.log(rightFlag);
            var x = e.clientX - this.layerX;
            var y = e.clientY - this.layerY;
            var rightLimit = this.body.offsetWidth - this.DOM.offsetWidth;
            var bottomLimit = this.body.offsetHeight - this.DOM.offsetHeight;
            if (!this.isDrop) return;
            if (x <= this.offsetWidth) {
                this.DOM.style.left = this.offsetWidth + "px";
            } else if (x >= rightLimit) {
                this.DOM.style.left = rightLimit + "px";
            } else {
                this.DOM.style.left = x + "px";
            }
            if (y <= 0) {
                this.DOM.style.top = 0 + "px";
            } else if (y >= bottomLimit) {
                this.DOM.style.top = bottomLimit + "px";
            } else {
                this.DOM.style.top = y + "px";
            }
        },
        mouseup() {
            this.isDrop = false;
            document.removeEventListener("mousemove", this.mousemove, true);
        },
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= this.header) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        }
    },
    mounted() {
        this.DOM = this.$refs.toolbox;
        this.getCategoryList();
        window.addEventListener("scroll", this.handleScroll, true);
        window.addEventListener("mouseup", this.mouseup, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
        window.removeEventListener("mouseup", this.mouseup, true);
    }
};
</script>

<style lang="less" scoped>
#toolbox {
    user-select: none;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: block;
    position: fixed;
    left: 20px;
    bottom: 20px;
    .head-portrait {
        cursor: pointer;
        user-select: none;
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        img {
            -webkit-user-drag: none;
            width: 100%;
            border-radius: 50%;
            transition: all 1s ease 0s;
        }
        img:hover {
            transform: rotate(360deg);
        }
    }
    // .drag-bar {
    //     opacity: 0;
    //     width: 100%;
    //     height: 30px;
    //     position: absolute;
    //     top: -30px;
    //     left: 0;
    //     text-align: center;
    //     background: #fff;
    //     box-shadow: 0 0 5px #ddd;
    //     cursor: move;
    //     color: #999;
    //     line-height: 30px;
    //     font-size: 20px;
    //     transition: opacity 0.3s;
    //     z-index: 70;
    // }
}
// #toolbox:hover .drag-bar {
//     opacity: 1;
// }
.hidden {
    // visibility: hidden !important;
    display: none !important;
}
</style>