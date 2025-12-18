// File: src/components/ProducerPanel.jsx

import React from 'react';
import useProducer from './ProducerLogic';

function ProducerPanel() {
    const { 
        productId, 
        setProductId, 
        originDetails, 
        setOriginDetails, 
        loading,
        error,
        txHash,
        handleRegistration 
    } = useProducer();

    return (
        <section className="panel producer-panel">
            <h2>Registra un Nuovo Capo</h2>
            <form onSubmit={handleRegistration}>
                <label htmlFor="productId">ID Prodotto:</label>
                <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={productId || ''} 
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Es: TESSUTO-001"
                    required
                />

                <label htmlFor="details">Dettagli della Produzione:</label>
                <textarea
                    id="details"
                    name="details"
                    rows="4"
                    value={originDetails || ''} 
                    onChange={(e) => setOriginDetails(e.target.value)}
                    placeholder="Luogo, Data, Tessuti ..."
                    required
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrazione in corso...' : 'Registra su Blockchain'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>Errore: {error}</p>}
            {txHash && (
                <p style={{ color: 'green' }}>
                    <a href={`http://localhost:8545/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
                        {txHash.substring(0, 15)}...
                    </a>
                </p>
            )}
        </section>
    );
}

export default ProducerPanel;