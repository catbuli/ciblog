<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Meta;
use think\Exception;

class Tag extends Controller
{
    public function index()
    {
        $meta = new Meta();
        return $meta->getTagList();
    }
    public function add($name)
    {
        $meta = new Meta();
        $meta->data([
            'name'  =>  $name,
            'description' => null,
            'type' => 'tag',
            'order' => 0,
            'parent' => 0,
        ]);
        return $meta->addTag();
    }
}