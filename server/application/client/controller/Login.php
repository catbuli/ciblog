<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\User;
use think\Exception;
use app\common\TokenManage;
use app\common\Session;

class Login extends Controller
{
    /**
     * login默认接口
     *
     * @param String $name 用户名
     * @param String $password 密码
     * @return String $message 返回的json信息
     */
    public function index($name, $password)
    {
        try {
            $data =  User::login($name, $password);
            if ($data) {
                $message = json([
                    'code' => "200",
                    'message' => "登陆成功",
                    'data' => [
                        'uid' => $data->uid,
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
    /**
     * 注销登陆
     *
     * @return String $message 返回的json信息
     */
    public function logout()
    {
        try {
            Session::clear('uid');
            Session::clear('token');
            $message = json([
                'code' => "200",
                'message' => "注销成功"
            ]);
        } catch (Exception $e) {
            $message = json([
                'code' => "400",
                'message' => $e->getMessage()
            ]);
        }
        return $message;
    }
    public function check()
    {
        try {
            $header = apache_request_headers();
            if (TokenManage::checkToken($header['uid'], $header['token'])) {
                $message = json([
                    'code' => "200",
                    'message' => "已登录"
                ]);
            } else {
                $message = json([
                    'code' => "401",
                    'message' => "请登录",
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
        // $header = apache_request_headers();
        // foreach ($header as $headers => $value) {
        //     echo "$headers: $value <br />\n";
        // }
        echo Session::get("uid");
        echo Session::get("token");
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