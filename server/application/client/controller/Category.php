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
    public function add($name, $description)
    {
        $meta = new Meta();
        $meta->data([
            'name'  =>  $name,
            'description' =>  $description,
            'type' => 'category'
        ]);
        return $meta->addCategory();
    }
}