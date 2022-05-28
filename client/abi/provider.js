import { ethers } from "ethers";

let provider;

if (typeof window !== "undefined" && window?.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
}

export default provider;
