import { useState } from "react";
///////import Examples from './components/Examples';
import CopyUrlButton from './components/CopyUrlButton';
import Links from './components/Links';
import Footer from './components/Footer';

const App = () => {

  const [error, setError] = useState(null)

  return (
    <>
      <main>
        <h1>Merkle Tree Multi Proofs Visualizer</h1>
        <Links />
        {/*<Examples />*/}
        <button>Some Action</button >
        <button>Clear</button >
        <CopyUrlButton />

        {error && <div className="error">{error}</div>}

      </main >
      <Footer />
    </>
  );
};

export default App;
