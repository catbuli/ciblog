<?php

namespace app\index\model;

use think\Model;

class Meta extends Model
{
    protected $pk = 'mid';
    public function getMetaList($type)
    {
        return Meta::all(['type' => $type]);
    }
    public static function count($type)
    {
        return count(Meta::all(['type' => $type]));
    }
    public static function getMeta($mid)
    {
        return Meta::get($mid);
    }
}
