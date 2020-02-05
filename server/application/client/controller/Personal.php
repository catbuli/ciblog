<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\User;
use think\Exception;
use app\common\Response;

class Personal extends Controller
{
    /**
     * 控制器默认方法 获取个人信息
     *
     * @return json
     */
    public function index()
    {
        try {
            $user = new User();
            return Response::result(201, "成功", "数据获取成功!", $user->getUserById(1));
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 个人信息更新
     *
     * @param json $data 个人信息数据
     * @return json
     */
    public function update($data)
    {
        try {
            $user = new User;
            $user->save([
                'mail'  => $data['mail'],
                'bilibili'  => $data['bilibili'],
                'github'  => $data['github'],
                'nickname'  => $data['nickname'],
                'indexurl'  => $data['indexurl'],
            ], ['uid' => 1]);
            return Response::result(200, "成功", "数据更新成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
}