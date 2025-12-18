// File: src/utils/web3-instance.js

import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

// Assicurati che questo indirizzo sia quello ottenuto dal tuo deploy (di solito 0x5FbDB23...)
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 
const NETWORK_URL = 'http://127.0.0.1:8545'; // Deve essere 8545 (Nodo Hardhat)

// Variabili che verranno assegnate internamente
let web3Instance = null;
let contractInstance = null;
let accountsList = [];

// Funzione principale asincrona per inizializzare tutto
const initWeb3 = async () => {
    try {
        let provider;
        
        // 1. Connessione al provider (MetaMask o Fallback)
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            // Fallback: Connessione diretta a Hardhat Node (8545)
            console.log('Nessun provider rilevato. Connessione a Hardhat Node (8545)...');
            provider = new Web3.providers.HttpProvider(NETWORK_URL);
        }
        
        web3Instance = new Web3(provider);
        
        if (CONTRACT_ADDRESS && web3Instance) {
            // 2. Creazione dell'istanza del Contratto
            const abi = ProductPassportArtifact.abi;
            contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
            
            // 3. Ottenere gli account
            accountsList = await web3Instance.eth.getAccounts();
            
            console.log("🟢 Web3 e Contratto inizializzati con successo.");
            return true;
        }

    } catch (error) {
        console.error("❌ ERRORE FATALE NELL'INIZIALIZZAZIONE WEB3:", error);
        return false;
    }
};

// Funzioni di accesso (GET) che devono essere usate nei componenti
const getWeb3 = () => web3Instance;
const getContract = () => contractInstance;
const getAccounts = () => accountsList;


// Esportiamo le funzioni
export { initWeb3, getWeb3, getContract, getAccounts };