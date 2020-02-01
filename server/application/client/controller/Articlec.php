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
        $list = $article->getArticleList();
        foreach ($list as $value) {
            $value->category = ArticleMeta::getMetaByArticle($value->aid, "category", true);
            $value->tag = ArticleMeta::getMetaByArticle($value->aid, "tag", true);
        }
        return $list;
    }
    public function edit($data)
    {
        $message = json([
            'code' => "200",
            'message' => "文章发布成功！"
        ]);
        try {
            $article = Article::get($data["aid"]);
            $article->html = $data["html"];
            $article->title = $data["title"];
            $article->text = $data["text"];
            $article->cover_url = $data["cover_url"];
            $article->create_date = $data["create_date"];
            $article->allow_comment = $data["allow_comment"];
            $article->modify_date = date('Y-m-d H:i:s');
            $article->editArticle();
            ArticleMeta::delAllMetaByArticle($article->aid, "category");
            ArticleMeta::addMetaList($data['categoryList'], $article->aid, "category");
            ArticleMeta::delAllMetaByArticle($article->aid, "tag");
            ArticleMeta::addMetaList($data['tagList'], $article->aid, "tag");
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
        return $article->editArticle();
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
                'html' => $data["html"],
                'title' => $data["title"],
                'text' => $data["text"],
                'cover_url' => $data["cover_url"],
                'create_date' => $data['create_date'],
                'allow_comment' => $data['allow_comment'] == true ? 1 : 0,
                'author_id' => 1,
                'modify_date' => $data['create_date']
            ]);
            $article->addArticle();
            $aid = $article->getLastInsID();
            ArticleMeta::addMetaList($data['categoryList'], $aid, "category");
            ArticleMeta::addMetaList($data['tagList'], $aid, "tag");
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
    public function getMetaIdList($aid, $type)
    {
        $list = [];
        foreach (ArticleMeta::getMetaByArticle($aid, $type, false) as $value) {
            array_push($list, $value->mid);
        }
        return $list;
    }
    public function byid($aid)
    {
        try {
            $article = new Article();
            $article = $article->getArticleById($aid);
            $article->allow_comment = $article->allow_comment == 0 ? false : true;
            $article->tagList = self::getMetaIdList($aid, "tag");
            $article->categoryList = self::getMetaIdList($aid, "category");
            // $article->categoryDetail = ArticleMeta::getMetaByArticle($aid, "category", true);
            $message = json([
                'code' => "200",
                'message' => "文章信息获取成功",
                'data' => $article
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