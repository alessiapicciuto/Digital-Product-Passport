import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useFactory = () => {

    const [productId, setProductId] = useState('');
    const [factoryData, setFactoryData] = useState(''); 
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    
    const handleUpdate = async (e) => {
        if (e) e.preventDefault();
        
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            const contract = getContract();
            const accounts = await getAccounts(); 

            if (!contract) throw new Error("Contratto non inizializzato");
            if (!accounts || accounts.length === 0) throw new Error("Connetti MetaMask");

            
            const result = await contract.methods.updateProductData(
                productId, 
                factoryData
            ).send({ 
                from: accounts[0],
                gas: 500000 
            });
                
            setTxHash(result.transactionHash);
            
        } catch (err) {
            console.error("Errore durante l'aggiornamento:", err);
            setError("Errore nell'aggiornamento blockchain: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { 
        productId, 
        setProductId, 
        setFactoryData, 
        loading, 
        error, 
        txHash, 
        handleUpdate 
    };
};

export default useFactory;