import useStore from "../store/store";

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
        <form
            className="values"
            onSubmit={(event) => {
                event.preventDefault();
                buildTree();
            }}
        >
            <div>
                <label htmlFor="fsignature"><span className="name">Type signature:</span></label>
                <input
                    id="fsignature"
                    type="text"
                    defaultValue={signature}
                    onBlur={(e) => setSignature(e.target.value)}
                    placeholder="Enter type signature"
                />
            </div>
            <div>
                <label htmlFor="fvalues"><span className="name">Values:</span></label>
                <textarea
                    id="fvalues"
                    defaultValue={values}
                    onBlur={(e) => setValues(e.target.value)}
                    placeholder="Enter values"
                    rows={10}
                />
            </div>
        </form>
    );
};

export default InputFields;
