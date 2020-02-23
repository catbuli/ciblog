<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\Meta;
use app\index\model\ArticleMeta;
use think\Exception;
use app\common\Response;

class Category extends Controller
{
    /**
     * 控制器默认方法获取分类列表
     *
     * @return JSON
     */
    public function index()
    {
        try {
            $meta = new Meta();
            $meta = $meta->getMetaList('category');
            return Response::result(201, "成功", "分类列表获取成功!", $meta);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e);
        }
    }
    /**
     * 添加分类
     *
     * @param string $name 分类名
     * @param string $description 分类描述
     * @return JSON
     */
    public function add($name, $description)
    {
        try {
            if (Meta::get(['name' => $name, 'type' => 'category'])) {
                return Response::result(400, "失败", "已存在同名分类!");
            } else {
                $meta = new Meta();
                $meta->data([
                    'name'  =>  $name,
                    'description' =>  $description,
                    'type' => 'category'
                ]);
                $meta->save();
                return Response::result(200, "成功", "分类添加成功!");
            }
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 删除分类
     *
     * @param int $mid 分类mid
     * @return 响应信息
     */
    public function del($mid)
    {
        try {
            Meta::destroy($mid);
            foreach ($mid as $value) {
                ArticleMeta::delMetaByArticle($value);
            }
            return Response::result(200, "成功", "分类删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 修改分类
     *
     * @param int $category 分类信息
     * @return 响应信息
     */
    public function edit($category)
    {
        try {
            $meta  = Meta::get($category['mid']);
            $meta->name = $category['name'];
            $meta->description = $category['description'];
            $meta->save();
            return Response::result(200, "成功", "分类修改成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 根据文章aid获取分类列表
     *
     * @param int $aid 文章aid
     * @return 响应信息
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
    /**
     * 根据标签mid获取分类列表
     *
     * @param int $mid mateID
     * @return 响应信息
     */
    public function bymid($mid)
    {
        try {
            $data = Meta::get($mid);
            return Response::result(201, "成功", "分类信息获取成功!", $data);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}