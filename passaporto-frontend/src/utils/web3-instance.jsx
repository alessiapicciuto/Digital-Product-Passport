import Web3 from 'web3';
import ProductPassportArtifact from '../contracts/ProductPassport.json';

// ATTENZIONE: Questo indirizzo deve essere modificato ogni voltra che si esgue il comando npx hardhat run scripts/deploy.cjs --network localhost 
// e assieme a questo va cambiato anche il file che si trova in passaporto-frontend/contracts/ProdictPassaort 
// con il codice presente in passaorto-blockchain/artifacts/contracts/ productpassaport dopo aver esguito il comando npx hardhat compile
const CONTRACT_ADDRESS = '0x926B34A2e3380a81Df3a08875cDadE9635f2E29B';
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

export const getWeb3 = () => web3Instance;
export const getContract = () => contractInstance;
export const getAccounts = () => accountsList;