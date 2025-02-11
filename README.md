# Merkle Tree Multi-Proof Visualizer

![Screenshot](public/assets/merkle-visualizer.png)

## What is it?

A **Merkle Tree Multi-Proof Visualizer** is a tool that helps you visualize the structure of Merkle trees, generate multi-proofs, and demonstrate the proof application process. It simplifies understanding how proofs work and how multiple leaves can be efficiently verified within a Merkle tree.

## Key Features

- **Visualize Merkle Trees**: Easily see the structure of the Merkle tree, including root, internal, and leaf nodes.
- **Multi-Proof Generation**: Generate multi-proofs for multiple leaves and understand the relationships between the nodes.
- **Proof Application Process**: Demonstrate the step-by-step process of applying proofs to verify data.
- **Interactive Interface**: Build and manipulate your own trees using custom values or predefined examples.

## Who is it for?

This tool is ideal for:

- **Blockchain Developers**: Understand Merkle tree proofs in smart contracts and decentralized protocols.
- **Cryptography Enthusiasts**: Learn how Merkle trees work and how proofs are generated and verified.
- **Researchers**: Explore the application of Merkle trees in secure data verification.

## How to Use

1. **Input Values**: Enter the values you want to generate a Merkle tree from.
2. **Generate Multi-Proofs**: Select the leaves and generate multi-proofs with just a click.
3. **Visualize Proof Process**: Follow the proof verification process in an easy-to-understand format.
4. **Experiment**: Load predefined examples or create custom configurations for deeper exploration.

## How to Run Locally

To run the project locally, follow these steps:

```bash
git clone git@github.com:PurrProof/merkle-proofs-vis.git
cd merkle-proofs-vis
pnpm i
pnpm start
```

This project uses `pnpm` as the package manager for faster and more efficient dependency management. If you prefer using another package manager, simply replace `pnpm` with `npm`, `yarn`, or any other package manager you prefer in the commands above.

## Credits

This project is built using several open-source tools and libraries. I would like to give credit to the authors and maintainers of the following:

- [@openzeppelin/merkle-tree](https://github.com/OpenZeppelin/merkle-tree) – A JavaScript library to generate merkle trees and merkle proofs.
- [React](https://reactjs.org/) – The UI framework used to build the interactive application.
- [Create-React-app](https://github.com/facebook/create-react-app) – Create React apps with no build configuration.
- [React-xarrows](https://github.com/Eliav2/react-xarrows) – Used to draw arrows between elements in the visual representation of calldata.
- [Zustand](https://github.com/pmndrs/zustand) – A lightweight state management library used to manage the application's state.
- [Copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard) – Enables the copy-to-clipboard functionality for sharing calldata and visualizations.
- [Lz-string](https://github.com/pieroxy/lz-string) - LZ-based compression algorithm for JavaScript.
- [Pnpm](https://pnpm.io) – Fast, disk space efficient package manager.
- [Flowbyte](https://github.com/themesberg/flowbite) – Nice icons.
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

### Other Dependencies

In addition to the main tools listed above, this project also uses various other libraries and tools from the JavaScript/React ecosystem to provide additional functionality.

I extend my thanks to the open-source community for their contributions and support!
