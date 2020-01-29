<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Meta;
use think\Exception;

class Category extends Controller
{
    public function index()
    {
        $meta = new Meta();
        return $meta->getCategoryList();
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