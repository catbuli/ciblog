<?php

namespace app\common;

use app\client\model\Token;

class TokenManage
{
    public static function setAppLoginToken($uid)
    {
        $str = md5(microtime(true));
        $str = sha1($uid . $str);
        Token::add($uid, $str);
        return $str;
    }
    public static function checkToken($uid)
    {
    }
}