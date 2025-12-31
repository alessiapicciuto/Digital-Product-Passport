import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useFactory = () => {
    const [productId, setProductId] = useState('');
    const [factoryData, setFactoryData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null); // Aggiunto stato per l'Hash

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setTxHash(null);
        setLoading(true);

        const contract = getContract();
        const accounts = getAccounts();

        try {
            const result = await contract.methods.updateFactory(productId, factoryData)
                .send({ from: accounts[0], gas: 500000 });
            
            setTxHash(result.transactionHash); // Salviamo l'Hash invece dell'alert
        } catch (err) {
            setError(`Errore: ${err.message}`);
        }
        setLoading(false);
    };

    return { productId, setProductId, factoryData, setFactoryData, loading, error, txHash, handleUpdate };
};

export default useFactory;