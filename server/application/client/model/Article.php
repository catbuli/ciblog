<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Article extends Model
{
    public function getArticleList()
    {
        return json(Article::all());
    }
    public function addArticle()
    {
        $message = json([
            'code' => "200",
            'message' => "文章发布成功！"
        ]);
        try {
            $this->save();
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }

    public function delArticle($aid)
    {
        $message = json([
            'code' => "200",
            'message' => "文章删除成功！",
        ]);
        try {
            Article::destroy($aid);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
}