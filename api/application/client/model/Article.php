<?php

namespace app\client\model;

use think\Model;
use app\client\model\ArticleMeta;

class Article extends Model
{
    /** select * from ciblog_article where title LIKE '%测试%' OR text LIKE '%测试%';
     * 根据条件返回文章列表
     *
     * @param Array $paging pageSize-每页数量 currentPage-当前页码 type-文章类型value typeName-文章类型名称 total-文章总数
     * @return Array 返回的文章列表
     */
    public function getArticleList($paging)
    {
        switch ($paging['typeName']) {
            case 'all':
                return $this->order('create_date desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
            case 'keyword':
                return $this->order('create_date desc')
                    ->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])
                    ->where('title', 'like', '%' . $paging['type'] . '%')
                    ->whereOr('text', 'like', '%' . $paging['type'] . '%')
                    ->select();
            default:
                return Article::all();
        }
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
    public static function Count($field, $value = -1)
    {
        $count = 0;
        switch ($field) {
            case 'status':
                if ($value == -1) {
                    $count = count(Article::all());
                } else {
                    $count = count(Article::all([$field => $value]));
                }
                break;
            case 'aid':
                $count = count(Article::all(["aid" => $value]));
                break;
            case 'all':
                $count = count(Article::all(["aid" => $value]));
                break;
            default:
                $count = count(Article::all());
                break;
        }
        return $count;
    }
}