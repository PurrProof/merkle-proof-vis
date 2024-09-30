import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

interface ProofStep {
  leftIndex: number;
  rightIndex: number;
  parentIndex: number;
  stepNumber: number;
}

export function generateProofSteps(
  tree: StandardMerkleTree<any[]>,
  selectedLeaves: number[]
): ProofStep[] {
  // generate the multiproof and destructure the relevant parts
  const { leaves, proof, proofFlags } = tree.getMultiProof(selectedLeaves);

  // build a mapping from hash to index
  const { tree: treeHashes } = tree.dump();
  const hashToIndex = treeHashes.reduce(
    (acc, hash, index) => ({ ...acc, [hash]: index }),
    {} as { [hash: string]: number }
  );

  // get indices of leaves and proof nodes
  const leavesIndices = leaves.map((leaf) => hashToIndex[tree.leafHash(leaf)]);
  const proofIndices = proof.map((hash) => hashToIndex[hash]);

  // initialize the stack with leaf indices and prepare proof steps
  const stack = [...leavesIndices];
  const proofSteps: ProofStep[] = [];
  let proofPos = 0;

  // simulate the verification process
  proofFlags.forEach((flag, stepNumber) => {
    const aIndex = stack.shift()!;
    const bIndex = flag ? stack.shift()! : proofIndices[proofPos++];

    // calculate parent index and push it back to the stack
    const parentIndex = Math.floor((Math.min(aIndex, bIndex) - 1) / 2);
    stack.push(parentIndex);

    // record proof step
    proofSteps.push({
      leftIndex: aIndex,
      rightIndex: bIndex,
      parentIndex,
      stepNumber: stepNumber + 1,
    });
  });

  return proofSteps;
}
