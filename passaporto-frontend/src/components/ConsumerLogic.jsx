// File: src/components/consumerLogic.jsx

import { useState } from 'react';
//IMPORTIAMO LA FUNZIONE GET
import { getContract } from '../utils/web3-instance'; 

const useConsumer = () => {
    const [searchId, setSearchId] = useState('');
    const [passportDetails, setPassportDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Gestione della ricerca
    const handleSearch = async (e) => {
    e.preventDefault()

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
            if (result.id === '' || result.origin === '') {
                setError(`Passaporto non trovato per ID: ${searchId}`);
                setPassportDetails(null);
            } else {
                setPassportDetails({
                    id: result.id,
                    origin: result.origin,
                    timestamp: new Date(Number(result.timestamp) * 1000).toLocaleString(),
                    certified: result.certified
                });
            }
            
        } catch (err) {

            console.error("Errore durante la ricerca del passaporto:", err);
            setError('Errore durante la ricerca');        }
        setLoading(false);
    };

    return {
        searchId,
        setSearchId,
        passportDetails,
        loading,
        error,
        handleSearch,
    };
};

export default useConsumer;