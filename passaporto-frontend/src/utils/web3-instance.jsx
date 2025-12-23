// File: src/utils/web3-instance.js

import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

// Indirizzo del contratto da aggiornare e verificare che sia lo stesso dopo aver fatto npx hardhat run scripts/deploy.cjs --network localhost ogni volta che si riavvia ganache 
const CONTRACT_ADDRESS = '0x16A2d0870c1E902D7Cc243269B56Bb3a3094308f';

// URL della rete locale Ganache configurata su MetaMask
const NETWORK_URL = 'http://127.0.0.1:7545'; 

let web3Instance = null;
let contractInstance = null;
let accountsList = [];

const initWeb3 = async () => {
    try {
        let provider;
        
        // Verifica se MetaMask (window.ethereum) è installato nel browser
        if (window.ethereum) {
            provider = window.ethereum;
            
            // Richiede all'utente di connettere l'account MetaMask al sito
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
            // Se MetaMask non c'è, usa il provider locale (fallback)
            console.log('MetaMask non rilevato. Uso il provider locale Ganache.');
            provider = new Web3.providers.HttpProvider(NETWORK_URL);
        }
        
        web3Instance = new Web3(provider);
        
        if (web3Instance) {
            const abi = ProductPassportArtifact.abi;
            // Inizializza l'istanza del contratto con ABI e Indirizzo
            contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
            
            // Recupera la lista degli account (quello importato da Ganache)
            accountsList = await web3Instance.eth.getAccounts();
            
            console.log("Web3 e Contratto inizializzati con successo.");
            console.log("Indirizzo contratto:", CONTRACT_ADDRESS);
            console.log("Account attivo:", accountsList[0]);
            return true;
        }
    } catch (error) {
        console.error("Errore durante l'inizializzazione di Web3:", error);
        return false;
    }
};

const getWeb3 = () => web3Instance;
const getContract = () => contractInstance;
const getAccounts = () => accountsList;

export { initWeb3, getWeb3, getContract, getAccounts };