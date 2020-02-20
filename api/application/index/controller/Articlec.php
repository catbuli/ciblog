<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\Article;
use app\index\model\ArticleMeta;
use app\index\model\Comment;
use think\Exception;
use app\common\Response;
use think\Db;

class Articlec extends Controller
{
    /**
     * 控制器默认方法 获取文章列表
     *
     * @return json
     */
    public function index($paging)
    {
        try {
            $article = new Article();
            $list = $article->getArticleList($paging);
            foreach ($list as $value) {
                Db::table('ciblog_article')->where('aid', $value['aid'])->update(['comment_count' => count(Comment::getCommentById($value['aid']))]);
            }
            $list = $article->getArticleList($paging);
            foreach ($list as &$value) {
                $value['category'] = ArticleMeta::getMetaByArticle($value['aid'], "category", true);
                $value['tag'] = ArticleMeta::getMetaByArticle($value['aid'], "tag", true);
            }
            $paging['total'] = Article::Count($paging['typeName'], $paging['type']);
            return Response::result(201, "成功", "数据获取成功!", $list, $paging);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 发布文章
     *
     * @param object $data 文章内容
     * @return json
     */
    public function publish($data)
    {
        try {
            if ($data['aid']) {
                $article = new Article();
                $article = Article::get($data["aid"]);
                $article->html = $data["html"];
                $article->title = $data["title"];
                $article->text = $data["text"];
                $article->cover_url = $data["cover_url"];
                $article->create_date = $data["create_date"] ? $data["create_date"] : date('Y-m-d H:i:s');
                $article->allow_comment = $data["allow_comment"];
                $article->modify_date = date('Y-m-d H:i:s');
                $article->description = $data['description'];
                $article->editArticle();
                ArticleMeta::delAllMetaByArticle($article->aid, "category");
                ArticleMeta::addMetaList($data['categoryList'], $article->aid, "category");
                ArticleMeta::delAllMetaByArticle($article->aid, "tag");
                ArticleMeta::addMetaList($data['tagList'], $article->aid, "tag");
                return Response::result(200, "成功", "文章发布成功!");
            } else {
                $article = new Article();
                $article->data([
                    'html' => $data["html"],
                    'title' => $data["title"],
                    'text' => $data["text"],
                    'cover_url' => $data["cover_url"],
                    'create_date' => $data['create_date'],
                    'allow_comment' => $data['allow_comment'] == true ? 1 : 0,
                    'author_id' => 1,
                    'modify_date' => $data['create_date'],
                    'description' => $data['description']
                ]);
                $article->addArticle();
                $aid = $article->getLastInsID();
                foreach ($data['fileList'] as $value) {
                    Db::name('file')
                        ->where('aid', -1)
                        ->update(['aid' => $aid]);
                }
                ArticleMeta::addMetaList($data['categoryList'], $aid, "category");
                ArticleMeta::addMetaList($data['tagList'], $aid, "tag");
                return Response::result(200, "成功", "文章发布成功!");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e);
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
            foreach ($aid as $value) {
                Comment::where("aid", $value)->delete();
            }
            return Response::result(200, "成功", "文章删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e);
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
            Db::table('ciblog_article')->where('aid', $aid)->setInc('pv');
            $article = new Article();
            $article = $article->getArticleById($aid);
            if ($article) {
                $article->allow_comment = $article->allow_comment == 0 ? false : true;
                $article->tagList = self::getMetaIdList($aid, "tag");
                $article->categoryList = self::getMetaIdList($aid, "category");
                $article->category = ArticleMeta::getMetaByArticle($aid, "category", true);
                $article->tag = ArticleMeta::getMetaByArticle($aid, "tag", true);
                $list = [];
                $list["next"] = Db::name('article')->where('aid', '>', $aid)->order("aid asc")->find();
                $list["present"] = $article;
                $list["previous"] = Db::name('article')->where('aid', '<', $aid)->order("aid desc")->find();
                return Response::result(201, "成功", "文章信息获取成功!", $list);
            } else {
                return Response::result(404, "失败", "文章没有找到，或已被删除!");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e);
        }
    }

    public function draft($data)
    {
        try {
            Article::destroy(-1);
            $article = new Article();
            $article->data([
                "aid" => -1,
                'html' => $data["html"],
                'title' => $data["title"],
                'text' => $data["text"],
                'cover_url' => $data["cover_url"],
                'create_date' => date('Y-m-d H:i:s'),
                'allow_comment' => $data['allow_comment'] == true ? 1 : 0,
                'author_id' => 1,
                'status' => 1,
                'modify_date' => date('Y-m-d H:i:s'),
                'description' => $data['description'],
            ]);
            if ($data['aid']) {
                if ($data['aid'] == -1) {
                    $article->draft = $data["draft"];
                } else {
                    $article->draft = $data["aid"];
                }
            } else {
                $article->draft = -1;
            }
            $article->addArticle();
            ArticleMeta::delAllMetaByArticle($article->aid, "category");
            ArticleMeta::addMetaList($data['categoryList'], $article->aid, "category");
            ArticleMeta::delAllMetaByArticle($article->aid, "tag");
            ArticleMeta::addMetaList($data['tagList'], $article->aid, "tag");
            return Response::result(200, "成功", "草稿保存成功!", $article);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e);
        }
    }
}