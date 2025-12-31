import { useState } from 'react';
import { getContract } from '../utils/web3-instance';

const useConsumer = () => {
    const [productId, setProductId] = useState('');
    const [passportData, setPassportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchPassport = async (event) => {
        if (event) event.preventDefault();
        setLoading(true);
        setError(null);
        setPassportData(null);

        try {
            const contract = getContract();
            const mainData = await contract.methods.getPassport(productId).call();
            
            let rawInfo = null;
            let factoryInfo = null;

            // Recupero automatico Materia Prima collegata
            if (mainData.linkedRawMaterialID && mainData.linkedRawMaterialID.trim() !== "") {
                try {
                    const rData = await contract.methods.getPassport(mainData.linkedRawMaterialID).call();
                    rawInfo = { area: rData.originLocation, method: rData.waterConsumption, certs: rData.energyConsumption };
                } catch (e) { console.warn("Materia prima non trovata:", e.message); }
            }

            // Recupero automatico Fabbrica collegata
            if (mainData.linkedFactoryID && mainData.linkedFactoryID.trim() !== "") {
                try {
                    const fData = await contract.methods.getPassport(mainData.linkedFactoryID).call();
                    factoryInfo = { name: fData.brandName, loc: fData.originLocation, water: fData.waterConsumption, energy: fData.energyConsumption };
                } catch (e) { console.warn("Fabbrica non trovata:", e.message); }
            }

            setPassportData({
                brand: mainData.brandName,
                details: mainData.brandDetails,
                composition: mainData.materialComposition,
                raw: rawInfo,
                factory: factoryInfo,
                audit: mainData.certifierNote,
                timestamp: new Date(Number(mainData.timestamp) * 1000).toLocaleString()
            });

        } catch (err) {
            console.error("Errore recupero dati:", err.message); // Risolve avviso ESLint
            setError("ID Prodotto non trovato nei registri blockchain.");
        } finally {
            setLoading(false);
        }
    };

    return { productId, setProductId, passportData, loading, error, handleFetchPassport };
};
export default useConsumer;