<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Article;
use app\client\model\ArticleMeta;
use think\Exception;
use app\common\Response;

class Articlec extends Controller
{
    /**
     * 控制器默认方法 获取文章列表
     *
     * @return json
     */
    public function index()
    {
        try {
            $article = new Article();
            $list = $article->getArticleList();
            foreach ($list as $value) {
                $value->category = ArticleMeta::getMetaByArticle($value->aid, "category", true);
                $value->tag = ArticleMeta::getMetaByArticle($value->aid, "tag", true);
            }
            return Response::result(201, "成功", "数据获取成功!", $list);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 修改文章内容
     *
     * @param object $data 文章内容
     * @return json
     */
    public function edit($data)
    {
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
            return Response::result(200, "成功", "文章发布成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 新增文章
     *
     * @param object $data 文章内容
     * @return json
     */
    public function add($data)
    {
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
            return Response::result(200, "成功", "文章发布成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 删除文章
     *
     * @param array $aid 文章id 或者 文章id数组 
     * @return json
     */
    public function del($aid)
    {
        try {
            $article = new Article();
            $article->delArticle($aid);
            return Response::result(200, "成功", "文章删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 获取某种类型标签mid列表
     *
     * @param int $aid 文章id
     * @param string $type 标签类型
     * @return json
     */
    private function getMetaIdList($aid, $type)
    {
        $list = [];
        foreach (ArticleMeta::getMetaByArticle($aid, $type, false) as $value) {
            array_push($list, $value->mid);
        }
        return $list;
    }
    /**
     * 根据id获取文章内容
     *
     * @param int $aid 文章id
     * @return json
     */
    public function byid($aid)
    {
        try {
            $article = new Article();
            $article = $article->getArticleById($aid);
            $article->allow_comment = $article->allow_comment == 0 ? false : true;
            $article->tagList = self::getMetaIdList($aid, "tag");
            $article->categoryList = self::getMetaIdList($aid, "category");
            return Response::result(201, "成功", "文章信息获取成功!", $article);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}