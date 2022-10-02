/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AyxWorkspaceProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string | undefined) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: AYXWorkspace): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]>{
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No alteryx workspace in empty folder');
			return Promise.resolve([]);
		}

		if (element) {
			const context = element.contextValue;
			if(context === "workspace"){
				const nodes = this.getAyxToolNodes((element as AYXWorkspace).config);
				return Promise.resolve(nodes);
			}else if(context === "tool"){
				const config = (element as AyxTool).config as AYXToolConfiguration;
				return Promise.resolve([
					new AyxToolConfig(config.configuration, config.configuration && Object.keys(config.configuration).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None),
					new AyxToolBackend(config.backend, config.backend && Object.keys(config.backend).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None),
					new AyxToolUI(config.ui, vscode.TreeItemCollapsibleState.Collapsed)					
				]);
			}else if(context === "tool_configuration"){
				const config = (element as AyxToolConfig).config as AYXToolConfigurationConfig;
				return Promise.resolve(
					[
						{
							label: `long_name: '${config.long_name}'`,
							tooltip: `long_name: '${config.long_name}'`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,
														
						},
						{
							label: `version: '${config.version}'`,
							tooltip: `version: '${config.version}'`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,
														
						},
						{
							label: `help_url: '${config.help_url}'`,
							tooltip: `help_url: '${config.help_url}'`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,
														
						},
						{
							label: `icon_path: '${config.icon_path}'`,
							tooltip: `icon_path: '${config.icon_path}'`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,							
						},
						{
							label: `inputs (${Object.keys(config.input_anchors).length})`,
							tooltip: `inputs (${Object.keys(config.input_anchors).length})`,
							collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
						},
						{
							label: `output (${Object.keys(config.output_anchors).length})`,
							tooltip: `output (${Object.keys(config.output_anchors).length})`,
							collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
						},
					]
				);
			}else if(context === "tool_backend"){
				const config = (element as AyxToolBackend).config as AYXToolBackendConfiguration;
				return Promise.resolve(
					[
						{
							label: `tool_module: '${config.tool_module}'`,
							tooltip: `tool_module: '${config.tool_module}'`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,
							iconPath: {
								light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'tag.svg'),
								dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'tag.svg')
							}
						},
						{
							label: `tool_class_name: '${config.tool_class_name}'`,
							tooltip: `tool_class_name: '${config.tool_class_name}`,
							collapsibleState: vscode.TreeItemCollapsibleState.None,
							iconPath: {
								light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'tag.svg'),
								dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'tag.svg')
							}
						}
					]
				);
			}else if(context === "tool_ui"){
				const config = (element as AyxToolBackend).config as AYXToolBackendConfiguration;
				return Promise.resolve(
					[]
				);
			}
			return Promise.resolve([]);
		} else {
			const packageJsonPath = path.join(this.workspaceRoot, 'ayx_workspace.json');
			if (this.pathExists(packageJsonPath)) {
				return Promise.resolve(this.getAyxWorkspaceSettingsJson(packageJsonPath));
			} else {
				vscode.window.showInformationMessage('Workspace has no ayx_workspace.json');
				return Promise.resolve([]);
			}
		}

	}

	/**
	 * Given the path to ayx_workspace.json, read all its ayx tools.
	 */
	private getAyxWorkspaceSettingsJson(packageJsonPath: string): AYXWorkspace[] {
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

	private getAyxToolNodes(workspace: AYXWorkspaceConfiguration): AyxTool[] {
		const tools = Object.keys(workspace.tools).map(key => new AyxTool(workspace.tools[key], vscode.TreeItemCollapsibleState.Expanded));
		return tools;
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

export interface AYXToolUIConfiguration {}

export class AyxToolUI extends vscode.TreeItem {

	constructor(
		public config: AYXToolUIConfiguration,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super('ui', collapsibleState);
		this.tooltip = `UI Configuration`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'browser.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'browser.svg')
	};

	contextValue = 'tool_ui';
}

export interface AYXToolBackendConfiguration {	
		tool_module: string,
		tool_class_name: string
}

export class AyxToolBackend extends vscode.TreeItem {

	constructor(
		public config: AYXToolBackendConfiguration,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super('backend', collapsibleState);
		this.tooltip = `Backend configuration`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'server.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'server.svg')
	};

	contextValue = 'tool_backend';
}

export interface AYXToolConfigurationConfig {	
	long_name: string,
	description: string,
	version: string,
	search_tags: [],
	help_url: string,
	icon_path: string,
	input_anchors: any,
	output_anchors: any
}

export class AyxToolConfig extends vscode.TreeItem {

	constructor(
		public config: AYXToolConfigurationConfig,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super('info', collapsibleState);
		this.tooltip = `AyxToolConfigration for ${this.config.long_name}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'info.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'info.svg')
	};

	contextValue = 'tool_configuration';
}

export interface AYXToolConfiguration {	
	backend: {
		tool_module: string,
		tool_class_name: string
	},
	ui: {},
	configuration: {
		long_name: string,
		description: string,
		version: string,
		search_tags: [],
		help_url: string,
		icon_path: string,
		input_anchors: any,
		output_anchors: any
	}
}

export class AyxTool extends vscode.TreeItem {

	constructor(
		public config: AYXToolConfiguration,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(config.configuration.long_name, collapsibleState);
		this.tooltip = `AyxTool: ${this.config.configuration.long_name}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'package.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'package.svg')
	};

	contextValue = 'tool';
}


export interface AYXWorkspaceConfiguration {
	name: string,
	tool_category: string,
	package_icon_path: string,
	author: string,
	company: string,
	copyright: string,
	description: string,
	ayx_cli_version: string,
	backend_language: string,
	backend_language_settings: any,
	tool_version: string,
	tools: any;
}

export class AYXWorkspace extends vscode.TreeItem{

	constructor(
		public config:AYXWorkspaceConfiguration,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(`${config.name}`, collapsibleState);
		this.tooltip = `Workspace: ${this.config.name}-${this.config.tool_version}`;
	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'folder-opened.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'folder-opened.svg')
	};

	contextValue = 'workspace';
}