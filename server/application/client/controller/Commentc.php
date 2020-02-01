<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Comment;
use think\Exception;

class Commentc extends Controller
{
    public function index()
    {
        try {
            $comment = new Comment();
            $data = $comment->getCommentList();
            $message = json([
                'code' => "200",
                'message' => "评论列表获取成功",
                'data' => $data
            ]);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }

    public function update($data)
    {
        $comment = new Comment;
        $message = json([
            'code' => "200",
            'message' => "信息更新成功"
        ]);
        try {
            $comment->save([
                'mail'  => $data['mail'],
                'bilibili'  => $data['bilibili'],
                'github'  => $data['github'],
                'nickname'  => $data['nickname'],
                'indexurl'  => $data['indexurl'],
            ], ['uid' => 1]);
        } catch (Exception $e) {

            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
}