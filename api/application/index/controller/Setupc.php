<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\User;
use app\index\model\Setup;
use think\Exception;
use app\common\Response;
use app\common\Session;
use app\common\TokenManage;
use app\index\model\Article;
use app\index\model\Comment;
use app\index\model\Meta;

class Setupc extends Controller
{
    /**
     * 控制器默认方法 获取个人信息
     *
     * @return JSON 响应信息
     */
    public function personal()
    {
        try {
            $header = apache_request_headers();
            $uid = $header['uid'] ? $header['uid'] : 1;
            $user = new User();
            return Response::result(201, "成功", "数据获取成功!", $user->getUserById($uid));
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 个人信息更新
     *
     * @param json $data 个人信息数据
     * @return JSON 响应信息
     */
    public function updatePersonal($data)
    {
        if (Session::get('uid') == 2) {
            return Response::result(400, "失败", "该账号没有此操作的权限!", []);
        }
        try {
            if (TokenManage::checkToken()) {
                $header = apache_request_headers();
                $uid = $header['uid'];
                $user = new User;
                $user->save([
                    'mail'  => $data['mail'],
                    'bilibili'  => $data['bilibili'],
                    'github'  => $data['github'],
                    'nickname'  => $data['nickname'],
                    'indexurl'  => $data['indexurl'],
                    'description' => $data['description'],
                ], ['uid' => $uid]);
                return Response::result(200, "成功", "数据更新成功!");
            } else {
                return Response::result(402, "失败", "账号登陆失效！");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 控制器默认方法 获取系统设置
     *
     * @return JSON 响应信息
     */
    public function system()
    {
        try {
            $header = apache_request_headers();
            $uid = $header['uid'] ? $header['uid'] : 1;
            return Response::result(201, "成功", "数据获取成功!", Setup::get($uid));
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 设置更新
     *
     * @param json $data 个人信息数据
     * @return JSON 响应信息
     */
    public function updateSystem($data)
    {
        if (Session::get('uid') == 2) {
            return Response::result(400, "失败", "该账号没有此操作的权限!", []);
        }
        try {
            if (TokenManage::checkToken()) {
                $header = apache_request_headers();
                $uid = $header['uid'];
                $setup = new Setup;
                $setup->save([
                    'banner'  => $data['banner'],
                    'comment_check' => $data['comment_check'] == true ? 1 : 0,
                    'qaq' => $data['qaq']
                ], ['sid' => $uid]);
                return Response::result(200, "成功", "设置更新成功!");
            } else {
                return Response::result(402, "失败", "账号登陆失效！");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }

    /**
     * 获取统计数据
     *
     * @return JSON
     */
    public function count()
    {
        try {
            return Response::result(201, "成功", "数据获取成功!", [
                'articleCount' => Article::count(),
                'categoryCount' => Meta::count("category"),
                'tagCount' => Meta::count("tag"),
                'commentCount' => Comment::count(),
            ]);
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    public function check()
    {
        return Response::result(400, "请求失败", "当前为预览账号，不允许任何数据修改操作");
    }
}