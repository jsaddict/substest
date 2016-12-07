import { AbstractEditor, Toolbar } from 'substance';

import CustomOverlayTools from './CustomOverlayTools';

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