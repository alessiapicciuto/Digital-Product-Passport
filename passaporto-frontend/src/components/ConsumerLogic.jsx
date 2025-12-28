import { useState } from 'react';
import { getContract } from '../utils/web3-instance'; 

const useConsumer = () => {
    const [searchId, setSearchId] = useState('');
    const [passportDetails, setPassportDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setError(null);
        setPassportDetails(null);
        setLoading(true);

        const contract = getContract();
        if (!contract) {
            setError('Errore: Connessione al contratto non stabilita.');
            setLoading(false);
            return;
        }

        try {
            const result = await contract.methods.getPassport(searchId).call();
            
            if (result.timestamp === "0") {
                setError(`Passaporto non trovato per ID: ${searchId}`);
            } else {
                setPassportDetails({
                    brand: result.producer,
                    factory: result.factory,
                    certifier: result.certifier,
                    brandDetails: result.originHash,
                    factoryDetails: result.factoryHash,
                    certifierNote: result.certifierHash,
                    timestamp: result.timestamp 
                });
            }
        } catch (err) {
            console.error("Errore ricerca:", err);
            setError("Prodotto non trovato o ID errato.");
        }
        setLoading(false);
    };

    return { productID: searchId, setProductID: setSearchId, passportDetails, loading, error, handleSearch };
};

export default useConsumer;