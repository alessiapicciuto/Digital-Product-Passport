import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useCertifier = () => {
   
    const [productId, setProductId] = useState('');
    const [note, setNote] = useState(''); 
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleCertify = async (e) => {
        if (e) e.preventDefault();
        
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            const contract = getContract();
            const accounts = await getAccounts(); 

            if (!contract) throw new Error("Contratto non inizializzato");
            if (!accounts || accounts.length === 0) throw new Error("Connetti MetaMask");

            
            const result = await contract.methods.certifyProduct(
                productId, 
                note
            ).send({ 
                from: accounts[0],
                gas: 400000 
            });
                
            setTxHash(result.transactionHash);
            
            
        } catch (err) {
            console.error("Errore Certificazione:", err);
            setError("Errore durante la convalida: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { 
        productId, 
        setProductId, 
        note, 
        setNote, 
        loading, 
        error, 
        txHash, 
        handleCertify 
    };
};

export default useCertifier;