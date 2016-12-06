import { InlineNode, NodeType } from './InlineNode'
import InlineComponent from './InlineComponent'
import InlineConverter from './InlineConverter'

export default {
    name: 'p',
    configure: function (config) {
        config.addNode(InlineNode);
        config.addComponent(NodeType, InlineComponent);
        config.addConverter('html', InlineConverter);
    }
};