import { create } from "zustand";
//import type { IExample, IDecodedCalldata } from "../types";
import { getUrlParams, clearUrl } from "../helpers/url";

// zustand store interface
interface StoreState {
  error: string | null;

  setError: (error: string | null) => void;

  clearAll: () => void;
  validateInputs: (signature: string, calldata: string) => boolean;

  //loadExample: (example: IExample) => void;
  loadFromUrl: () => void;
}

// zustand store
const useStore = create<StoreState>((set, get) => ({
  error: null,

  // setters
  setError: (error) => set({ error }),

  clearAll: () => {},

  validateInputs: (signature: string, calldata: string): boolean => {
    /*const { setError } = get();
    if (signature === "" || calldata === "") {
      setError(signature === "" ? "Empty calldata." : "Empty signature.");
      return false;
    }

    try {
      validateHex(calldata);
      const fragment = signature.startsWith("function ")
        ? signature
        : `function ${signature}`;
      validateFragment(fragment);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid input.");
      return false;
    }*/

    return true;
  },

  /*loadExample: (example: IExample) => {
    //const { setSignature, setCalldata, decodeCalldata, clearAll } = get();

    //clearAll();

    // schedule the loading and decoding of the new example in the next tick
    setTimeout(() => {
      //setSignature(example.signature);
      //setCalldata(example.calldata);
      //decodeCalldata();
    }, 0);
  },*/

  loadFromUrl: () => {
    /*const {
      decodeCalldata,
      setSignature,
      setCalldata,
      clearAll,
      validateInputs,
    } = get();

    clearAll();

    const { signature, calldata } = getUrlParams();

    // design decision is don't keep url
    clearUrl();

    if (
      (signature === "" && calldata === "") || // getUrlParams() may return empty parameters in case of some problems
      !validateInputs(signature, calldata) // pre-validate here, don't allow invalid values from url
    ) {
      return;
    }

    setSignature(signature);
    setCalldata(calldata);
    decodeCalldata();*/
  },
}));

export default useStore;
