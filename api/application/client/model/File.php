<?php

namespace app\client\model;

use think\Model;
use think\Db;


class File extends Model
{
    /**
     * 根据条件返回文件列表
     *
     * @param Array 
     * @return Array 返回的文件列表
     */
    public function getList($typeName, $type = -1)
    {
        switch ($typeName) {
            case 'all':
                if ($type == -1) {
                    return $this->order('datetime desc')->select();
                } else {
                    return $this->order('datetime esc')->where("aid", $type)->select();
                }
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