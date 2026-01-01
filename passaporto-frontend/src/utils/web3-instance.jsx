import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

// INDIRIZZO CORRETTO: rimosso lo spazio iniziale
const CONTRACT_ADDRESS = '0xd6C5BE9d54A82F45bADC6D54Da8bc0176BFB2238'; 
const NETWORK_URL = 'http://127.0.0.1:7545'; 

let web3Instance = null;
let contractInstance = null;

export const initWeb3 = async () => {
    if (!window.ethereum) return false;
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3Instance = new Web3(window.ethereum);
        contractInstance = new web3Instance.eth.Contract(ProductPassportArtifact.abi, CONTRACT_ADDRESS.trim());
        console.log("MetaMask connesso con successo all'indirizzo:", CONTRACT_ADDRESS);
        return true;
    } catch (error) {
        console.error("Errore connessione MetaMask:", error);
        return false;
    }
};

export const getContract = () => contractInstance;
export const getAccounts = async () => {
    if (!web3Instance) return [];
    return await web3Instance.eth.getAccounts();
};