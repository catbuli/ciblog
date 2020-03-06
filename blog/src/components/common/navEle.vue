<template>
    <nav id="nav"
         :class="[$store.state.global.isShowLeftNav ? 'show-nav' : 'hidden-nav']">
        <svg @click="$store.commit('handleLeftNav', !$store.state.global.isShowLeftNav);"
             id="button-nav"
             class="button-nav ham hamRotate180 ham5"
             viewBox="0 0 100 100"
             width="80">
            <path class="line top"
                  d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429" />
            <path class="line middle"
                  d="m 70,50 h -40" />
            <path class="line bottom"
                  d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429" />
        </svg>
        <div class="intro">
            <div class="head-portrait">
                <router-link to="/">
                    <img :src="personalData.imgurl"
                         alt />
                </router-link>
                <p class="nickname">{{personalData.nickname}}</p>
                <p class="description">{{personalData.description}}</p>
            </div>
            <div class="count">
                <ul>
                    <li>
                        <p v-html="countList.articleCount"></p>
                        <p>文章</p>
                    </li>
                    <li>
                        <p v-html="countList.categoryCount"></p>
                        <p>分类</p>
                    </li>
                    <li>
                        <p v-html="countList.tagCount"></p>
                        <p>标签</p>
                    </li>
                </ul>
            </div>
            <div class="platform">
                <ul>
                    <li>
                        <a :href="personalData.github"
                           target="_blank">github+</a>
                    </li>
                    <li>
                        <a target="_blank"
                           :href="personalData.bilibili">bilibili+</a>
                    </li>
                    <li>
                        <a :href="'mailto:'+personalData.mail">email+</a>
                    </li>
                </ul>
            </div>
            <div class="search">
                <searchTool></searchTool>
            </div>
            <div class="new">
                <ul>
                    <a v-for="item in articleList"
                       :key="item.aid"
                       @click="$router.push('/article/'+item.aid)">
                        <li>{{item.title}}<span>{{item.create_date.split(' ')[0].split('-')[1]+'-'+item.create_date.split(' ')[0].split('-')[2]}}</span></li>
                    </a>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Axios from "axios";
import searchTool from "@/components/miniTools/searchTool.vue";
export default {
    name: "navEle",
    data() {
        return {
            name: String,
            imgURL: String,
            bilibili: String,
            github: String,
            email: String,
            paging: {
                pageSize: 10,
                currentPage: 1,
                type: -1,
                typeName: "all",
                total: 0
            },
            articleList: this.$store.state.article.articleList
        };
    },
    components: {
        searchTool
    },
    mounted() {
        window.addEventListener("mousemove", this.handleMouse, true);
        window.addEventListener("scroll", this.handleScroll, true);
    },
    watch: {
        "$store.state.global.isShowLeftNav": function() {
            var backTopEl = document.getElementById("button-nav");
            backTopEl.classList.toggle("active");
        }
    },
    computed: {
        personalData() {
            return this.$store.state.global.personalData;
        },
        countList() {
            return this.$store.state.global.countList;
        },
        system() {
            return this.$store.state.global.system;
        }
    },
    methods: {
        handleMouse(e) {
            if (
                e.clientX <= 5 &&
                this.$store.state.global.isShowLeftNav == false
            ) {
                this.$store.commit("handleLeftNav", true);
            }
        },
        handleScroll(e) {
            // var backTopEl = document.getElementById('back-top');
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 400) {
                this.$store.commit("handleLeftNav", false);
            }
            // else if (scrollTop === 0) {
            //     this.$store.commit("handleLeftNav", true);
            // }
        },
        getArticleList() {
            this.$post("/articlec", { paging: this.paging }, data => {
                this.articleList = data.data;
            });
        }
    },
    created() {
        this.getArticleList();
        this.$store.dispatch("getCountAction");
        this.$store.dispatch("getSystemAciton");
        this.$store.dispatch("getPersonalDataAction");
    },
    destroyed() {
        window.removeEventListener("mousemove", this.handleMouse, true);
        window.removeEventListener("scroll", this.handleScroll, true);
    }
};
</script>

<style scoped>
/* 侧边栏 */
#nav {
    /* overflow: hidden; */
    padding: 0px;
    min-width: 250px;
    height: 100%;
    width: 17%;
    position: fixed;
    z-index: 50;
    background-color: rgb(53, 53, 53);
    /* background: -webkit-linear-gradient(
        145deg,
        #fc354c,
        #0abfbc
    );  */
    /* Chrome 10-25, Safari 5.1-6 */
    /* background: linear-gradient(
        145deg,
        #fc354c,
        #0abfbc
    );  */
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

/* 汉堡包动画 */
.ham {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #fc354c;
    stroke-width: 5.5;
    stroke-linecap: round;
}

.hamRotate180.active {
    transform: rotate(180deg);
}

.ham5 .top {
    stroke-dasharray: 40 82;
}

.ham5 .bottom {
    stroke-dasharray: 40 82;
}

.ham5.active .top {
    stroke-dasharray: 14 82;
    stroke-dashoffset: -72px;
}

.ham5.active .bottom {
    stroke-dasharray: 14 82;
    stroke-dashoffset: -72px;
}

.button-nav {
    width: 70px;
    height: 70px;
    position: absolute;
    left: 100%;
}

/* 信息栏 */
.intro {
    width: 100%;
    margin-top: 100px;
}

.intro a {
    display: inline-block;
    text-decoration: none;
    color: white;
}

.intro p {
    font-size: 18px;
}

/* .head-portrait {
    position: relative;
    top: 30%;
} */
.head-portrait .nickname {
    margin-top: 10px;
    color: rgb(255, 255, 255);
}
.head-portrait .description {
    margin-top: 10px;
    padding: 10px;
    font-size: 0.8rem;
    color: rgb(180, 180, 180);
}
.head-portrait img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: all 1s ease 0s;
}

.head-portrait img:hover {
    transform: rotate(360deg);
}
/* 统计数据 */
.count {
    color: rgb(204, 204, 204);
    width: 70%;
    margin: 30px auto 0;
}

.count ul {
    display: flex;
}
.count ul li {
    font-size: 1rem;
    flex: 1;
}
.count ul li + li {
    border-left: 1px rgb(112, 112, 112) solid;
}

/* 平台 */
.platform {
    color: rgb(204, 204, 204);
    width: 80%;
    margin: 30px auto 0;
}
.platform a {
    border: 1px rgb(87, 87, 87) solid;
    border-radius: 5px;
    padding: 5px;
    font-size: 0.9rem;
}
.platform ul {
    display: flex;
}
.platform ul li {
    flex: 1;
}

/* 最新 */
.new {
    margin: 20px auto 0;
    width: 75%;
}
.new ul a {
    display: block;
    margin-top: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    color: white;
    text-align: left;
}
.new ul a span {
    float: right;
    font-size: 0.8rem;
    color: white;
}

/* 搜索 */
.search {
}
.hidden-nav {
    /* animation: hidden-nav ease 0.5s; */
    transform: translateX(-101%);
    transition: all ease-in 0.5s;
}
.show-nav {
    /* animation: show-nav ease 0.5s; */
    transition: all ease 0.5s;
}

@keyframes show-nav {
    0% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    70% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    100% {
        border-radius: 0;
        /* opacity: 1; */
    }
}
@keyframes hidden-nav {
    0% {
        /* border-radius: 0; */
        /* opacity: 1; */
    }
    100% {
        /* border-radius: 0 100% 100% 0; */
        /* opacity: 0; */
    }
}
</style>
