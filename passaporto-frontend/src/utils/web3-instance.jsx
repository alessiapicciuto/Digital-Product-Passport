// File: src/utils/web3-instance.js

import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

const CONTRACT_ADDRESS = '0x06b8c301511FFA00e32C86E8CfB7c4d5db1B702e';

const NETWORK_URL = 'http://127.0.0.1:7545'; 

let web3Instance = null;
let contractInstance = null;
let accountsList = [];

const initWeb3 = async () => {
    try {
        let provider;
        
        if (window.ethereum) {
        
            provider = window.ethereum;
        
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
        
            console.log('Nessun provider rilevato.');
            provider = new Web3.providers.HttpProvider(NETWORK_URL);
        }
        
        web3Instance = new Web3(provider);
        
        if (web3Instance) {
            const abi = ProductPassportArtifact.abi;
            contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
            
            accountsList = await web3Instance.eth.getAccounts();
            
            console.log(" Web3 e Contratto inizializzati con successo.");
            console.log("Account rilevati:", accountsList);
            return true;
        }
    } catch (error) {
        console.error("errore inizializzazione:", error);
        return false;
    }
};

const getWeb3 = () => web3Instance;
const getContract = () => contractInstance;
const getAccounts = () => accountsList;

export { initWeb3, getWeb3, getContract, getAccounts };