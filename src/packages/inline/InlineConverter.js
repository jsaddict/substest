import { NodeType } from './InlineNode';

export default {
    type: NodeType,
    tagName: NodeType,

    import: function(el, node, converter) {
        node.content = converter.annotatedText(el, [
            node.id, 'content'
        ]);
    },

    export: function(node, el, converter) {
        el.append(converter.annotatedText([
            node.id, 'content'
        ]));
    }
}