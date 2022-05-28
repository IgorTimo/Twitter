import { ethers } from "ethers";
import provider from "./provider";

const address = "0x219a2EecA8377C64fD414fE64eE21210A38532a9";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "string", name: "_text", type: "string" }],
    name: "createTweet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTweetsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tweets",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const profile = new ethers.Contract(address, abi, provider);

export default profile;