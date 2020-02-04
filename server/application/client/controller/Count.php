<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Article;
use app\client\model\Meta;
use app\client\model\Comment;
use think\Exception;

class Count extends Controller
{
    public function index()
    {
        try {
            $message = json([
                'code' => "200",
                'message' => "信息获取成功",
                'data' => [
                    'articleCount' => Article::getCount(),
                    'categoryCount' => Meta::getCategoryCount(),
                    'commentCount' => Comment::getCount(),
                ]
            ]);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
}