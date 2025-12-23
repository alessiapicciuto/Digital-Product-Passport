// File: src/components/consumerLogic.jsx
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
            // Chiamata alla funzione corretta del tuo contratto
            const result = await contract.methods.getPassport(searchId).call();
            
            // Verifichiamo se il timestamp è 0 (prodotto non esistente)
            if (result.timestamp === "0") {
                setError(`Passaporto non trovato per ID: ${searchId}`);
            } else {
                // Mappiamo i campi ESATTAMENTE come definiti nello Smart Contract
                setPassportDetails({
                    producer: result.producer,
                    factory: result.factory,
                    certifier: result.certifier,
                    originHash: result.originHash,
                    factoryHash: result.factoryHash,
                    certifierHash: result.certifierHash,
                    timestamp: result.timestamp // Passiamo il timestamp grezzo, lo formatta la View
                });
            }
        } catch (err) {
            console.error("Errore durante la ricerca:", err);
            setError("ID non trovato o errore di rete.");
        }
        setLoading(false);
    };

    return {
        productID: searchId,    // Nome allineato alla View
        setProductID: setSearchId, 
        passportDetails,
        loading,
        error,
        handleSearch,
    };
};

export default useConsumer;