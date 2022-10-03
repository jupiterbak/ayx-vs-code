import * as vscode from 'vscode';

export class Terminal {
    private static terminal: Terminal;
    private _terminal: vscode.Terminal;

    public static getTerminal(){
        if(!Terminal.terminal){
            Terminal.terminal = new Terminal(`Alteryx Terminal`);
        }
        return Terminal.terminal;
    }
    
    public show(){
        this._terminal.show(true);
    }
    public hide(){
        this._terminal.hide();
    }
    public dispose(){
        if(this._terminal){
            this._terminal.dispose();
        }
        Terminal.terminal = new Terminal(`Alteryx Terminal`);
    }
    public sendText(text: string){
        if(this._terminal){
            this._terminal.sendText(text);
        }
    }
    public getState(){
       return this._terminal.state.isInteractedWith;
    }

	constructor(public name:string) {
        // vscode.window.onDidOpenTerminal
        // vscode.window.onDidOpenTerminal(terminal => {
        //     console.log("Alteryx Terminal opened.");
        // });
        // vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
        //     vscode.window.showInformationMessage(`onDidOpenTerminal, name: ${terminal.name}`);
        // });
        // // vscode.window.onDidCloseTerminal
        // vscode.window.onDidCloseTerminal((terminal) => {
        //     vscode.window.showInformationMessage(`onDidCloseTerminal, name: ${terminal.name}`);
        // });
        this._terminal = vscode.window.createTerminal(`Alteryx Terminal`);
        vscode.workspace.getConfiguration
        vscode.debug.startDebugging
	}
}