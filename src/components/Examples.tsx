import useStore from '../store/store';
import type { IExample } from '../types';

const examples: IExample[] = [
    {
        id: 0,
        name: "Airdrop 4",
        signature: JSON.stringify(["address", "uint256"]),
        values: JSON.stringify([
            ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
            ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
            ["0x3333333333333333333333333333333333333333", "1000000000000000000"],
            ["0x4444444444444444444444444444444444444444", "7500000000000000000"]

        ])
    },
    {
        id: 1,
        name: "Airdrop 16",
        signature: JSON.stringify(["address", "uint256"]),
        values: JSON.stringify([
            ["0x0000000000000000000000000000000000000000", "4200000000000000000"],
            ["0x1111111111111111111111111111111111111111", "5000000000000000000"],
            ["0x2222222222222222222222222222222222222222", "2500000000000000000"],
            ["0x3333333333333333333333333333333333333333", "1000000000000000000"],
            ["0x4444444444444444444444444444444444444444", "7500000000000000000"],
            ["0x5555555555555555555555555555555555555555", "2000000000000000000"],
            ["0x6666666666666666666666666666666666666666", "3000000000000000000"],
            ["0x7777777777777777777777777777777777777777", "4500000000000000000"],
            ["0x8888888888888888888888888888888888888888", "6000000000000000000"],
            ["0x9999999999999999999999999999999999999999", "1500000000000000000"],
            ["0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "5500000000000000000"],
            ["0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "8000000000000000000"],
            ["0xcccccccccccccccccccccccccccccccccccccccc", "9000000000000000000"],
            ["0xdddddddddddddddddddddddddddddddddddddddd", "3500000000000000000"],
            ["0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "7000000000000000000"],
            ["0xffffffffffffffffffffffffffffffffffffffff", "4000000000000000000"]
        ]
        )
    },
    {
        id: 2,
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
        <div className="examples">Examples:&nbsp;
            {examples.map((example: IExample) => (
                <button key={example.id} onClick={() => loadExample(example)}>{example.name}</button>
            ))}
        </div>
    );
};

export default Examples;