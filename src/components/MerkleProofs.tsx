import React from 'react';
import useStore from '../store/store';
import { MultiProof } from '@openzeppelin/merkle-tree/dist/core';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const MerkleProofs = () => {
    const { selectedLeafs, tree } = useStore((state) => ({
        tree: state.tree,
        selectedLeafs: state.selectedLeaves,
    }));

    let proofs: MultiProof<string, any[]> | null = null;

    // Only calculate proofs if both tree and selectedLeafs are available
    if (tree && selectedLeafs.length > 0) {
        proofs = tree.getMultiProof(selectedLeafs);
    }

    return proofs ? (
        <div className="proofs">
            <h3>Proofs</h3>
            <div className="content">
                <SyntaxHighlighter language="json" style={atomOneLight}>
                    {JSON.stringify(proofs, null, 2)}
                </SyntaxHighlighter>
            </div>
        </div>
    ) : null;
};

export default React.memo(MerkleProofs);
