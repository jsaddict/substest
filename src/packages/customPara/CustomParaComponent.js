import { TextBlockComponent } from 'substance'

export default class InlineComponent extends TextBlockComponent {

    render($$) {
        let el = super.render.call(this, $$);
        return el.addClass('sc-paragraph');
    }
}
