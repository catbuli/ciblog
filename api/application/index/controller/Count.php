<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\Article;
use app\index\model\Meta;
use app\index\model\Comment;
use think\Exception;
use app\common\Response;

class Count extends Controller
{
    /**
     * 控制器默认方法 获取评论列表
     *
     * @return json
     */
    public function index()
    {
        try {
            return Response::result(201, "成功", "数据获取成功!", [
                'articleCount' => Article::getCount(),
                'categoryCount' => Meta::getCategoryCount(),
                'commentCount' => Comment::getCount(),
            ]);
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
}
