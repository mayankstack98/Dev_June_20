const $ = require("jquery");
const path = require("path");
const fs = require("fs");
require("jstree");
$(document).ready(function () {
    // bubbling
    // css
    // $("#tree").html(dirName).on("click", function () {
    //     let childrens = fs.readdirSync(parent);
    //     // console.log(childrens);
    //     for (let i = 0; i < childrens.length; i++) {
    //         $(this).append(`<li>${childrens[i]}</li>`)
    //     }
    // });
    // unique id => element
    // parent=> ?id:#
    // text
    // i have path

    let pPath = process.cwd();
    let name = path.basename(pPath);

    let data = [{
        id: pPath,
        parent: "#",
        text: name
    }]
    let childArr = addCh(pPath);
    data = [...data, ...childArr];

    $("#tree").jstree({
        "core": {
            "check_callback": true,
            "data": data
        },
    }).on("open_node.jstree", function (e, data) {
        console.log(data);
        // if (data.node.children.length > 0) {
        //     createGC(data.node.children)
        //     return;
        // }
        // let nPath = data.node.id;
        // let arr = addChnGc(nPath);
        // for (let i = 0; i < arr.length; i++) {
        //     $("#tree").jstree().create_node(nPath, arr[i], "last");
        // }
        let children = data.node.children;
        for (let i = 0; i < children.length; i++) {
            let gcArr = addCh(children[i]);
            for (let j = 0; j < gcArr.length; j++) {
                let doesExist = $('#tree').jstree(true).get_node(gcArr[j].id);
                if(doesExist){
                    return;
                }
                // create logic
                $("#tree").jstree().create_node(children[i], gcArr[j], "last");
            }
        }
    })
})
// { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" }
function addCh(parentPath) {
    let isDir = fs.lstatSync(parentPath).isDirectory();
    if (isDir == false) {
        return [];
    }
    let childrens = fs.readdirSync(parentPath);
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);
        // let isDir = fs.lstatSync(cPath).isDirectory();
        // if (isDir) {
        //     let gc = fs.readdirSync(cPath);
        //     for (let j = 0; j < gc.length; j++) {
        //         let gcPath = path.join(cPath, gc[j])
        //         let gcObj = {
        //             id: gcPath,
        //             parent: cPath,
        //             text: gc[j]
        //         }
        //         cdata.push(gcObj);
        //     }
        // }
        let obj = {
            id: cPath,
            parent: parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
}
function createGC() {

}
