// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { AyxWorkspaceProvider, AyxTool, AyxToolUI, AyxToolBackend } from './ayxWorkspaces';
import { TestView } from './testView';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ayx" is now active!');

	// Get the project root  path
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	// Samples of `window.registerTreeDataProvider`
	const ayxWorkspacesProvider = new AyxWorkspaceProvider(rootPath);
	vscode.window.registerTreeDataProvider('ayxWorkspaces', ayxWorkspacesProvider);
	vscode.commands.registerCommand('ayxWorkspaces.refresh', () => ayxWorkspacesProvider.refresh());
	vscode.commands.registerCommand('ayxWorkspaces.configure', () => vscode.window.showInformationMessage(`Successfully called configure.`));
	
	vscode.commands.registerCommand('ayxWorkspaces.infoWorkspace', () => vscode.window.showInformationMessage(`Successfully called info workspace.`));
	vscode.commands.registerCommand('ayxWorkspaces.editWorkspace', () => vscode.window.showInformationMessage(`Successfully called edit workspace.`));

	vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	vscode.commands.registerCommand('ayxWorkspaces.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('ayxWorkspaces.editEntry', (node: AyxTool) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
	vscode.commands.registerCommand('ayxWorkspaces.infoEntry', (node: AyxTool) => vscode.window.showInformationMessage(`Successfully called info entry on ${node.label}.`));
	vscode.commands.registerCommand('ayxWorkspaces.deleteEntry', (node: AyxTool) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
	vscode.commands.registerCommand('ayxWorkspaces.debugEntryUI', (node: AyxToolUI) => vscode.window.showInformationMessage(`Successfully called debug entry ui on ${node.label}.`));
	vscode.commands.registerCommand('ayxWorkspaces.debugEntryBackend', (node: AyxToolBackend) => vscode.window.showInformationMessage(`Successfully called debug entry backend on ${node.label}.`));
	
	
	// Test View
	new TestView(context);

	// try {
	// 	await initializeFromConfigurationFile(context);
	// }
	// catch (err) {
	// 	console.log('Failed to initialize a Fiddle workspace.');
	// 	vscode.window.showErrorMessage(err);
	// }

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
