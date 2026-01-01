import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useBrand = () => {

    const [brandName, setBrandName] = useState('');
    const [productId, setProductId] = useState('');
    const [rawMaterialID, setRawMaterialID] = useState('');
    const [materials, setMaterials] = useState('');
    const [brandDetails, setBrandDetails] = useState('');
    
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    
    const handleBrandRegistration = async (e) => {
        if (e) e.preventDefault();
        
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            const contract = getContract();
            const accounts = await getAccounts(); 

            if (!contract) throw new Error("Contratto non inizializzato");
            if (!accounts || accounts.length === 0) throw new Error("Connetti MetaMask");

           
            const result = await contract.methods.registerBrandProduct(
                brandName,
                productId,
                rawMaterialID,
                materials,
                brandDetails
            ).send({ 
                from: accounts[0],
                gas: 600000 
            });
                
            setTxHash(result.transactionHash);
            
            
        } catch (err) {
            console.error("Errore registrazione Brand:", err);
            setError("Errore durante la registrazione: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { 
        productId, setProductId, 
        brandName, setBrandName, 
        rawMaterialID, setRawMaterialID, 
        materials, setMaterials, 
        brandDetails, setBrandDetails, 
        loading, error, txHash, 
        handleBrandRegistration 
    };
};

export default useBrand;