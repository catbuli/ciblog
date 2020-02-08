<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Comment extends Model
{
    public function getCommentList($paging)
    {
        if ($paging['type'] == -1) {
            return $this->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
        } else {
            return $this->where("status", $paging['type'])->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
        }
    }
    public static function Count($field, $value = 0)
    {
        $count = 0;
        switch ($field) {
            case 'status':
                $count = count(Comment::all([$field => $value]));
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

    public static function getCountByAid($aid)
    {
        return count(Comment::all(["aid" => $aid]));
    }
}