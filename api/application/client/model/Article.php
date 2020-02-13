<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;
use app\client\model\ArticleMeta;

class Article extends Model
{
    public function getArticleList($paging)
    {
        if ($paging) {
            if ($paging['type'] == -1) {
                return $this->order('create_date desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
            }
        } else {
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