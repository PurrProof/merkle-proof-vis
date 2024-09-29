import { memo, useMemo } from 'react';
import XArrow from 'react-xarrows';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'; // Adjust import path

// Utility functions to compute left and right child indices
const leftChildIndex = (i: number) => 2 * i + 1;
const rightChildIndex = (i: number) => 2 * i + 2;

interface TreeNodeProps {
  treeDump: {
    tree: string[];
    values: { treeIndex: number; value: string[] }[];
  };
  index: number;
  level: number;
  parentId?: string;
  totalEntries: number;
}

const TreeNode = memo(function TreeNode({ treeDump, index, level, parentId, totalEntries }: TreeNodeProps) {
  const leftIndex = leftChildIndex(index);
  const rightIndex = rightChildIndex(index);
  const nodeId = `node-${index}`;

  // Memoized value for performance optimization
  const { nodeValue, nodeHash, isLeaf } = useMemo(() => {
    const entry = treeDump.values.find(v => v.treeIndex === index);
    let isLeafNode = false;

    if (entry) {
      const value = entry.value.join(', ');
      const hash = treeDump.tree[index]; // Get the hash from the dumped tree
      isLeafNode = true;
      return { nodeValue: value, nodeHash: hash, isLeaf: isLeafNode };
    } else {
      const hash = treeDump.tree[index]; // Internal node, just get the hash
      return { nodeValue: `Internal Node`, nodeHash: hash, isLeaf: isLeafNode };
    }
  }, [index, treeDump]);

  return (
    <div style={{ paddingLeft: `${level * 20}px`, position: 'relative' }}>
      {/* Render the current node */}
      <div
        id={nodeId}
        style={{
          padding: '10px',
          border: '1px solid black',
          display: 'inline-block',
          marginBottom: '15px',
          width: "450px"
        }}
      >
        {isLeaf ? (
          <>
            Leaf {index}: {nodeValue}
            <br />
            Leaf Hash: {nodeHash}
          </>
        ) : (
          <>
            Node {index}: {nodeValue}
            <br />
            Internal Hash: {nodeHash}
          </>
        )}
      </div>

      {/* Draw arrow from parent to this node */}
      {parentId && (
        <XArrow
          end={parentId}
          start={nodeId}
          endAnchor={{
            position: 'bottom',
            offset: {
              x: -230,
            },
          }}
          startAnchor="left"
          color="#000"
          path="grid"
          strokeWidth={1}
        />
      )}

      <div>
        {/* Render left child if it exists */}
        {leftIndex < totalEntries && (
          <TreeNode treeDump={treeDump} index={leftIndex} level={level + 1} parentId={nodeId} totalEntries={totalEntries} />
        )}

        {/* Render right child if it exists */}
        {rightIndex < totalEntries && (
          <TreeNode treeDump={treeDump} index={rightIndex} level={level + 1} parentId={nodeId} totalEntries={totalEntries} />
        )}
      </div>
    </div>
  );
});

// MerkleTreeRenderer Component
interface MerkleTreeRendererProps {
  tree: StandardMerkleTree<any[]>;
}

function MerkleTreeRenderer({ tree }: MerkleTreeRendererProps) {
  // Dump the tree to get the structure we need
  const treeDump = tree.dump();

  // Memoize the total entries from the dumped tree
  const totalEntries = useMemo(() => treeDump.tree.length, [treeDump]);

  // Memoize the initial tree rendering to optimize performance
  const treeRendering = useMemo(() => <TreeNode treeDump={treeDump} index={0} level={0} totalEntries={totalEntries} />, [treeDump, totalEntries]);

  return (
    <div
      style={{
        paddingLeft: '100px',
      }}
    >
      {treeRendering}
    </div>
  );
}

export default MerkleTreeRenderer;
