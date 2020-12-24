#!/usr/bin/env node
/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-23 22:24:58
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-23 22:24:58
 */

"use strict";

const process = require('process');


const commandSpawn = require("./commandSpawn");
const { resolvePath } = require('./utils');
const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("./consoleMsg");

(async function run() {

    msgTitle("运行开发服务：");
    commandSpawn('php', ['think', `run`], `${__dirname}/../api`);
    commandSpawn('npm', ['run', `serve`], `${__dirname}/../blog`);
}())

