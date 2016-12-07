import { TextBlock} from 'substance';

export const NodeType = 'p';

export class InlineNode extends TextBlock { }
InlineNode.define({ type: NodeType });