<?php

namespace app\index\model;

use think\Model;
use think\Db;
use think\Exception;

class Comment extends Model
{
    public function getCommentList($paging)
    {
        if ($paging['type'] == -1) {
            return $this->order('create_date desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
        } else {
            return $this->where("status", $paging['type'])->order('create_date desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
        }
    }
    public static function Count($field, $value = -1)
    {
        $count = 0;
        switch ($field) {
            case 'status':
                if ($value == -1) {
                    $count = count(Comment::all());
                } else {
                    $count = count(Comment::all([$field => $value]));
                }
                break;
            case 'aid':
                $count = count(Comment::all(["aid" => $value]));
                break;
            default:
                $count = count(Comment::all());
                break;
        }
        return $count;
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
    public function editStutas($cid, $status)
    {
        return $this->save([
            'status'  => $status,
        ], ['cid' => $cid]);
    }
    public function delComment($cid)
    {
        return Comment::destroy($cid);
    }

    public static function getCommentById($aid)
    {
        return Comment::all(['aid' => $aid, 'status' => 1]);
    }
}
