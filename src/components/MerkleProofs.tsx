import React from 'react';
import useStore from '../store/store';
import { MultiProof } from '@openzeppelin/merkle-tree/dist/core';

const MerkleProofs = () => {
    const { selectedLeafs, tree } = useStore(
        (state) => ({
            tree: state.tree,
            selectedLeafs: state.selectedLeaves,
        })
    );

    let proofs: MultiProof<string, any[]> | null = null;

    // Only calculate proofs if both tree and selectedLeafs are available
    if (tree && selectedLeafs.length > 0) {
        proofs = tree.getMultiProof(selectedLeafs);
        console.log(proofs);
    }

    return (
        <div className="proofs">
            {proofs ? JSON.stringify(proofs.proof, null, 2) : "No proofs available."}
        </div>
    );
}

export default React.memo(MerkleProofs);
