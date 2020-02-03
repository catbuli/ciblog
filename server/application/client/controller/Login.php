<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\User;
use think\Exception;
use app\common\TokenManage;

class Login extends Controller
{
    public function index($name, $password)
    {
        try {
            $data =  User::login($name, $password);
            if ($data) {
                $message = json([
                    'code' => "200",
                    'message' => "登陆成功",
                    'data' => [
                        'uid' => $data->nickname,
                        'name' => $data->nickname,
                        'token' => TokenManage::setAppLoginToken($data->uid),
                    ]
                ]);
            } else {
                $message = json([
                    'code' => "400",
                    'message' => "账号或密码错误"
                ]);
            }
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
    public function a()
    {
        $header = apache_request_headers();
        foreach ($header as $headers => $value) {
            echo "$headers: $value <br />\n";
        }
    }
    // public function update($data)
    // {
    //     $user = new User;
    //     $message = json([
    //         'code' => "200",
    //         'message' => "信息更新成功"
    //     ]);
    //     try {
    //         $user->save([
    //             'mail'  => $data['mail'],
    //             'bilibili'  => $data['bilibili'],
    //             'github'  => $data['github'],
    //             'nickname'  => $data['nickname'],
    //             'indexurl'  => $data['indexurl'],
    //         ], ['uid' => 1]);
    //     } catch (Exception $e) {

    //         $message = json([
    //             'code' => "400",
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    //     return $message;
    // }
}