/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 13:21:13
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 13:21:13
 */

"use strict"

const process = require('process');


const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("./consoleMsg");
const commandSpawn = require("./commandSpawn");
const { resolvePath } = require('./utils');

(async function init() {
    msgTitle("ciblog   项目初始化开始：");

    // await commandSpawn('npm', ['install'], resolvePath("./", "./")).then(() => {
    //     msgSuccess("脚本依赖安装成功");
    // }).catch((err) => {
    //     msgError(err);
    // });

    msgTitle("前端项目依赖安装：");
    await commandSpawn('npm', ['install'], resolvePath("./", "blog")).then(() => {
        msgSuccess("前端项目依赖安装成功");
    }).catch((err) => {
        msgError(err);
    });

    msgTitle("后端项目依赖安装：");
    await commandSpawn('composer', ['install'], resolvePath("./", "api")).then(() => {
        msgSuccess("\n后端项目依赖安装成功");
    }).catch((err) => {
        msgError(err);
    });
}())