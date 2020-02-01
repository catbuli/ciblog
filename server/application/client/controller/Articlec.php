<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Article;
use app\client\model\ArticleMeta;
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
        $article = new Article();
        $categoryList = [];
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
        // return $article->editArticle();
        // return 
    }
    public function add($data)
    {
        $message = json([
            'code' => "200",
            'message' => "文章发布成功！"
        ]);
        try {
            $article = new Article();
            $article->data([
                // 'categoryList' => $data->categoryList,
                // 'tagList' => $data->categoryList,
                'html' => $data["html"],
                'title' => $data["title"],
                'text' => $data["text"],
                'cover_url' => $data["cover_url"],
                'create_date' => $data['create_date'],
                'allow_comment' => $data['allow_comment'] == true ? 1 : 0,
            ]);
            $article->addArticle();
            $aid = $article->getLastInsID();
            foreach ($data['categoryList'] as $value) {
                $ArticleMeta = new ArticleMeta([
                    'aid'  =>  $aid,
                    'mid' =>  $value,
                    'type' => "category"
                ]);
                $ArticleMeta->addArticleMeta();
            };
            foreach ($data['tagList'] as $value) {
                $ArticleMeta = new ArticleMeta([
                    'aid'  =>  $aid,
                    'mid' =>  $value,
                    'type' => "tag"
                ]);
                $ArticleMeta->addArticleMeta();
            };
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
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