<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Article extends Model
{
    public function getArticleList()
    {
        return json(Article::all());
    }
    public function addArticle()
    {
        $message = json([
            'code' => "200",
            'message' => "分账发布成功！"
        ]);
        try {
            $this->save();
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
    public function addTag()
    {
        $message = json([
            'code' => "200",
            'message' => "添加标签成功！"
        ]);
        try {
            $this->save();
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
    public function delTag($mid)
    {
        $message = json([
            'code' => "200",
            'message' => "删除标签成功！"
        ]);
        try {
            Meta::destroy($mid);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
    public function delCategory($mid)
    {
        $message = json([
            'code' => "200",
            'message' => "删除分类成功！",
        ]);
        try {
            Meta::destroy($mid);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
}