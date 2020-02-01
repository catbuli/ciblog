<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Meta extends Model
{
    public function getCategoryList()
    {
        return json(Meta::all(['type' => 'category']));
    }

    public function getTagList()
    {
        return json(Meta::all(['type' => 'tag']));
    }

    public static function getMeta($mid)
    {
        return Meta::get($mid);
    }

    public function addCategory()
    {
        $message = json([
            'code' => "200",
            'message' => "分类添加成功！"
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
            'message' => "标签添加成功！"
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
            'message' => "标签删除成功！"
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
            'message' => "分类删除成功！",
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
    public function getMetaList()
    {
    }
}