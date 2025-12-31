import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance'; 

const useProducer = () => {
    const [productId, setProductId] = useState('');
    const [originDetails, setOriginDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const contract = getContract();
        const accounts = getAccounts(); 

        try {
            const result = await contract.methods.registerBrandProduct(
                productId, 
                originDetails
            ).send({ from: accounts[0], gas: 500000 });

            setTxHash(result.transactionHash);
        } catch (err) {
            setError(`Errore: ${err.message}`);
        }
        setLoading(false);
    };

    return { productId, setProductId, originDetails, setOriginDetails, loading, error, txHash, handleRegistration };
};

export default useProducer;