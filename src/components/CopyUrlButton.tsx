import copy from 'copy-to-clipboard';
//import useStore from '../store/store';
//import { generateUrl } from "../helpers/url";

const CopyUrlButton = () => {
    /*const { signature, calldata } = useStore((state) => ({
        signature: state.signature,
        calldata: state.calldata,
    }));*/

    //<button onClick={() => copy(generateUrl(signature, calldata))}>Copy URL</button>
    return (
        <button>Copy URL</button>
    );
};

export default CopyUrlButton;
