<?php

namespace app\client\model;

use think\Model;
use think\Db;


class File extends Model
{
    /**
     * 根据条件返回文件列表
     *
     * @param Array $paging pageSize-每页数量 currentPage-当前页码 type-文章类型value typeName-文章类型名称 total-文章总数
     * @return Array 返回的文件列表
     */
    public function getList($paging)
    {
        switch ($paging['typeName']) {
            case 'all':
                // if ($paging['type'] == -1) {
                return $this->order('datetime desc')->limit(($paging['currentPage'] - 1) * $paging['pageSize'], $paging['pageSize'])->select();
                // }
            case 'id':
                return $this->order('datetime esc')->where("aid", $paging['type'])->select();
            default:
                return $this->order('datetime desc')->select();
        }
    }
    /**
     * 添加文件信息
     *
     * @return 
     */
    public function add()
    {
        return $this->save();
    }
    /**
     * 删除文件信息
     *
     * @return 
     */
    public function del($fid)
    {
        return File::destroy($fid);
    }
}