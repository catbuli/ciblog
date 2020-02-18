<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\User;
use app\index\model\Setup;
use think\Exception;
use app\common\Response;

class Setupc extends Controller
{
    /**
     * 控制器默认方法 获取个人信息
     *
     * @return json 响应信息
     */
    public function personal()
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
     * @return json 响应信息
     */
    public function updatePersonal($data)
    {
        try {
            $user = new User;
            $user->save([
                'mail'  => $data['mail'],
                'bilibili'  => $data['bilibili'],
                'github'  => $data['github'],
                'nickname'  => $data['nickname'],
                'indexurl'  => $data['indexurl'],
                'description' => $data['description'],
            ], ['uid' => 1]);
            return Response::result(200, "成功", "数据更新成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 控制器默认方法 获取系统设置
     *
     * @return json 响应信息
     */
    public function system()
    {
        try {
            return Response::result(201, "成功", "数据获取成功!", Setup::get(1));
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 系统设置更新
     *
     * @param json $data 个人信息数据
     * @return json 响应信息
     */
    public function updateSystem($data)
    {
        try {
            $setup = new Setup;
            $setup->save([
                'banner'  => $data['banner'],
            ], ['sid' => 1]);
            return Response::result(200, "成功", "数据更新成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
}