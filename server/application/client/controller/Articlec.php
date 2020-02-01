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
    public function edit($data)
    {
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
            'create_date' => $data['createDate'],
            'allow_comment' => $data['allow_comment'] == true ? 1 : 0,
        ]);
        return $article->addArticle();
    }
    public function del($aid)
    {
        $article = new Article();

        return $article->delArticle($aid);
    }
    public function byid($aid)
    {
        $article = new Article();
        $article = $article->getArticleById($aid);
        $article->allow_comment = $article->allow_comment == 0 ? false : true;
        $message = json([
            'code' => "200",
            'message' => "文章信息获取成功",
            'data' => $article
        ]);
        return $message;
    }
}