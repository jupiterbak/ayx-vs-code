import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AyxWorkspaceProvider implements vscode.TreeDataProvider<AYXWorkspace> {

	private _onDidChangeTreeData: vscode.EventEmitter<AYXWorkspace | undefined | void> = new vscode.EventEmitter<AYXWorkspace | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<AYXWorkspace | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string | undefined) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: AYXWorkspace): vscode.TreeItem {
		return element;
	}

	getChildren(element?: AYXWorkspace): Thenable<AYXWorkspace[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No alteryx workspace in empty folder');
			return Promise.resolve([]);
		}

		if (element) {
			return Promise.resolve([]);
		} else {
			const packageJsonPath = path.join(this.workspaceRoot, 'ayx_workspace.json');
			if (this.pathExists(packageJsonPath)) {
				return Promise.resolve(this.getAyxToolsSettingsJson(packageJsonPath));
			} else {
				vscode.window.showInformationMessage('Workspace has no ayx_workspace.json');
				return Promise.resolve([]);
			}
		}

	}

	// /**
	//  * Given the path to ayx_workspace.json, read all its ayx tools.
	//  */
	// private getAyxToolsSettingsJson(packageJsonPath: string): Tool[] {
	// 	const workspaceRoot = this.workspaceRoot;
	// 	if (this.pathExists(packageJsonPath) && workspaceRoot) {
	// 		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

	// 		const toDep = (moduleName: string, version: string): Tool => {
	// 			if (this.pathExists(path.join(workspaceRoot, 'node_modules', moduleName))) {
	// 				return new Tool(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
	// 			} else {
	// 				return new Tool(moduleName, version, vscode.TreeItemCollapsibleState.None, {
	// 					command: 'extension.openPackageOnNpm',
	// 					title: '',
	// 					arguments: [moduleName]
	// 				});
	// 			}
	// 		};

	// 		const deps = packageJson.dependencies
	// 			? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
	// 			: [];
	// 		const devDeps = packageJson.devDependencies
	// 			? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
	// 			: [];
	// 		return deps.concat(devDeps);
	// 	} else {
	// 		return [];
	// 	}
	// }

	/**
	 * Given the path to ayx_workspace.json, read all its ayx tools.
	 */
	private getAyxToolsSettingsJson(packageJsonPath: string): AYXWorkspace[] {
		const workspaceRoot = this.workspaceRoot;
		const workspaces = [];
		if (this.pathExists(packageJsonPath) && workspaceRoot) {
			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
			workspaces.push(new AYXWorkspace(packageJson, vscode.TreeItemCollapsibleState.Expanded));
			return workspaces;
		} else {
			return [];
		}
	}

	private pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}

		return true;
	}
}

export class Tool extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		private readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

		this.tooltip = `${this.label}-${this.version}`;
		this.description = this.version;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'Tool.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'Tool.svg')
	};

	contextValue = 'tool';
}

export interface AYXWorkspaceConfiguration {
	name: string,
	toolCategory: string,
	packageIconPath: string,
	author: string,
	company: string,
	copyright: string,
	description: string,
	ayxCliVersion: string,
	backendLanguage: string,
	backendLanguageSettings: any,
	toolVersion: string,
	tools: Array<any>;
}

export class AYXWorkspace extends vscode.TreeItem{

	constructor(
		public config:AYXWorkspaceConfiguration,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(`${config.name}`, collapsibleState);
		this.tooltip = `${this.config.name}-${this.config.toolVersion}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'symbol-namespace.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'symbol-namespace.svg')
	};

	contextValue = 'workspace';
}