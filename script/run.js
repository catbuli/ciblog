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

(async function run() {

    commandSpawn('npm', ['run', `serve`], `${__dirname}/../blog`);

    commandSpawn('php', ['think', `run`], `${__dirname}/../api`);
}())


// return new Promise(function (resolve, reject) {

//     var spawn_blog_ob = spawn_blog.spawn('npm', ['run', `serve`]);
//     spawn_blog_ob.stdout.on('data', function (data) {
//         console.log('stdout: ' + data);
//     });

//     spawn_blog_ob.stderr.on('data', function (data) {
//         console.log('stderr: ' + data);
//     });

//     spawn_blog_ob.on('close', function (code) {
//         console.log('子进程已退出，退出码 ' + code);
//     });

//     // // var cmd = "ipconfig";
//     // // var blog = "cd /blog && npm run serve";
//     // var blog = `cd ${__dirname}/blog && npm run serve`;
//     // var api = `cd ${__dirname}/api && php think run`;
//     // exec_blog(blog, {
//     //     maxBuffer: 1024 * 2000
//     // }, function (err, stdout, stderr) {
//     //     console.log("blog", '')
//     //     if (err) {
//     //         console.log(err);
//     //         reject(err);
//     //     } else if (stderr.lenght > 0) {
//     //         reject(new Error(stderr.toString()));
//     //     } else {
//     //         resolve();
//     //     }
//     // });
//     // exec_api(api, {
//     //     maxBuffer: 1024 * 2000
//     // }, function (err, stdout, stderr) {
//     //     console.log("api", '')
//     //     if (err) {
//     //         console.log(err);
//     //         reject(err);
//     //     } else if (stderr.lenght > 0) {
//     //         reject(new Error(stderr.toString()));
//     //     } else {
//     //         console.log(stdout);
//     //         resolve();
//     //     }
//     // });
// });
