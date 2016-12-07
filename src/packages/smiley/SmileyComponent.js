import { Component } from 'substance';

export default class SmileyNode extends Component {
    dispose() {
        this.props.node.off(this);
    }

    render($$) {
        let el = $$('span')
            .addClass('sc-smiley')
            .text('🙂');
            // debugger;
        return el;
    }
}