<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Article;
use app\client\model\Meta;
use app\client\model\Comment;
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