import copy from 'copy-to-clipboard';
import useStore from '../store/store';
import { generateUrl } from "../helpers/url";

const CopyUrlButton = () => {
    const { signature, values } = useStore((state) => ({
        signature: state.signature,
        values: state.values,
    }));

    return (
        <button onClick={() => copy(generateUrl(signature, values))}>Copy URL</button>
    );
};

export default CopyUrlButton;