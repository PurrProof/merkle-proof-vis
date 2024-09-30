import { create } from "zustand";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import type { IExample /*, IDecodedCalldata*/ } from "../types";
import { getUrlParams, clearUrl } from "../helpers/url";
import { validateSignature, validateValues } from "../helpers/security";
import { generateProofSteps } from "../helpers/proof";

interface ProofStep {
  leftIndex: number;
  rightIndex: number;
  parentIndex: number;
  stepNumber: number;
}

// zustand store interface
interface StoreState {
  signature: string;
  values: string;
  tree: StandardMerkleTree<any[]> | null;
  error: string | null;
  selectedLeaves: number[];
  proofSteps: ProofStep[] | null;

  setSignature: (signature: string) => void;
  setValues: (values: string) => void;
  setTree: (tree: StandardMerkleTree<any[]> | null) => void;
  setError: (error: string | null) => void;
  setProofSteps: () => void;

  buildTree: () => void;
  clearAll: () => void;
  clearResults: () => void;

  onLeafClick: (id: number) => void;
  resetSelection: () => void;
  loadExample: (example: IExample) => void;
  loadFromUrl: () => void;
}

// zustand store
const useStore = create<StoreState>((set, get) => ({
  signature: "",
  values: "",
  tree: null,
  error: null,
  selectedLeaves: [],
  proofSteps: null,

  // setters
  setSignature: (signature) => set({ signature }),
  setValues: (values) => {
    set({ values: values.replace(/],/g, "],\n") });
  },

  setTree: (tree) => set({ tree }),
  setError: (error) => set({ error }),

  clearAll: () => {
    const { setSignature, setValues, clearResults } = get();
    setSignature("");
    setValues("");
    clearResults();
  },

  clearResults: () => {
    const { resetSelection, setError, setTree, setProofSteps } = get();
    setError(null);
    setTree(null);
    setProofSteps();
    resetSelection();
  },

  buildTree: () => {
    const { signature, values, clearResults, setError, setTree } = get();
    clearResults();

    try {
      const parsedSignature = validateSignature(signature);
      const parsedValues = validateValues(values);
      const tree = StandardMerkleTree.of(parsedValues, parsedSignature);
      setTree(tree);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "unknown error");
    }
  },

  onLeafClick: (id) => {
    const { selectedLeaves, setProofSteps } = get();
    const newSelectedLeaves = selectedLeaves.includes(id)
      ? selectedLeaves.filter((selectedId) => selectedId !== id)
      : [...selectedLeaves, id];
    set({ selectedLeaves: newSelectedLeaves });
    setProofSteps();
  },

  setProofSteps: () => {
    const { tree, selectedLeaves } = get();
    if (!tree || selectedLeaves.length === 0) {
      set({ proofSteps: null });
      return;
    }
    set({ proofSteps: generateProofSteps(tree, selectedLeaves) });
  },

  // reset the selection state
  resetSelection: () => set({ selectedLeaves: [] }),

  loadExample: (example: IExample) => {
    const { setSignature, setValues, buildTree, clearAll } = get();

    clearAll();

    // schedule the loading and decoding of the new example in the next tick
    setTimeout(() => {
      setSignature(example.signature);
      setValues(example.values);
      buildTree();
    }, 0);
  },

  loadFromUrl: () => {
    const { setError, clearAll, setSignature, setValues, buildTree } = get();

    clearAll();

    const { signature, values } = getUrlParams();

    // design decision is don't keep url
    clearUrl();

    if (signature === "" && values === "") {
      return;
    }

    try {
      const parsedSignature = validateSignature(signature);
      const parsedValues = validateValues(values);
      setSignature(JSON.stringify(parsedSignature));
      setValues(JSON.stringify(parsedValues));
      buildTree();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "unknown error");
    }
  },
}));

export default useStore;
