<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Premkumar1845/ProofPair.git">
    <img src="dist/favicon.ico" alt="Logo" width="80" height="80" style="border-radius: 50%;">
  </a>

  <h3 align="center">C402 Protocol Gateway</h3>

  <p align="center">
    A decentralized pay-per-request HTTP 402 proxy billing gateway for Cardano microservices and AI inferences.
    <br />
    <a href="https://github.com/Premkumar1845/ProofPair.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://localhost:5174">View Demo</a>
    &middot;
    <a href="https://github.com/Premkumar1845/ProofPair.git/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/Premkumar1845/ProofPair.git/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

C402 is an HTTP 402 Payment Required middleware protocol designed to address the monetization overhead of web services, APIs, and AI inferences. 

In traditional API architectures, charging clients fractions of a cent per request is impossible due to flat transaction fee minimums imposed by credit card processors, alongside the developer overhead of building signups, databases, and monthly subscription tiers. 

C402 resolves this billing friction:
* **Zero Registration:** Clients interact with paid resources peer-to-peer using CIP-30 injected browser wallets (Lace/Eternl) without creating accounts.
* **Deterministic Micropayments:** Leverages Cardano's constant UTxO execution fees to permit small value transactions (e.g. 0.1 ADA).
* **Double Spend Protection:** Maintains an Express in-memory verification cache of spent transaction hashes to completely prevent replay attacks.
* **Mempool Auditing:** Intercepts transaction inputs in the node broadcast queue to verify payments in under 900ms.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The project uses the following technology stack:

* **React 18 & Vite** - Frontend client playground and dynamic developer console.
* **Framer Motion** - Drives premium spring-based micro-interactions, spotlight grids, and text scramblers.
* **Node.js & Express** - Backend gateway proxy interception middleware.
* **Axios** - Network client for Blockfrost indexer integrations.
* **Cardano CIP-30 Standard** - Interacts with browser-injected wallets (Lace, Eternl).
* **Cerebras AI API** - Integrates Llama-3.3-70b for live code generation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to configure and run the frontend portal and proxy backend gateway locally.

### Prerequisites

Ensure you have Node.js (version 18 or higher) and npm installed.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Premkumar1845/ProofPair.git
   ```
2. Install dependencies in the frontend root directory:
   ```sh
   cd ProofPair
   npm install
   ```
3. Install dependencies in the backend subdirectory:
   ```sh
   cd backend
   npm install
   ```
4. Create a `.env` configuration file in the `backend/` directory:
   ```env
   PORT=8080
   BLOCKFROST_KEY=your_blockfrost_preprod_project_id
   PAYOUT_ADDRESS=addr_test1qrf9x2y4u9asqpwldjge937cnu2c7d9bc029ac1bf58cd
   CEREBRAS_KEY=your_cerebras_api_key
   ```
5. Spin up both servers:
   * Run the Express server (`backend/`):
     ```sh
     npm run start
     ```
   * Run the Vite dev server (`root/`):
     ```sh
     npm run dev
     ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->
## Usage

1. Open the website at `http://localhost:5174/` and navigate to the **Sandbox Playground**.
2. Select **Llama-3 Coder API** and trigger **Call Protected API** to fetch the 402 challenge.
3. Paste a Cerebras API Key into the configuration panel to unlock live Llama-3 completions.
4. Connect a Cardano preprod-configured Lace wallet and click **Sign Payment**.
5. Approve the signature payload in the Lace extension.
6. Click **Call Protected API** again to submit the transaction token and unlock the code generation response.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Configure modular Vite React frontend router
- [x] Implement CIP-30 connection and CBOR-to-Bech32 decoders
- [x] Deploy Node/Express gateway proxy with 402 headers support
- [x] Set up double-spend caching replay verification list
- [x] Integrate live Cerebras Llama-3 code generations
- [x] Add dynamic Blockfrost testnet block height checks
- [ ] Implement full client-side ledger transaction serialization

See the [open issues](https://github.com/Premkumar1845/ProofPair.git/issues) for a full list of proposed features and known bugs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome. Please adhere to these guidelines:

1. Fork the Project.
2. Create your Feature Branch:
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes:
   ```sh
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the Branch:
   ```sh
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Hemanth - [hemanthme.in](https://hemanthme.in)  
Prem Kumar - [@Premkumar1845](https://github.com/Premkumar1845/)  

Project Link: [https://github.com/Premkumar1845/ProofPair](https://github.com/Premkumar1845/ProofPair)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Cardano Developer Portal Templates](https://developers.cardano.org/templates/)
* [Lace Browser Wallet Integration Docs](https://lace.io)
* [Blockfrost Cardanocli Indexer Services](https://blockfrost.io)
* [Cerebras AI Llama Inference Documentation](https://cerebras.ai)
* [ReactBits Animated Components](https://reactbits.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Premkumar1845/ProofPair.svg?style=for-the-badge
[contributors-url]: https://github.com/Premkumar1845/ProofPair/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Premkumar1845/ProofPair.svg?style=for-the-badge
[forks-url]: https://github.com/Premkumar1845/ProofPair/network/members
[stars-shield]: https://img.shields.io/github/stars/Premkumar1845/ProofPair.svg?style=for-the-badge
[stars-url]: https://github.com/Premkumar1845/ProofPair/stargazers
[issues-shield]: https://img.shields.io/github/issues/Premkumar1845/ProofPair.svg?style=for-the-badge
[issues-url]: https://github.com/Premkumar1845/ProofPair/issues
[license-shield]: https://img.shields.io/github/license/Premkumar1845/ProofPair.svg?style=for-the-badge
[license-url]: https://github.com/Premkumar1845/ProofPair/blob/master/LICENSE
