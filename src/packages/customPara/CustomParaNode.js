import { TextBlock} from 'substance';

export const NodeType = 'p';

export class CustomParaNode extends TextBlock { }
CustomParaNode.define({ type: NodeType });