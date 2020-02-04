<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;
use app\client\model\ArticleMeta;

class Article extends Model
{
    public function getArticleList()
    {
        return Article::all();
    }
    public static function getCount()
    {
        return count(Article::all());
    }
    public function getArticleById($aid)
    {
        return Article::get($aid);
    }
    public function getArticleMeta($aid, $type)
    {
        return ArticleMeta::all(['aid' => $aid, 'type' => $type]);
    }
    public function editArticle()
    {
        return $this->save();
    }
    public function addArticle()
    {
        return $this->save();
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