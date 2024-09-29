import React from 'react';

interface TreeNodeProps {
    nodeId: string;
    index: number;
    nodeValue: string;
    nodeHash: string;
    isLeaf: boolean;
}

const TreeNode = ({ nodeId, index, nodeValue, nodeHash, isLeaf }: TreeNodeProps) => (
    <div id={nodeId} className={isLeaf ? "tree-node leaf" : "tree-node internal"}>
        {isLeaf ? <span className="value">{nodeValue}</span> : index === 0 ? "root node" : "internal node"}
        <div className="info">
            <span className="index">#{index}: </span>
            <span className="hash">{nodeHash}</span>
        </div>
    </div>
);

export default React.memo(TreeNode);
