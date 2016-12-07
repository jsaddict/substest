import { ProseEditor, AbstractEditor, Toolbar } from 'substance';

import CustomContainerEditor from './CustomContainerEditor';
import CustomOverlayTools from './CustomOverlayTools';


export class CustomEditor3 extends ProseEditor {

    render($$) {
        let el = $$('div').addClass('sc-minimal-editor')
        let editor = this._renderEditor($$);
        return el.append(editor);
    }

    _renderEditor($$) {
        let configurator = this.props.configurator;
        return $$(CustomContainerEditor,
            {
                disabled: this.props.disabled,
                documentSession: this.documentSession,
                node: this.doc.get('body'),
                commands: configurator.getSurfaceCommandNames(),
                textTypes: configurator.getTextTypes()
            })
            .ref('body');
    }
}

export class CustomEditor extends AbstractEditor {

    /*
      We render a toolbar, an editor for the body content
    */
    render($$) {
        let SplitPane = this.componentRegistry.get('split-pane')
        let el = $$('div').addClass('sc-simple-writer')
        let ScrollPane = this.componentRegistry.get('scroll-pane')
        let commandStates = this.commandManager.getCommandStates()
        let configurator = this.props.configurator
        let Body = this.componentRegistry.get('body')
        let contentPanel = $$(ScrollPane, {
            scrollbarPosition: 'right',
            overlay: CustomOverlayTools,
        }).append(
            $$(Body, {
                disabled: this.props.disabled,
                node: this.doc.get('body'),
                commands: configurator.getSurfaceCommandNames(),
                textTypes: configurator.getTextTypes()
            }).ref('body')
            ).ref('contentPanel')

        el.append(
            $$(SplitPane, { splitType: 'horizontal' }).append(
                $$(Toolbar, {
                    commandStates: commandStates
                }).ref('toolbar'),
                contentPanel
            )
        )
        return el
    }

    /*
      Update toolbar when document session has been updated
    */
    documentSessionUpdated() {
        let toolbar = this.refs.toolbar
        if (toolbar) {
            let commandStates = this.commandManager.getCommandStates()
            toolbar.setProps({
                commandStates: commandStates
            })
        }
    }
}