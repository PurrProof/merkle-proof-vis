import React from 'react';
import TreeNode from './TreeNode';
import TreeArrow from './TreeArrow';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import useStore from '../../store/store';

interface TreeBranchProps {
    tree: StandardMerkleTree<any[]>;
    index?: number;
    parentIndex?: number;
}

const TreeBranch = ({ tree, index = 0, parentIndex }: TreeBranchProps) => {
    const treeDump = tree.dump();
    const totalEntries = treeDump.tree.length;

    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const nodeId = `node-${index}`;

    const { nodeValue, nodeHash, valueIndex } = (() => {
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
    })();

    const { proofSteps } = useStore((state) => ({
        proofSteps: state.proofSteps,
    }));

    // determine if this arrow is part of a proof step
    let arrowLabel: string | undefined;
    if (parentIndex !== undefined && proofSteps) {
        const step = proofSteps.find(
            (step) =>
                ((step.leftIndex === index || step.rightIndex === index) && step.parentIndex === parentIndex)
        );
        if (step) {
            arrowLabel = `${step.stepNumber}`;
        }
    }

    return (
        <div className="tree-branch">
            <TreeNode
                nodeId={nodeId}
                index={index}
                nodeValue={nodeValue}
                nodeHash={nodeHash}
                valueIndex={valueIndex}
            />

            {parentIndex !== undefined && (
                <TreeArrow startId={nodeId} endId={`node-${parentIndex}`} label={arrowLabel} />
            )}

            <div className="tree-children">
                {leftIndex < totalEntries && (
                    <TreeBranch tree={tree} index={leftIndex} parentIndex={index} />
                )}

                {rightIndex < totalEntries && (
                    <TreeBranch tree={tree} index={rightIndex} parentIndex={index} />
                )}
            </div>
        </div>
    );
};

export default React.memo(TreeBranch);
