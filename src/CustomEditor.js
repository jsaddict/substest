import { ProseEditor, ContainerEditor } from 'substance';


export class CustomEditor extends ProseEditor {

    render($$) {
        let el = $$('div').addClass('sc-minimal-editor')
        let editor = this._renderEditor($$);
        return el.append(editor);
    }

    _renderEditor($$) {
        let configurator = this.props.configurator;
        return $$(ContainerEditor,
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