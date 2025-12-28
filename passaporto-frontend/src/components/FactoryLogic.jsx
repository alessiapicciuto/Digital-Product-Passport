import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance'; 

const useFactory = () => {
    const [productId, setProductId] = useState('');
    const [factoryData, setFactoryData] = useState({
        address: '',
        energyConsumption: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFactoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleFactoryRegistration = async (e) => {
        e.preventDefault();
        setError(null);
        setTxHash(null);
        setLoading(true);

        const contract = getContract();
        const accounts = getAccounts(); 

        if (!contract || accounts.length === 0) {
            setError('Errore: Connessione alla blockchain non riuscita.');
            setLoading(false);
            return;
        }

        try {
            // Uniamo i dati in una stringa perché il contratto accetta 2 argomenti totali
            const combinedDetails = `Indirizzo: ${factoryData.address}, Consumo: ${factoryData.energyConsumption} kWh`;

            // USARE updateFactory (come scritto nel tuo file .sol alla riga 23)
            const result = await contract.methods.updateFactory(
                productId, 
                combinedDetails
            ).send({ 
                from: accounts[0],
                gas: 500000 
            });

            setTxHash(result.transactionHash);
        } catch (err) {
            console.error("Errore transazione:", err);
            setError(`Errore: ${err.message || 'Verifica la console.'}`);
        }
        setLoading(false);
    };

    return {
        productId,
        setProductId,
        factoryData,
        handleChange,
        loading,
        error,
        txHash,
        handleFactoryRegistration,
    };
};

export default useFactory;