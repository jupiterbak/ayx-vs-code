// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { AyxWorkspace } from './ayxWorkspaces';
import { TestView } from './testView';
import { UiFileExplorer } from './UiFileExplorer';
import { BackendFileExplorer } from './BackendFileExplorer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Alteryx" is now active!');

	// Test View
	const helpView = new TestView(context);

	// UI File Explorer
	const toolUiView = new UiFileExplorer(context);

	// UI File Explorer
	const toolBackendView = new BackendFileExplorer(context);

	// Get the project root  path
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	// UI Workspace
	const workspaceView = new AyxWorkspace(context, rootPath, toolUiView, toolBackendView);
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ayx.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ayx-vs-code!');
	});

	context.subscriptions.push(disposable);
}

// async function initializeFromConfigurationFile(context: vscode.ExtensionContext): Promise<void> {
// 	if (!vscode.workspace.workspaceFolders) { return; }

// 	const folderPromises = vscode.workspace.workspaceFolders.map(async (folder) => await initializeFolderFromConfigurationFile(folder, context));
// 	await Promise.all(folderPromises);
// }

// async function initializeFolderFromConfigurationFile(folder: vscode.WorkspaceFolder, context: vscode.ExtensionContext): Promise<void> {
// 	const configurationPath = path.join(folder.uri.fsPath, CONFIGURATION_FILE);

// 	const configFileExists = await afs.exists(configurationPath);

// 	if (configFileExists) {
// 		const data = await afs.readFile(configurationPath);
// 		const fiddleConfiguration = <FiddleConfiguration>JSON.parse(data.toString(UTF8));
// 		const fiddleSourceControl = await FiddleSourceControl.fromConfiguration(fiddleConfiguration, folder, context, !fiddleConfiguration.downloaded);
// 		registerFiddleSourceControl(fiddleSourceControl, context);
// 		if (!fiddleConfiguration.downloaded) {
// 			// the fiddle was not downloaded before the extension restart, so let's show it now
// 			showFiddleInEditor(fiddleSourceControl);
// 		}
// 	}
// }

// this method is called when your extension is deactivated
export function deactivate() {}
