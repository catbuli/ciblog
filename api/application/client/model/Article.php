<?php

namespace app\client\model;

use think\Model;
use app\client\model\ArticleMeta;
use think\Db;

class Article extends Model
{
    /**
     * 根据条件返回文章列表
     *
     * @param Array $paging pageSize-每页数量 currentPage-当前页码 type-文章类型value typeName-文章类型名称 total-文章总数
     * @return Array 返回的文章列表
     */
    public function getArticleList($paging)
    {
        switch ($paging['typeName']) {
            case 'all':
                return $this->order('create_date desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->field('aid,title,create_date,pv,comment_count,cover_url,description')->select();
            case 'keyword':
                return $this->order('create_date desc')
                    ->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])
                    ->where('title', 'like', '%' . $paging['type'] . '%')
                    ->whereOr('text', 'like', '%' . $paging['type'] . '%')
                    ->field('aid,title,create_date,pv,comment_count,cover_url,description')
                    ->select();
            case 'category':
                $list = Db::name('article_meta')->where("mid", $paging['type'])->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
                $dataList = [];
                foreach ($list as $value) {
                    array_push($dataList, Db::name("article")->where('aid', $value['aid'])->field('aid,title,create_date,pv,comment_count,cover_url,description')->find());
                }
                return $dataList;
            default:
                return Article::all();
        }
    }
    /**
     * 根据条件获取文章数量
     *
     * @param string $typeName-类型名称
     * @param string $type-类型value
     * @return Array
     */
    public static function Count($typeName = "all", $type = "")
    {
        $count = 0;
        $article = new Article();
        switch ($typeName) {
            case 'all':
                $count = count(Article::all());
                break;
            case 'keyword':
                $count = count($article->where('title', 'like', '%' . $type . '%')
                    ->whereOr('text', 'like', '%' . $type . '%')
                    ->select());
                break;
            case 'status':
                // if ($value == -1) {
                //     $count = count(Article::all());
                // } else {
                //     $count = count(Article::all([$field => $value]));
                // }
                break;
            default:
                return count(Article::all());
        }
        return $count;
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
        return Article::destroy($aid);
    }
}