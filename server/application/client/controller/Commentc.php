<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Comment;
use app\client\model\Article;
use think\Exception;
use app\common\Response;
use think\Db;

class Commentc extends Controller
{
    /**
     * 控制器默认方法 获取评论列表
     *
     * @return json
     */
    public function index($paging)
    {
        try {
            $comment = new Comment();
            $data = $comment->getCommentList($paging);
            foreach ($data as $value) {
                $article = new Article;
                $title = $article->getArticleById($value['aid'])['title'];
                $value['title'] = $title;
            }
            $paging['total'] = Comment::Count($paging['typeName'], $paging['type']);
            return Response::result(201, "成功", "数据获取成功!", $data, $paging);
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 修改评论状态
     *
     * @param int $cid
     * @param int $status
     * @return json
     */
    public function editstatus($cid, $status)
    {
        try {
            $comment = new Comment();
            $comment->editStutas($cid, $status);
            return Response::result(200, "成功", "状态修改成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 删除评论
     *
     * @param array $cid 评论id 或者 评论id数组 
     * @return json
     */
    public function del($cid)
    {
        try {
            $comment = new Comment();
            $comment->delComment($cid);
            return Response::result(200, "成功", "评论删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 根据id获取评论内容
     *
     * @param int $aid 文章id
     * @return json
     */
    public function byid($aid)
    {
        try {
            $comment = new Comment();
            $list = $comment->getCommentById($aid);
            return Response::result(201, "成功", "评论信息获取成功!", $list);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 新增评论
     *
     * @param object $data 文章内容
     * @return json
     */
    public function add($data)
    {
        try {
            $comment = new Comment();
            $comment->data([
                'aid' => $data["aid"],
                'content' => $data["content"],
                'nickname' => $data["nickname"],
                'email' => $data["email"],
                'create_date' => date('Y-m-d H:i:s'),
                'status' => 1,
                'ip' => $_SERVER['REMOTE_ADDR'],
            ]);
            $comment->addComment();
            return Response::result(200, "成功", "评论成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}
