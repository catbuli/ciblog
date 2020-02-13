<?php

namespace app\client\controller;

use app\client\model\ArticleMeta;
use think\Controller;
use app\client\model\Meta;
use think\Exception;
use app\common\Response;

class Tag extends Controller
{
    /**
     * 控制器默认方法获取标签列表
     *
     * @return json
     */
    public function index()
    {
        try {
            $meta = new Meta();
            return Response::result(201, "成功", "标签列表获取成功!", $meta->getMetaList('tag'));
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 添加标签
     *
     * @param string $name 标签名
     * @return json
     */
    public function add($name)
    {
        try {
            $meta = new Meta();
            $meta->data([
                'name'  =>  $name,
                'description' => null,
                'type' => 'tag',
                'order' => 0,
                'parent' => 0,
            ]);
            $meta->addMeta();
            return Response::result(200, "成功", "标签添加成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 删除标签
     *
     * @param int $mid 标签mid
     * @return json
     */
    public function del($mid)
    {
        try {
            $meta = new Meta();
            $meta->delMeta($mid);
            ArticleMeta::delMetaByArticle($mid);
            return Response::result(200, "成功", "标签删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}