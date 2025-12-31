import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useProducer = () => {
    const [productId, setProductId] = useState('');
    const [originArea, setOriginArea] = useState('');
    const [harvestMethod, setHarvestMethod] = useState('');
    const [certifications, setCertifications] = useState('');
    const [details, setDetails] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleRegisterRawMaterial = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            const contract = getContract();
            const accounts = getAccounts();
            

            const result = await contract.methods.registerRawMaterial(
                productId, 
                originArea,
                harvestMethod,
                certifications,
                details
            ).send({ from: accounts[0], gas: 600000 });
                
            setTxHash(result.transactionHash);
        } catch (err) {
            console.error(err);
            setError("Errore nella registrazione: " + err.message);
        }
        setLoading(false);
    };

    return { 
        productId, setProductId, 
        originArea, setOriginArea,
        harvestMethod, setHarvestMethod,
        certifications, setCertifications,
        details, setDetails, 
        loading, error, txHash, handleRegisterRawMaterial 
    };
};

export default useProducer;