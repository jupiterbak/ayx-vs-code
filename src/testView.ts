import * as vscode from 'vscode';
import * as path from 'path';

export class TestView {

	constructor(context: vscode.ExtensionContext) {
		const view = vscode.window.createTreeView('testView', { treeDataProvider: aNodeWithIdTreeDataProvider(), showCollapseAll: true });
		context.subscriptions.push(view);
		vscode.commands.registerCommand('testView.reveal', async (uri: string) => {
			if(uri){
				await vscode.env.openExternal(vscode.Uri.parse(uri));
			}
		});
	}
}

const tree: any = {
	'readDocu': {
		label: 'Read Extension Documentation',
		tooltip: 'Read Extension Documentation',
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: {
			light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'book.svg'),
			dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'book.svg')
		},
		command: { command: 'testView.reveal', title:"", arguments: [`https://help.alteryx.com/developer-help/platform-sdk-quickstart-guide`]},
	},
	'watchVideo': {
		label: 'Watch Extension Tutorial Video',
		tooltip: 'Watch Extension Tutorial Video',
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: {
			light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'play-circle.svg'),
			dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'play-circle.svg')
		},
		command: { command: 'testView.reveal', title:"", arguments: [`https://help.alteryx.com/developer-help/platform-sdk-quickstart-guide`]},
	},
	'gettingSDK': {
		label: 'Get Started with Alteryx SDK',
		tooltip: 'Get Started with Alteryx SDK',
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: {
			light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'star-empty.svg'),
			dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'star-empty.svg')
		},
		command: { command: 'testView.reveal', title:"", arguments: [`https://help.alteryx.com/developer-help/platform-sdk-quickstart-guide`]},
	},
	'reportIssue': {
		label: 'Report Issues',
		tooltip: 'Report Issues',
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: {
			light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'comment.svg'),
			dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'comment.svg')
		},
		command: { command: 'testView.reveal', title:"", arguments: [`https://help.alteryx.com/developer-help/platform-sdk-quickstart-guide`]},
	},
	'installAlteryx': {
		label: 'Install Alteryx',
		tooltip: 'Install Alteryx',
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: {
			light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'desktop-download.svg'),
			dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'desktop-download.svg')
		},
		command: { command: 'testView.reveal', arguments: [`https://www.alteryx.com/designer-trial/free-trial-alteryx`]},
	}
};
const nodes: any = {};

function aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{ key: string }> {
	return {
		getChildren: (element: { key: string }): { key: string }[] => {
			return getChildren(element ? element.key : undefined).map(key => getNode(key));
		},
		getTreeItem: (element: { key: string }): vscode.TreeItem => {
			const treeItem = getTreeItem(element.key);
			treeItem.id = element.key;
			return treeItem;
		}
	};
}

function getChildren(key: string | undefined): string[] {
	if (!key) {
		return Object.keys(tree);
	}
	return [];
}

function getTreeItem(key: string): vscode.TreeItem {
	const treeElement = getTreeElement(key) as vscode.TreeItem;
	if (treeElement) {
		return treeElement ;
	}
	// An example of how to use codicons in a MarkdownString in a tree item tooltip.
	const tooltip = new vscode.MarkdownString(`$(zap) ${key}`, true);
	return {
		label: /**vscode.TreeItemLabel**/<any>{ label: key, highlights: key.length > 1 ? [[key.length - 2, key.length - 1]] : void 0 },
		tooltip,
		collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
	};
}

function getTreeElement(element: string): any {
	let parent = tree;
	parent = parent[element];
	if (!parent) {
		return null;
	}
	return parent;
}

function getNode(key: string): { key: string } {
	if (!nodes[key]) {
		nodes[key] = new Key(key);
	}
	return nodes[key];
}

class Key {
	constructor(readonly key: string) { }
}