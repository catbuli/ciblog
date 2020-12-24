/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 12:01:04
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 12:01:04
 */
'use strict';

const path = require('path');

/**
 * 路径解析
 * @param {*} _path
 * @param {*} _file
 */
exports.resolvePath = (_path, _file) => path.resolve(_path, _file);
