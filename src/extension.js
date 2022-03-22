const vscode = require('vscode');
const opn = require('opn');
const util_1 = require('./utils')
// const { workerData } = require('worker_threads');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const res_showinfo = vscode.workspace.getConfiguration().get("devfbs.show_infomessage");
	// const res_broswer = vscode.workspace.getConfiguration().get("devfbs.usebroswer");

	// console.log(res_broswer)
	
	// if res_showinfo==""?:""
	console.log("---- devfbs actived ----");
	console.log("Msg show status=>"+res_showinfo)
	if(res_showinfo==true){
		// vscode.window.showInformationMessage('Congratulations, your extension "devfbs" is now active!');
		vscode.window.showInformationMessage('Use Alt+/ to broswer the word you select!:)','Don\'t show again').then(result => {
			if(result==='Don\'t show again'){
				vscode.workspace.getConfiguration().update('devfbs.ShowInfomessage',false,true)
			}
		});
	}


	vscode.window.onDidChangeTextEditorSelection(function () {
		util_1.trigger_updateselcetion();
		// console.log("Change_TextEditor trigger activate!");
	}, null, context.subscriptions);

	vscode.window.onDidChangeActiveTextEditor(function (editor) {
		// util_1.activeEditor = editor;
		if(editor){
			util_1.trigger_updateselcetion();
			// console.log("Change_ActiveTextEditor trigger activate!");
		}
	},null,context.subscriptions) 


	let disposable = vscode.commands.registerCommand('extansion.helloWorld', function () {

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from devfbs!');
	});

	let openweb = vscode.commands.registerCommand('extansion.search',function () {
		util_1.openwb();
	});

	// function trigger_updateselcetion(){
    //     timeout && clearTimeout(timeout);
    //     timeout = setTimeout(update_selction, 20);
	// }

	// function update_selction(){
	// 	if (!activateEditor || !activateEditor.document) {
    //         return;
    //     }
	// 	try{
	// 		word = activateEditor.document.getText(activateEditor.selection);
	// 		flag=1;
	// 		// console.log("Selection:" ,word);
	// 	}catch(err){
	// 		flag=0;
	// 		vscode.window.setStatusBarMessage("devfbs seems to get some error. but it's ok! dont' be afraid !",3000);
    //         console.log(err.message);
	// 	}

	// }
	// vscode.commands.registerCommand('extansion.search',util_1.openwb);
	context.subscriptions.push(disposable);
	context.subscriptions.push(openweb);
}

// this method is called when your extension is deactivated
function deactivate() {
	console.log("---- devfbs deativate ----");
}

module.exports = {
	activate,
	deactivate
}
