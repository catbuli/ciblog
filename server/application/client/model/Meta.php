<?php

namespace app\client\model;

use think\Model;
use think\Db;

class Meta extends Model
{
    public function getCategoryList()
    {
        return json(Meta::all());
    }
}