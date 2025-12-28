import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useCertifier = () => {
    const [productId, setProductId] = useState('');
    const [statusNote, setStatusNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleCertification = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTxHash(null);
        
        const contract = getContract();
        const accounts = getAccounts();

        try {
            // Controllo preliminare: il prodotto esiste?
            const check = await contract.methods.getPassport(productId).call();
            if (check.timestamp === "0" || check.timestamp === 0) {
                throw new Error("ID Prodotto non trovato. Registralo prima nella sezione Brand.");
            }

            const result = await contract.methods.certifyProduct(
                productId,
                statusNote
            ).send({ from: accounts[0], gas: 500000 });

            setTxHash(result.transactionHash);
        } catch (err) {
            console.error(err);
            setError(err.message.includes("revert") 
                ? "Errore: Verifica che l'ID sia corretto e non già certificato." 
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return { productId, setProductId, statusNote, setStatusNote, handleCertification, loading, error, txHash };
};

export default useCertifier;