<template>
    <div class="timeline"
         ref="timeline">
        <div class="timeline-item"
             v-for="month in data"
             :key="month.date">
            <a class="timeline-title"
               target="_blank"
               :href="`/search/${month.date.split('-')[0]}/${month.date.split('-')[1]}`">{{month.date|handleDate}}</a>
            <div class="timeline-content"
                 v-for="day in month.articleList"
                 :key="day.aid">
                <span class="timeline-time">{{day.create_date|handleDay}}</span>
                <a class="timeline-link"
                   target="_blank"
                   :href="`/article/${day.aid}`">{{day.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "timeLine",
    data() {
        return {
            height: 110
        };
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    filters: {
        handleDay(value) {
            return value.split(" ")[0].split("-")[2] + " 日";
        },
        handleDate(value) {
            return value.split("-")[0] + " 年 " + value.split("-")[1] + " 月";
        }
    },
    computed: {},
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
    },
    methods: {
        handleScroll(e) {
            var scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            var scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;
            if (scrollHeight < 20 + scrollTop + windowHeight) {
                this.$refs.timeline.classList.add = "open";
                this.$refs.timeline.style.maxHeight = this.height + "px";
                this.height += 50;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.timeline {
    text-align: left;
    position: relative;
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.8s;
    .timeline-item {
        .timeline-title {
            display: inline-block;
            padding: 5px 20px;
            background: #6f6f6f;
            border-radius: 20px;
            color: white;
        }
        .timeline-title:hover {
            color: white !important;
        }
        .timeline-content {
            padding-left: 90px;
            margin: 15px 15px;
            .timeline-time {
                position: absolute;
                left: 18px;
                width: 40px;
            }
            .timeline-time::after {
                content: " ";
                position: absolute;
                width: 20px;
                height: 20px;
                background-color: #8a8a8a;
                border-radius: 20px;
                right: -27px;
                top: 1px;
            }
            .timeline-link {
                position: relative;
                line-height: 20px;
            }
            .timeline-link::before {
                content: " ";
                top: 5px;
                left: -36px;
                position: absolute;
                width: 12px;
                height: 12px;
                background-color: white;
                border-radius: 12px;
                transition: all 0.5s ease;
            }
            .timeline-link:hover::before {
                background-color: rgb(44, 44, 44);
            }
            .timeline-link::after {
                content: "";
                display: block;
                width: 0;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: -5px;
                background: #6f6f6f;
                transition: all 0.5s ease-in-out;
            }
            .timeline-link:hover::after {
                width: 100%;
            }
        }
    }
    .timeline-item::before {
        z-index: -1;
        content: "";
        position: absolute;
        width: 4px;
        left: 73px;
        top: 10px;
        height: 100%;
        background-color: #dcdcdc;
    }
}
.open {
    max-height: 110px;
}
</style>
