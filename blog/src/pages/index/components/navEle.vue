<template>
    <nav id="nav"
         ref="nav"
         :style="{'width':style.navWidth}"
         :class="[$store.state.global.isShowLeftNav ? 'show-nav' : 'hidden-nav']">
        <svg @click="$store.commit('handleLeftNav', !$store.state.global.isShowLeftNav);"
             id="button-nav"
             :style="style.navButton"
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
                         :style="style.navAvatar"
                         alt />
                </router-link>
                <p class="nickname">{{personalData.nickname}}</p>
                <p class="description">{{personalData.description}}</p>
            </div>
            <div class="count"
                 v-if="style.isPC">
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
            <div class="platform"
                 v-if="style.isPC">
                <ul>
                    <li>
                        <a :href="personalData.github"
                           target="_blank">
                            <img src="@/assets/images/github.png"
                                 alt="github">
                        </a>
                    </li>
                    <li>
                        <a target="_blank"
                           :href="personalData.bilibili">
                            <img src="@/assets/images/bilibili.png"
                                 alt="bilibili">
                        </a>
                    </li>
                    <li>
                        <a :href="'mailto:'+personalData.mail">
                            <img src="@/assets/images/mail.png"
                                 alt="mail">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="search">
                <searchTool></searchTool>
            </div>
            <div v-if="!style.isPC"
                 class="nav-configuration">
                <ul>
                    <li v-for="(item, index) in navList"
                        :key="index">
                        <a v-if="item.href"
                           :href="item.href">{{item.text}}</a>
                        <router-link v-else
                                     :to="item.linkto">{{item.text}}</router-link>
                        <ul v-if="item.sub">
                            <li v-for="(sub, subindex) in item.sub"
                                :key="subindex">
                                <a v-if="sub.href"
                                   :href="sub.href">{{sub.text}}</a>
                                <router-link v-else
                                             :to="sub.linkto">{{sub.text}}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="recommendation"
                 v-if="style.isPC">
                <div class="title">
                    <p>Hot</p>
                </div>
                <ul>
                    <a v-for="item in hotList"
                       :key="item.aid"
                       @click="$router.push('/article/'+item.aid)">
                        <li>
                            <p>{{item.title}}</p>
                            <span>{{item.create_date|handleDate}}</span>
                        </li>
                    </a>
                </ul>
            </div>
            <div class="recommendation"
                 v-if="style.isPC">
                <div class="title">
                    <p>New</p>
                </div>
                <ul>
                    <a v-for="item in newList"
                       :key="item.aid"
                       @click="$router.push('/article/'+item.aid)">
                        <li>
                            <p>{{item.title}}</p>
                            <span>{{item.create_date|handleDate}}</span>
                        </li>
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
                pageSize: 5,
                currentPage: 1,
                type: 0,
                typeName: "hot",
                total: 0
            },
            hotList: [],
            newList: []
        };
    },
    components: {
        searchTool
    },
    mounted() {
        this.getDOM();
        window.addEventListener("mousemove", this.handleMouse, true);
        window.addEventListener("scroll", this.handleScroll, true);
    },
    watch: {
        "$store.state.global.isShowLeftNav": function() {
            var backTopEl = document.getElementById("button-nav");
            backTopEl.classList.toggle("active");
        }
    },
    filters: {
        handleDate(value) {
            return (
                value.split(" ")[0].split("-")[1] +
                "-" +
                value.split(" ")[0].split("-")[2]
            );
        }
    },
    computed: {
        style() {
            return this.$store.getters.globalStyle;
        },
        personalData() {
            return this.$store.state.global.personalData;
        },
        countList() {
            return this.$store.state.global.countList;
        },
        system() {
            return this.$store.state.global.system;
        },
        navList() {
            let list = [];
            if (this.$store.state.global.system.nav_configuration) {
                list =
                    "[" +
                    this.$store.state.global.system.nav_configuration +
                    "]";
                list = JSON.parse(list);
            }
            return list;
        }
    },
    methods: {
        getDOM() {
            this.$store.commit("setNavDOM", this.$refs.nav.offsetWidth);
        },
        handleMouse(e) {
            if (
                e.clientX <= 5 &&
                this.$store.state.global.isShowLeftNav == false
            ) {
                this.$store.commit("handleLeftNav", true);
            }
        },
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 400) {
                this.$store.commit("handleLeftNav", false);
            }
        },
        getHotList() {
            let copy = JSON.parse(JSON.stringify(this.paging));
            copy.typeName = "hot";
            this.$post("/articlec", { paging: copy }, data => {
                this.hotList = data.data;
            });
        },
        getNewList() {
            let copy = JSON.parse(JSON.stringify(this.paging));
            copy.typeName = "all";
            this.$post("/articlec", { paging: copy }, data => {
                this.newList = data.data;
            });
        }
        // 博客↑
    },
    created() {
        this.getHotList();
        this.getNewList();
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

<style lang="less" scoped>
/* 侧边栏 */
#nav {
    padding: 0px;
    height: 100%;
    width: 17%;
    position: fixed;
    z-index: 50;
    background-color: rgb(53, 53, 53);
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
    margin-top: 80px;
    a {
        display: inline-block;
        text-decoration: none;
        color: white;
    }
    // p {
    //     font-size: 18px;
    // }
}

//头像以及个人信息
.head-portrait {
    .nickname {
        margin-top: 10px;
        font-size: 1.6rem;
        color: rgb(255, 255, 255);
    }
    .description {
        margin-top: 10px;
        padding: 10px;
        font-size: 1rem;
        color: rgb(180, 180, 180);
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        transition: all 1s ease 0s;
    }
    img:hover {
        transform: rotate(360deg);
    }
}
@media screen and (max-width: 960px) {
    .nickname {
        font-size: 3.2rem !important;
    }
    .description {
        font-size: 2rem !important;
    }
} /* 超小设备（手机，小于 480px） */

//移动端导航栏列表
.nav-configuration {
    color: white;
    > ul {
        width: 70%;
        margin: 30px auto 0;
        > li {
            text-align: left;
            margin-bottom: 15px;
        }
        li li {
            margin-top: 15px;
            padding-left: 60px;
        }
    }
    a {
        display: inline-block;
        font-size: 3rem;
    }
}
/* 统计数据 */
.count {
    color: rgb(204, 204, 204);
    width: 70%;
    margin: 30px auto 0;
    ul {
        display: flex;
    }
    ul li {
        font-size: 1rem;
        flex: 1;
    }
    ul li + li {
        border-left: 1px rgb(112, 112, 112) solid;
    }
}

/* 平台 */
.platform {
    color: rgb(204, 204, 204);
    width: 80%;
    margin: 20px auto 0;
    a {
        // border: 1px rgb(87, 87, 87) solid;
        border-radius: 5px;
        padding: 5px;
        font-size: 0.9rem;
        height: 40px;
        width: 40px;
    }
    ul {
        display: flex;
        li {
            flex: 1;
            img {
                height: 100%;
                width: 100%;
            }
        }
        li:nth-of-type(3) {
            img {
                height: 80%;
                transform: translateY(20%);
            }
        }
    }
}

/* 最新 */
.recommendation {
    margin: 20px auto 0;
    width: 75%;
    .title {
        color: white;
        position: relative;
        z-index: 10;
        p {
            color: white;
            display: inline-block;
            background-color: rgb(53, 53, 53);
            padding: 0 10px;
        }
    }
    .title:after {
        content: "";
        display: block;
        border-bottom: solid 1px white;
        width: 100%;
        position: absolute;
        top: 12px;
        z-index: -1;
    }
    ul li p {
        width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }
    ul a {
        cursor: pointer;
        display: block;
        margin-top: 5px;
        font-size: 0.8rem;
        color: white;
        text-align: left;
        span {
            float: right;
            font-size: 0.8rem;
            color: white;
        }
    }
}

/* 搜索 */
// .search {
// }
.hidden-nav {
    transition: all ease 0.5s;
    // animation: hidden-nav ease 0.5s;
    transform: translateX(-101%);
}
.show-nav {
    transition: all ease 0.5s;
    // transition: all ease 0.5s;
    // animation: show-nav ease 0.5s;
}

// @keyframes show-nav {
//     0% {
//         border-radius: 0 100% 100% 0/0 50% 50% 0;
//     }
//     70% {
//         border-radius: 0 100% 100% 0/0 50% 50% 0;
//     }
//     100% {
//         border-radius: 0;
//         opacity: 1;
//     }
// }
// @keyframes hidden-nav {
//     0% {
//         border-radius: 0;
//         opacity: 1;
//     }
//     100% {
//         border-radius: 0 100% 100% 0;
//         opacity: 0;
//     }
// }
</style>
