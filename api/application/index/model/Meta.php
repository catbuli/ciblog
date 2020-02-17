<?php

namespace app\index\model;

use think\Model;
use think\Db;
use think\Exception;

class Meta extends Model
{
    public function getMetaList($type)
    {
        return Meta::all(['type' => $type]);
    }
    public static function getCategoryCount()
    {
        return count(Meta::all(['type' => 'category']));
    }
    public static function getTagCount()
    {
        return count(Meta::all(['type' => 'tag']));
    }
    public static function getMeta($mid)
    {
        return Meta::get($mid);
    }
    public function addMeta()
    {
        return $this->save();
    }
    public function delMeta($mid)
    {
        return Meta::destroy($mid);
    }
}
