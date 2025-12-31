import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useBrand = () => {
    const [productId, setProductId] = useState('');
    const [brandName, setBrandName] = useState(''); 
    const [rawMaterialID, setRawMaterialID] = useState('');
    const [materials, setMaterials] = useState('');
    const [brandDetails, setBrandDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleBrandRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const contract = getContract();
            const accounts = getAccounts();
            
        
            const result = await contract.methods.registerBrandProduct(
                productId, 
                brandName, 
                brandDetails, 
                materials, 
                rawMaterialID
            ).send({ from: accounts[0], gas: 600000 });
            
            setTxHash(result.transactionHash);
        } catch (err) { 
            setError("Errore: " + err.message); 
        }
        setLoading(false);
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