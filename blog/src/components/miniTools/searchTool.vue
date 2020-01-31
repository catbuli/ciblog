<template>
    <div id="search-tool">
        <div class="open"
             @click="handleSearchView">
            <i class="el-icon-search"></i>
        </div>
        <div id="search-view"
             :class="classObj"
             @touchmove.prevent
             @mousewheel.prevent>
            <div class="search-bar">
                <form action=""
                      method="get">
                    <input id="search-input"
                           type="text"
                           placeholder="想要搜什么!">
                    <button id="search-button"
                            @click="search"></button>
                </form>
            </div>
            <div class="close"
                 @click="handleSearchView"><i class="iconfont iconclose-circle"></i></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "searchTool",
    data() {
        return {
            input: "",
            isShow: false,
            classObj: {
                inint_class: true,
                show: false,
                hidden: false
            }
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
    },
    watch: {
        isShow() {
            if (this.isShow) {
                this.classObj = {
                    inint_class: true,
                    show: true,
                    hidden: false
                };
            } else {
                this.classObj = {
                    inint_class: true,
                    show: false,
                    hidden: true
                };
            }
        }
    },
    methods: {
        handleSearchView() {
            this.isShow = !this.isShow;
        },
        handleScroll(e) {
            this.isShow = false;
        },
        search() {}
    }
};
</script>

<style scoped>
#search-tool {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 15%;
    background-color: rgb(255, 255, 255);
}
#search-tool i {
    font-size: 35px;
    line-height: 60px;
}
#search-view {
    width: 100%;
    height: 100%;
    position: fixed;
    background: white;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 101;
}

.inint_class {
    opacity: 0;
    visibility: hidden;
    z-index: 0;
}

.show {
    animation: show 1s;
    opacity: 1;
    visibility: visible;
}
@keyframes show {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
.hidden {
    animation: hidden 1s;
    opacity: 0;
    visibility: hidden;
}
@keyframes hidden {
    0% {
        opacity: 1;
        transform: scale(1);
        visibility: visible;
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
.search-bar {
    /* height: 100px; */
    width: 50%;
    top: 50%;
    position: relative;
    margin: 0 auto;
    transform: translateY(-50%);
}
#search-input {
    line-height: 64px;
    font-size: 32px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 4px 0 #939090;
    height: 80px;
    width: 420px;
    text-align: center;
    /* font-weight: bold; */
    outline: none;
    border: none;
    vertical-align: top;
}
#search-button {
    height: 80px;
    width: 80px;
    background: url("../../assets/images/search.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: top;
    cursor: pointer;
    margin-left: 20px;
}

.close {
    cursor: pointer;
    position: fixed;
    right: 0px;
    top: 0px;
    width: 60px;
    height: 60px;
}
.open {
    cursor: pointer;
}

/* #search-tool a {
    color: rgb(0, 0, 0);
} */
</style>