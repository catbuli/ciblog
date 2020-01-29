<?php

namespace app\client\model;

use think\Model;
use think\Db;

class User extends Model
{
    public function getUserById($id)
    {
        return json(User::get($id));
    }
}