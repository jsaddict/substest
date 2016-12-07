import { ContainerEditor, keys } from 'substance';



export class CustomContainerEditor extends ContainerEditor {
    constructor(parent, props) {
        super(parent, props);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 186:
                return this._handleSmiley(event);
            default:
                break;
        }
        super.onKeyDown(event);
    }

    _handleSmiley(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.shiftKey) {
            let commandManager = this.context.commandManager;
            commandManager.executeCommand('add-smiley');
        }
    }
}