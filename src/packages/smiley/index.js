import { AnnotationTool, InsertInlineNodeCommand } from 'substance';

import { SmileyNode, NodeType } from './SmileyNode';
import SmileyComponent from './SmileyComponent';

export default {
    name: 'smiley',
    configure: function(config) {
        config.addNode(SmileyNode);
        config.addComponent(NodeType, SmileyComponent);
        config.addCommand('add-smiley', InsertInlineNodeCommand, { nodeType: NodeType });
        config.addTool('add-smiley', AnnotationTool, { target: 'insert' });
        config.addLabel('add-smiley', 'Smiley');
    }
};