import { InlineNode } from 'substance';

export const NodeType = 'smiley';

export class SmileyNode extends InlineNode { }
SmileyNode.define({ type: NodeType });