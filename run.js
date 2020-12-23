/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-23 22:24:58
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-23 22:24:58
 */

"use strict";

var exec_blog = new require("child_process").exec;
var exec_api = new require("child_process").exec;

return new Promise(function (resolve, reject) {

    // var cmd = "ipconfig";
    // var blog = "cd /blog && npm run serve";
    var blog = `cd ${__dirname}/blog && npm run serve`;
    var api = `cd ${__dirname}/api && php think run`;
    exec_blog(blog, {
        maxBuffer: 1024 * 2000
    }, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            reject(err);
        } else if (stderr.lenght > 0) {
            reject(new Error(stderr.toString()));
        } else {
            exec_api(api, {
                maxBuffer: 1024 * 2000
            }, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else if (stderr.lenght > 0) {
                    reject(new Error(stderr.toString()));
                } else {
                    console.log(stdout);
                    resolve();
                }
            });
            resolve();
        }
    });
});
