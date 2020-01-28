<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\User;

class Index extends Controller
{
    public function index()
    {
        $user = new User();
        return $user->getUserById(1);
    }
}