<?php

namespace app\index\controller;

use app\index\model\ArticleMeta;
use think\Controller;
use app\index\model\Meta;
use think\Exception;
use app\common\Response;

class Tag extends Controller
{
    /**
     * 控制器默认方法获取标签列表
     *
     * @return JSON
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
     * @return JSON
     */
    public function add($name)
    {
        try {
            if (Meta::get(['name' => $name, 'type' => 'tag'])) {
                return Response::result(400, "失败", "已存在同名标签!");
            } else {
                $meta = new Meta();
                $meta->data([
                    'name'  =>  $name,
                    'description' => null,
                    'type' => 'tag',
                    'order' => 0,
                    'parent' => 0,
                ]);
                $meta->save();
                return Response::result(200, "成功", "标签添加成功!");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 删除标签
     *
     * @param int $mid 标签mid
     * @return JSON
     */
    public function del($mid)
    {
        try {
            Meta::destroy($mid);
            ArticleMeta::delMetaByArticle($mid);
            return Response::result(200, "成功", "标签删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}