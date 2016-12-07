import { Component } from 'substance';

export default class extends Component {
    dispose() {
        this.props.node.off(this);
    }

    render($$) {
        let el = $$('span')
            .addClass('sc-smiley')
            .text('🙂');
        return el;
    }
}