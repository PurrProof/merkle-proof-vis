import React, { useMemo } from 'react';
import TreeNode from './TreeNode';
import TreeArrow from './TreeArrow';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';

const leftChildIndex = (i: number) => 2 * i + 1;
const rightChildIndex = (i: number) => 2 * i + 2;

interface TreeBranchProps {
    tree: StandardMerkleTree<any[]>;
    index?: number;
    level?: number;
    parentId?: string;
}

const TreeBranch = ({ tree, index = 0, level = 0, parentId }: TreeBranchProps) => {
    const treeDump = useMemo(() => tree.dump(), [tree]);
    const totalEntries = treeDump.tree.length;

    const leftIndex = leftChildIndex(index);
    const rightIndex = rightChildIndex(index);
    const nodeId = `node-${index}`;

    const { nodeValue, nodeHash, valueIndex } = useMemo(() => {
        const entry = treeDump.values.find((v) => v.treeIndex === index);
        const hash = treeDump.tree[index];
        let valueIndex = null;
        if (entry) {
            valueIndex = treeDump.values.indexOf(entry);
            const value = entry.value.join(', ');
            return { nodeValue: value, nodeHash: hash, valueIndex };
        } else {
            return { nodeValue: 'Internal Node', nodeHash: hash, valueIndex };
        }
    }, [index, treeDump]);

    return (
        <div className="tree-branch">
            <TreeNode
                nodeId={nodeId}
                index={index}
                nodeValue={nodeValue}
                nodeHash={nodeHash}
                valueIndex={valueIndex}
            />

            {parentId && <TreeArrow startId={nodeId} endId={parentId} />}

            <div className="tree-children">
                {/* render left child if it exists */}
                {leftIndex < totalEntries && (
                    <TreeBranch
                        tree={tree}
                        index={leftIndex}
                        level={level + 1}
                        parentId={nodeId}
                    />
                )}

                {/* render right child if it exists */}
                {rightIndex < totalEntries && (
                    <TreeBranch
                        tree={tree}
                        index={rightIndex}
                        level={level + 1}
                        parentId={nodeId}
                    />
                )}
            </div>
        </div>
    );
};

export default React.memo(TreeBranch);
