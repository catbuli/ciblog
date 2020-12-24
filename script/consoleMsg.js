/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 13:37:24
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 13:37:24
 */
'use strict';

const chalk = require('chalk');

// 控制台提示信息
const msgNormal = text => console.log(text);
const msgTitle = text => console.log(chalk.bgBlue(chalk.white(text + "\n")));
const msgInfo = text => console.log(chalk.cyan(text));
const msgSuccess = text => console.log(chalk.green(text + "\n"));
const msgError = text => console.log(chalk.red(text + "\n"));

module.exports = {
    msgNormal,
    msgTitle,
    msgInfo,
    msgSuccess,
    msgError
};