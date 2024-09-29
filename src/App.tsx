import { useState } from "react";
///////import Examples from './components/Examples';
import InputFields from "./components/InputFields";
import MerkleTree from "./components/MerkleTree";
import CopyUrlButton from './components/CopyUrlButton';
import Links from './components/Links';
import Footer from './components/Footer';
import useStore from './store/store';

const App = () => {
  const {
    tree,
    error,
    buildTree,
    clearAll,
    resetSelection,
    loadFromUrl
  } = useStore((state) => ({
    tree: state.tree,
    error: state.error,
    buildTree: state.buildTree,
    clearAll: state.clearAll,
    resetSelection: state.resetSelection,
    loadFromUrl: state.loadFromUrl,
  }));

  return (
    <>
      <main>
        <h1>Merkle Tree Multi Proofs Visualizer</h1>
        <Links />
        <InputFields />
        {/*<Examples />*/}
        <button onClick={buildTree}>Build Tree</button >
        <button onClick={clearAll}>Clear</button >
        <button onClick={resetSelection}>Deselect All</button >
        <CopyUrlButton />
        {tree &&
          <MerkleTree tree={tree} />}
        {error && <div className="error">{error}</div>}

      </main >
      <Footer />
    </>
  );
};

export default App;
