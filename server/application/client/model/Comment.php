<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Comment extends Model
{
    public function getCommentList()
    {
        return Comment::all();
    }
    public function getCommentById($aid)
    {
        return Comment::get($aid);
    }
    public static function getCount()
    {
        return count(Comment::all());
    }
    public function editComment()
    {
        return $this->save();
    }
    public function addComment()
    {
        return $this->save();
    }

    public function delComment($aid)
    {
        $message = json([
            'code' => "200",
            'message' => "文章删除成功！",
        ]);
        try {
            Comment::destroy($aid);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
}