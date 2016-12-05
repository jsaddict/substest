import { ProseEditor } from 'substance';


export default class MinimalEditor extends ProseEditor {

    render($$) {
        return super.render($$);
    }

    _renderEditor($$) {
        var el = $$('div').addClass('sc-app');
        return el.append(super._renderEditor($$));
    }
}