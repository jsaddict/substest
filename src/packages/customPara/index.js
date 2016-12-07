import { CustomParaNode, NodeType } from './CustomParaNode';
import CustomParaComponent from './CustomParaComponent';
import CustomParaConverter from './CustomParaConverter';

export default {
    name: 'p',
    configure: function (config) {
        config.addNode(CustomParaNode);
        config.addComponent(NodeType, CustomParaComponent);
        config.addConverter('html', CustomParaConverter);
    }
};