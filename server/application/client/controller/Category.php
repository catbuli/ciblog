<?php

namespace app\client\controller;

use think\Controller;
use app\client\model\Meta;
use app\client\model\ArticleMeta;
use think\Exception;
use app\common\Response;

class Category extends Controller
{
    /**
     * 控制器默认方法获取分类列表
     *
     * @return json
     */
    public function index()
    {
        try {
            $meta = new Meta();
            return Response::result(201, "成功", "分类列表获取成功!", $meta->getMetaList('category'));
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 添加分类
     *
     * @param string $name 分类名
     * @param string $description 分类描述
     * @return json
     */
    public function add($name, $description)
    {
        try {
            $meta = new Meta();
            $meta->data([
                'name'  =>  $name,
                'description' =>  $description,
                'type' => 'category'
            ]);
            $meta->addMeta();
            return Response::result(200, "成功", "分类添加成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 删除分类
     *
     * @param int $mid 分类mid
     * @return json
     */
    public function del($mid)
    {
        try {
            $meta = new Meta();
            $meta->delMeta($mid);
            return Response::result(200, "成功", "分类删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 根据文章aid获取分类列表
     *
     * @param int $aid 文章aid
     * @return json
     */
    public function byid($aid)
    {
        try {
            $list = ArticleMeta::getMetaByArticle($aid, "category", true);
            return Response::result(201, "成功", "分类信息获取成功!", $list);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}