'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const opn = require('opn');
const vscode = require('vscode');
var timeout = null;
var word ='';
var flag = 1;
// var activateEditor = vscode.window.activeTextEditor;

// function openweb = vscode.commands.registerCommand('extansion.search',function () {
//     var searchurl = `https://www.baidu.com/s?ie=UTF-8&wd=${word}`
//     if(word!=""){
        
//         opn(searchurl, { app: "Chrome" })
//         .catch(_ => {
//             vscode.window.showErrorMessage(`Open browser failed!! Please check if you have installed the browser Chrome correctly!`);
//         });
//     }else{
//         vscode.window.showErrorMessage("Null selection broswer won't work!");
//     }
// });
exports.openwb=()=>{
    // var searchurl = `https://www.baidu.com/s?ie=UTF-8&wd=${tohex(word)}`;//https://www.google.com/search?q=  https://stackoverflow.com/search?q=
    var search_engine = vscode.workspace.getConfiguration().get("defbs.UserSearchengine");
    var searchurl;
    if(search_engine=="Baidu"){
        searchurl = `https://www.baidu.com/s?ie=UTF-8&wd=${tohex(word)}`
    }else if(search_engine=="Google"){
        searchurl = 'https://www.google.com/search?q='+word;
    }else if(search_engine == "Stackoverflow"){
        searchurl = 'https://stackoverflow.com/search?q='+word;
    }else if(search_engine == "other"){
        searchurl = vscode.workspace.getConfiguration().get("devfbs.UserModifyEngine");
    }
    console.log(searchurl)
    word = "";
    var broswer = vscode.workspace.getConfiguration().get("devfbs.UserBroswer") 
    if(flag!=0)
    {
        opn(searchurl,{app: broswer}).catch(_=>{
            vscode.window.showErrorMessage("Open browser failed!Please check if select broser has been installed on the loacal machine.");
        });
    }else{
        vscode.window.showErrorMessage('Null selection, script will not work!');
    }
}
/**
 * @param {string} [word]
 */
function tohex (word){
    word = encodeURIComponent(word);
    return word;
}
exports.trigger_updateselcetion=()=>{
    timeout && clearTimeout(timeout);
    timeout = setTimeout(update_selction, 20);
}
function update_selction () {
    var activateEditor = vscode.window.activeTextEditor;
    if (!activateEditor || !activateEditor.document) {
        return;
    }
    try{
        word = activateEditor.document.getText(activateEditor.selection);
        if(word == ''){
            flag= 0;
            console.log("Null selection!");
            return;
        }
        flag=1;
        console.log("Selection:" ,word);
    }catch(err){
        flag=0;
        vscode.window.setStatusBarMessage("devfbs seems to get some error. but it's ok! dont' be afraid !",3000);
        console.log(err.message);
    }
    
}
// exports.activeEditor  = activateEditor;
exports.tohex = tohex();