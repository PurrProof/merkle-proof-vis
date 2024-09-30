import { useRef, useEffect } from "react";
import Examples from './components/Examples';
import InputFields from "./components/InputFields";
import MerkleProofs from "./components/MerkleProofs";
import TreeBranch from "./components/Tree/TreeBranch";
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

  // useEffect run twice in dev mode because of React.StrictMode
  const hasLoaded = useRef(false); // ref to track if effect has run
  useEffect(() => {
    if (!hasLoaded.current) {
      loadFromUrl(); // only run once
      hasLoaded.current = true; // mark as loaded
    }
  }, [loadFromUrl]);

  return (
    <>
      <main>
        <h1>Merkle Tree Multi Proofs Visualizer</h1>
        <Examples />
        <Links />
        <InputFields />
        <button onClick={buildTree}>Build Tree</button >
        <button onClick={clearAll}>Clear</button >
        <button onClick={resetSelection}>Deselect All</button >
        <CopyUrlButton />
        {tree &&
          <div className="container">
            <div className="tree">
              <TreeBranch tree={tree} index={0} level={0} />
            </div>
            <MerkleProofs />
          </div>
        }
        {error && <div className="error">{error}</div>}
      </main >
      <Footer />
    </>
  );
};

export default App;
