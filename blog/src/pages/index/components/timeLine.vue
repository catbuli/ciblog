<template>
    <div class="timeline">
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
    methods: {},
    mounted() {}
};
</script>

<style lang="less" scoped>
.timeline {
    text-align: left;
    position: relative;
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
            margin: 10px 15px;
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
</style>
