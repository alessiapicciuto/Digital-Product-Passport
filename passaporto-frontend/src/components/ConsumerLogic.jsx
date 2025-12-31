import { useState } from 'react';
import { getContract } from '../utils/web3-instance';

const useConsumer = () => {
    const [productId, setProductId] = useState('');
    const [passportData, setPassportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchPassport = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        setPassportData(null);

        const contract = getContract();

        try {
            // Chiamata alla funzione getPassport del contratto
            const data = await contract.methods.getPassport(productId).call();
            
            // Mappatura dei dati basata sulla struct Passport del tuo .sol
            setPassportData({
                brand: data.brand,
                factory: data.factory,
                certifier: data.certifier,
                brandDetails: data.brandDetails,
                factoryHash: data.factoryHash,
                certifierNote: data.certifierNote,
                timestamp: new Date(Number(data.timestamp) * 1000).toLocaleString()
            });
        } catch (err) {
            console.error("Errore ricerca:", err);
            setError("Passaporto non trovato. Verifica l'ID o assicurati che il Brand l'abbia registrato.");
        }
        setLoading(false);
    };

    return { productId, setProductId, passportData, loading, error, handleFetchPassport };
};

export default useConsumer;