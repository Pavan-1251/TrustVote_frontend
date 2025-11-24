import Web3 from "web3";

const getWeb3 = async () => {
  try {
    // If MetaMask exists
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        return web3;
      } catch (err) {
        return null;
      }
    }

    // Old Web3 browser
    if (window.web3) {
      return new Web3(window.web3.currentProvider);
    }

    // Fallback to local Ganache
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    return new Web3(provider);
  } catch (error) {
    return null;
  }
};

export default getWeb3;
