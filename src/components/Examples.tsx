import useStore from '../store/store';
import type { IExample } from '../types';

const examples: IExample[] = [
    {
        id: 0,
        name: "Airdrop",
        signature: JSON.stringify(["address", "uint256"]),
        values: JSON.stringify([
            ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
            ["0x2222222222222222222222222222222222222222", "2500000000000000000"]
        ])
    },
    {
        id: 1,
        name: "Addresses",
        signature: JSON.stringify(["address"]),
        values: JSON.stringify([
            ["0x1111111111111111111111111111111111111111"],
            ["0x2222222222222222222222222222222222222222"],
            ["0x3333333333333333333333333333333333333333"],
            ["0x4444444444444444444444444444444444444444"],
            ["0x5555555555555555555555555555555555555555"],
            ["0x6666666666666666666666666666666666666666"],
        ])
    },
];

const Examples = () => {
    const loadExample = useStore((state) => state.loadExample)

    return (
        <div className="examples">Examples:
            {examples.map((example: IExample) => (
                <button key={example.id} onClick={() => loadExample(example)}>{example.name}</button>
            ))}
        </div>
    );
};

export default Examples;