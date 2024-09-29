import { create } from "zustand";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import type { IExample /*, IDecodedCalldata*/ } from "../types";
import { getUrlParams, clearUrl } from "../helpers/url";
import { validateSignature, validateValues } from "../helpers/security";

// zustand store interface
interface StoreState {
  signature: string;
  values: string;
  tree: StandardMerkleTree<any[]> | null;
  error: string | null;
  selectedIds: number[];

  setSignature: (signature: string) => void;
  setValues: (values: string) => void;
  setTree: (tree: StandardMerkleTree<any[]> | null) => void;
  setError: (error: string | null) => void;

  buildTree: () => void;
  clearAll: () => void;
  clearResults: () => void;

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
  selectedIds: [],

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
    const { resetSelection, setError, setTree } = get();
    setError(null);
    setTree(null);
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

  // reset the selection state
  resetSelection: () => set({ selectedIds: [] }),

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
