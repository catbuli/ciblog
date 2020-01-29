<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\User;
use think\Exception;

class Personal extends Controller
{
    public function index()
    {
        $user = new User();
        return $user->getUserById(1);
    }

    public function update($data)
    {
        $user = new User;
        $message = json([
            'code' => "200",
            'message' => "信息更新成功"
        ]);
        try {
            $user->save([
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