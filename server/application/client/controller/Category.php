<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Meta;
use app\client\model\ArticleMeta;
use think\Exception;

class Category extends Controller
{
    public function index()
    {
        $meta = new Meta();
        return $meta->getCategoryList();
    }
    public function add($name, $description)
    {
        $meta = new Meta();
        $meta->data([
            'name'  =>  $name,
            'description' =>  $description,
            'type' => 'category'
        ]);
        return $meta->addCategory();
    }
    public function del($mid)
    {
        $meta = new Meta();
        return $meta->delCategory($mid);
    }
    public function byid($aid)
    {
        try {
            $list = ArticleMeta::getMetaByArticle($aid, "category", true);
            $message = json([
                'code' => "200",
                'message' => "文章信息获取成功",
                'data' => $list
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