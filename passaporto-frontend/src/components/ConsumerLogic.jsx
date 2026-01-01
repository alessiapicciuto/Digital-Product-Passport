import { useState } from 'react';
import { getContract } from '../utils/web3-instance';

const useConsumer = () => {
    const [productId, setProductId] = useState('');
    const [passportData, setPassportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funzione di utilità per estrarre i dati dalla stringa della Factory
    const parseFactoryString = (str) => {
        if (!str) return { location: '', water: '', energy: '' };
        
        const parts = str.split('|').map(p => p.trim());
        const extract = (prefix) => {
            const part = parts.find(p => p.startsWith(prefix));
            return part ? part.split(':')[1]?.trim() : "Dato non disponibile";
        };

        return {
            location: extract("Località"),
            water: extract("Acqua"),
            energy: extract("Energia")
        };
    };

    const handleFetchPassport = async (e) => {
        if (e) e.preventDefault();
        
        setLoading(true);
        setError(null);
        setPassportData(null);

        try {
            const contract = getContract();
            if (!contract) throw new Error("Contratto non inizializzato");

            // Chiamata allo smart contract
            const data = await contract.methods.getProductPassport(productId).call();

            // Elaboriamo i dati della fabbrica (che nel contratto sono in factoryLocation)
            const parsedFactory = parseFactoryString(data.factoryLocation);

            // Mappatura finale per la ConsumerView
            const formattedData = {
                brandName: data.brandName,
                materialComposition: data.composition,
                linkedRawMaterialID: data.rawId,
                linkedFactoryID: data.factoryId,
                
                // Dati della materia prima (mappati da ProducerLogic)
                rawInfo: {
                    area: data.rawArea,
                    method: data.rawMethod,
                    certs: data.rawCerts
                },
                
                // Dati della fabbrica (estratti dalla stringa aggregata)
                factoryInfo: {
                    location: parsedFactory.location,
                    water: parsedFactory.water,
                    energy: parsedFactory.energy
                },
                
                certifierNote: data.certificationNote,
                timestamp: new Date().toLocaleDateString()
            };

            setPassportData(formattedData);

        } catch (err) {
            console.error("Errore nel recupero passaporto:", err);
            setError("ID Prodotto non trovato o errore nella comunicazione con la Blockchain.");
        } finally {
            setLoading(false);
        }
    };

    return { 
        productId, 
        setProductId, 
        passportData, 
        loading, 
        error, 
        handleFetchPassport 
    };
};

export default useConsumer;