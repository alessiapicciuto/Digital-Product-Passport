import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useCertifier = () => {
    const [productId, setProductId] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleCertify = async (e) => {
        e.preventDefault();
        setError(null);
        setTxHash(null);
        setLoading(true);

        const contract = getContract();
        const accounts = getAccounts();

        try {
            const result = await contract.methods.certifyProduct(productId, note)
                .send({ from: accounts[0], gas: 500000 });
            
            setTxHash(result.transactionHash);
        } catch (err) {
            setError(`Errore: ${err.message}`);
        }
        setLoading(false);
    };

    return { productId, setProductId, note, setNote, loading, error, txHash, handleCertify };
};

export default useCertifier;