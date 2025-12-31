import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

// ATTENZIONE: Questo indirizzo deve essere l'ultimo che esce dal terminale dopo il deploy!
const CONTRACT_ADDRESS = '0xEffc8058cf02d7658DBf1515d8BA3E0829D62C11';
const NETWORK_URL = 'http://127.0.0.1:7545'; 

let web3Instance = null;
let contractInstance = null;
let accountsList = [];

export const initWeb3 = async () => {
    try {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
            provider = new Web3.providers.HttpProvider(NETWORK_URL);
        }
        
        web3Instance = new Web3(provider);
        
        if (web3Instance) {
            const abi = ProductPassportArtifact.abi;
            contractInstance = new web3Instance.eth.Contract(abi, CONTRACT_ADDRESS);
            accountsList = await web3Instance.eth.getAccounts();
            
            console.log("Web3 e Contratto inizializzati con successo.");
            return true;
        }
    } catch (error) {
        console.error("Errore durante l'inizializzazione di Web3:", error);
        return false;
    }
};

// ESPORTAZIONI ESPLICITE (Risolvono gli errori in console)
export const getWeb3 = () => web3Instance;
export const getContract = () => contractInstance;
export const getAccounts = () => accountsList;