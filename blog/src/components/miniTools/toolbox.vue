<template>
    <div id="toolbox"
         ref="toolbox"
         :class="[isShow?'':'hidden']"
         @mouseup="mouseup">
        <div class="drag-bar"
             @mousedown="mousedown"><i class="el-icon-rank"></i></div>
        <router-link to="/">返回首页</router-link>
        <p @click="$router.back()">返回</p>
        <p @click="$router.back(1)">前进</p>
        <ul class="category-list">
            <li v-for="category in categoryList"
                @click="categoryJump(category.name,category.mid)"
                :key="category.mid">{{category.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "toolbox",
    data() {
        return {
            isDrop: false,
            offsetX: 0,
            offsetX: 0,
            isShow: false,
            body: {},
            DOM: {}
        };
    },
    computed: {
        header() {
            return this.$store.state.global.headerDOM
                ? this.$store.state.global.headerDOM
                : 800;
        },
        categoryList() {
            return this.$store.state.category.categoryList;
        }
    },
    methods: {
        categoryJump(name, mid) {
            this.$router.push({
                path: "/search",
                query: {
                    typeName: "category",
                    type: name,
                    mid: mid
                }
            });
        },
        getCategoryList() {
            this.$store.dispatch("getCategoryListAction");
        },
        mousedown(e) {
            console.log(e.currentTarget === e.target);
            console.log(e);
            this.DOM = this.$refs.toolbox;
            this.body = document.body;
            this.isDrop = true;
            this.offsetX = e.layerX;
            this.offsetY = e.layerY;
            document.addEventListener("mousemove", this.mousemove);
        },
        mousemove(e) {
            // console.log(body.offsetWidth);
            // console.log(toolbox.offsetLeft);
            // console.log(rightFlag);
            var x = e.clientX - this.offsetX;
            var y = e.clientY - this.offsetY;
            var rightLimit = this.body.offsetWidth - this.DOM.offsetWidth;
            var bottomLimit = this.body.offsetHeight - this.DOM.offsetHeight;
            if (!this.isDrop) return;
            if (x <= 0) {
                this.DOM.style.left = 0 + "px";
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
        this.getCategoryList();
        window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
    }
};
</script>

<style lang="less" scoped>
#toolbox {
    user-select: none;
    z-index: 100;
    background-color: #353535;
    border-radius: 10px;
    box-shadow: 3px 3px 3px rgb(138, 138, 138);
    width: 100px;
    height: 150px;
    display: block;
    position: fixed;
    left: 300px;
    bottom: 150px;
    .drag-bar {
        opacity: 1;
        width: 100%;
        height: 30px;
        // position: absolute;
        top: -30px;
        left: 0;
        text-align: center;
        background: #fff;
        box-shadow: 0 0 5px #ddd;
        cursor: move;
        color: #999;
        line-height: 30px;
        font-size: 20px;
        transition: opacity 0.3s;
        z-index: 70;
    }
    .category-list {
        color: white;
        cursor: pointer;
    }
}
.hidden {
    display: none !important;
}
</style>