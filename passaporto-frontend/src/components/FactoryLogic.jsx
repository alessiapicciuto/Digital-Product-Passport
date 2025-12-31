import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useFactory = () => {
    const [productId, setProductId] = useState('');
    const [details, setDetails] = useState('');
    const [water, setWater] = useState('');
    const [energy, setEnergy] = useState('');
    const [chemicals, setChemicals] = useState('');
    const [origin, setOrigin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTxHash(null);

        try {
            const contract = getContract();
            const accounts = getAccounts();
            
            const result = await contract.methods.updateFactory(
                productId, 
                details, 
                water, 
                energy, 
                chemicals, 
                origin
            ).send({ from: accounts[0], gas: 600000 });
                
            setTxHash(result.transactionHash);
        } catch (err) {
            console.error(err);
            setError("Errore durante l'invio: " + err.message);
        }
        setLoading(false);
    };

    return { 
        productId, setProductId, 
        details, setDetails, 
        water, setWater, 
        energy, setEnergy, 
        chemicals, setChemicals, 
        origin, setOrigin, 
        loading, error, txHash, handleUpdate 
    };
};

export default useFactory;