import { AnnotationTool, Button } from 'substance';

export default class SmileyToolbarButton extends AnnotationTool {

    renderButton($$) {
        let el = $$(Button,
            {
                icon: this.props.icon,
                label: "Add a smiley",
                hint: this.props.hint,
                active: this.props.active,
                disabled: this.props.disabled,
                style: this.props.style
            }
        ).on('click', this.onClick);
        el.append(this.renderMode($$));
        return el;
    }

}