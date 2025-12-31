import { useState } from 'react';
import { getContract, getAccounts } from '../utils/web3-instance';

const useBrand = () => {
    const [productId, setProductId] = useState('');
    const [brandData, setBrandData] = useState({ brandName: '', certifications: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrandData(prev => ({ ...prev, [name]: value }));
    };

    const handleBrandRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        const contract = getContract();
        const accounts = getAccounts();

        try {
            const details = `Brand: ${brandData.brandName} - Cert: ${brandData.certifications}`;
            const result = await contract.methods.registerBrandProduct(productId, details)
                .send({ from: accounts[0], gas: 500000 });
            setTxHash(result.transactionHash);
        } catch (err) {
            setError("Errore: " + err.message);
        }
        setLoading(false);
    };

    return { productId, setProductId, brandData, handleChange, loading, error, txHash, handleBrandRegistration };
};

export default useBrand;