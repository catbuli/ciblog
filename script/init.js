/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 13:21:13
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 13:21:13
 */

"use strict"


var mysql = require('mysql');
const config = require("../config")
const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("./consoleMsg");
const exec = require('child_process').exec;
const commandSpawn = require("./commandSpawn");
const { resolvePath } = require('./utils');

(async function init() {
    msgTitle("ciblog   项目初始化开始：");

    var connection = mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USERNAME,
        password: config.DB_PASSWORD,
    });

    msgTitle("连接数据库：");
    connection.connect();
    msgSuccess("数据库连接成功");

    msgTitle("创建数据库，导入初始数据：");
    await connection.query(`CREATE DATABASE if not exists ${config.DB_DATABASE}`, function (err, result) {
        if (err) throw err;

        var spl = `mysql -u${config.DB_USERNAME} -p${config.DB_PASSWORD} ${config.DB_DATABASE} < ${resolvePath("./", "database.sql")}`;
        exec(spl, {}, (err) => {
            if (err) throw err;
        });
    });
    msgSuccess("数据库已创建，导入数据成功");

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

    connection.end();

    msgTitle("请运行 npm run dev 启动开发环境");
}())