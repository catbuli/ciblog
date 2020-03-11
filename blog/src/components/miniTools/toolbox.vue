<template>
    <div id="toolbox"
         ref="toolbox"
         :class="[isShow?'':'hidden']"
         @mousedown="mousedown"
         @mouseup="mouseup">
        <router-link to="/">返回首页</router-link>
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
            isShow: false
        };
    },
    computed: {
        header() {
            return this.$store.state.global.headerDOM
                ? this.$store.state.global.headerDOM
                : 800;
        }
    },
    methods: {
        mousedown(e) {
            var toolbox = this.$refs.toolbox;
            this.isDrop = true;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            document.addEventListener("mousemove", this.mousemove, true);
        },
        mousemove(e) {
            var toolbox = this.$refs.toolbox;
            var x = e.clientX - this.offsetX;
            var y = e.clientY - this.offsetY;
            if (!this.isDrop) {
                return;
            }
            toolbox.style.left = x + "px";
            toolbox.style.top = y + "px";
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
        window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
    }
};
</script>

<style lang="less" scoped>
#toolbox {
    z-index: 100;
    background-color: #353535;
    border-radius: 10px;
    box-shadow: 3px 3px 3px rgb(138, 138, 138);
    width: 100px;
    height: 150px;
    display: inline-block;
    position: fixed;
    left: 300px;
    bottom: 150px;
}
.hidden {
    display: none !important;
}
</style>