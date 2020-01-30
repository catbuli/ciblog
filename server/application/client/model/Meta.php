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

    public function addCategory()
    {
        $message = json([
            'code' => "200",
            'message' => "添加分类成功！"
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
}