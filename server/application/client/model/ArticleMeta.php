<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class ArticleMeta extends Model
{
    public function addArticleMeta()
    {
        $this->save();
    }
}