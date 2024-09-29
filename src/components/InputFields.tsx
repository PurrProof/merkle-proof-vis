import useStore from "../store/store"; // Import Zustand store

const InputFields = () => {
    const { signature, setSignature, values, setValues, buildTree } = useStore(
        (state) => ({
            signature: state.signature,
            setSignature: state.setSignature,
            values: state.values,
            setValues: state.setValues,
            buildTree: state.buildTree,
        })
    );

    return (
        <form className="calldata" onSubmit={(event) => { event.preventDefault(); buildTree() }}>
            <div>
                <label htmlFor="fsignature">Type signature:</label>
                <input
                    id="fsignature"
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Enter type signature"
                    style={{ width: "100%" }}
                />
            </div>
            <div>
                <label htmlFor="fvalues">Values:</label>
                <textarea
                    id="fvalues"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    placeholder="Enter values"
                    rows={4}
                    style={{ width: "100%" }}
                />
            </div>
        </form>
    );
};

export default InputFields;