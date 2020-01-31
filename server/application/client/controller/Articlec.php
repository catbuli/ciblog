<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Article;
use think\Exception;

class Articlec extends Controller
{
    public function index()
    {
        $article = new Article();
        return $article->getArticleList();
    }
    public function add($data)
    {
        $article = new Article();
        $article->data([
            // 'categoryList' => $data->categoryList,
            // 'tagList' => $data->categoryList,
            'html' => $data["html"],
            'title' => $data["title"],
            'text' => $data["text"],
            'cover_url' => $data["coverurl"],
            'create_date' => $data['createDate']
        ]);
        return $article->addArticle();
    }
    public function del($aid)
    {
        $article = new Article();
        return $article->delArticle($aid);
    }
}