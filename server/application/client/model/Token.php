<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class Token extends Model
{
    public static function add($uid, $token)
    {
        $flag = new Token;
        $flag->data([
            'uid'  =>  $uid,
            'token' =>  $token
        ]);
        $flag->save();
    }
}