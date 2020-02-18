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
                <a href="/">
                    <img :src="this.$store.state.global.personalData.imgurl"
                         alt />
                    <p>{{this.$store.state.global.personalData.nickname}}</p>
                    <p>个人博客</p>
                </a>
            </div>
            <!-- <a :href="github"
               target="_blank"><img src='../../assets/images/icongithub.png'
                     alt=""></a>
            <a :href="bilibili"
               target="_blank"><img src='../../assets/images/iconbilibili.png'
                     alt=""></a>
            <a :href="email"
               target="_blank"><img src='../../assets/images/iconemail.png'
                     alt=""> </a> -->
        </div>
        <toolContainer :isShowSearch="true"
                       :isShowMouse="true"></toolContainer>
        <!-- <menuEle></menuEle> -->
    </nav>
</template>

<script>
import Axios from "axios";
import menuEle from "@/components/menu/menuEle.vue";
import toolContainer from "@/components/miniTools/toolContainer.vue";
export default {
    name: "navEle",
    data() {
        return {
            name: String,
            imgURL: String,
            bilibili: String,
            github: String,
            email: String
        };
    },
    components: {
        menuEle,
        toolContainer
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
        }
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
    min-width: 200px;
    height: 100%;
    width: 15%;
    position: fixed;
    z-index: 50;
    background: -webkit-linear-gradient(
        145deg,
        #fc354c,
        #0abfbc
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        145deg,
        #fc354c,
        #0abfbc
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

.intro {
    width: 100%;
    height: 50%;
}

.intro a {
    display: inline-block;
    text-decoration: none;
    color: white;
    font-size: 22px;
}

.intro p {
    font-size: 18px;
}

.head-portrait {
    position: relative;
    top: 25%;
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

.hidden-nav {
    animation: hidden-nav ease 0.5s;
    transform: translateX(-101%);
    transition: all ease-in-out 0.5s;
}
.show-nav {
    animation: show-nav ease 0.5s;
    transition: all ease 0.5s;
}
@keyframes show-nav {
    0% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    70% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    /* 65% {
        border-radius: 0 94% 94% 0/0 47% 47% 0;
    }
    70% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    75% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    80% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    85% {
        border-radius: 0 100% 100% 0/0 50% 50% 0;
    }
    90% {
    }
    95% {
    } */
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
    /* 10% {}
    20% {}
    30% {}
    40% {}
    50% {}
    60% {}
    70% {}
    80% {}
    90% {} */
    100% {
        /* border-radius: 0 100% 100% 0; */
        /* opacity: 0; */
    }
}
</style>
