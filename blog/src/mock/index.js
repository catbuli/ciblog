import Mock from 'mockjs'
import Vue from 'vue'

Vue.use(Mock)


const data = [];

for (var i = 0; i < 10; i++) {
    var item = {
        "id": i,
        "name": "@cname",
        "date": "@date(yyyy-MM-dd)",
        "title": "@title",
        "image": "@image(700x325)",
        "content": "@cparagraph",
        "category": "搞笑分类",
        "comment": "@integer(10, 30)",
        "articlePV": "@integer(10, 1000)"
    }
    data.push(item)
}

const intro = {
    "name": "猫不理的锅包肉",
    "email": "15204944127@163.com",
    "bilibili": "https://space.bilibili.com/4568935",
    "github": "https://github.com/zhangyifei233",
    "imgURL": "https://xiaochengxuimg.oss-cn-beijing.aliyuncs.com/Blog/oh.jpg"
}

Mock.mock('/api/test', 'post', data);
Mock.mock('/api/intro', 'post', intro);

export default Mock;