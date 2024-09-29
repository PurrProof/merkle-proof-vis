import { create } from "zustand";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import type { IExample /*, IDecodedCalldata*/ } from "../types";
import { getUrlParams, clearUrl } from "../helpers/url";
//import { validateHex, validateFragment } from "../helpers/security";

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
  validateInputs: (signature: string, values: string) => boolean;

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
  setValues: (values) => set({ values }),
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
    const {
      signature,
      values,
      clearResults,
      setError,
      setTree,
      validateInputs,
    } = get();
    clearResults();

    /*********************if (!validateInputs(signature, values)) {
      return;
    }******************/

    try {
      const values = [
        ["0x1111111111111111111111111111111111111111"],
        ["0x2222222222222222222222222222222222222222"],
        ["0x3333333333333333333333333333333333333333"],
        ["0x4444444444444444444444444444444444444444"],
        ["0x5555555555555555555555555555555555555555"],
        ["0x6666666666666666666666666666666666666666"],
      ];
      const tree = StandardMerkleTree.of(values, ["address"]);
      setTree(tree);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "unknown error");
    }
  },

  // reset the selection state
  resetSelection: () => set({ selectedIds: [] }),

  validateInputs: (signature: string, values: string): boolean => {
    const { setError } = get();
    if (signature === "" || values === "") {
      setError(signature === "" ? "Empty values." : "Empty signature.");
      return false;
    }

    try {
      // validate values
      // validate signature
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid input.");
      return false;
    }

    return true;
  },

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
    const { buildTree, setSignature, setValues, clearAll, validateInputs } =
      get();

    clearAll();

    const { signature, values } = getUrlParams();

    // design decision is don't keep url
    clearUrl();

    if (
      (signature === "" && values === "") || // getUrlParams() may return empty parameters in case of some problems
      !validateInputs(signature, values) // pre-validate here, don't allow invalid values from url
    ) {
      return;
    }

    setSignature(signature);
    setValues(values);
    buildTree();
  },
}));

export default useStore;
