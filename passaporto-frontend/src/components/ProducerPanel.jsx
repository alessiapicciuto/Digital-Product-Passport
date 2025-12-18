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
        txHash, // Questo conterrà l'hash dopo la registrazione
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

            {/* Visualizzazione errori */}
            {error && <p style={{ color: 'red' }}>Errore: {error}</p>}

            {/* 🟢 SICUREZZA: Mostra l'hash solo se esiste (risolve il crash) */}
            {txHash && (
                <div style={{ marginTop: '10px' }}>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Registrazione Riuscita!</p>
                    <p style={{ fontSize: '0.8em' }}>
                        Hash Transazione: 
                        <span style={{ color: '#007bff', marginLeft: '5px' }}>
                            {/* Verifichiamo che txHash sia una stringa prima di usare substring */}
                            {typeof txHash === 'string' ? txHash.substring(0, 20) + '...' : 'Dettagli disponibili'}
                        </span>
                    </p>
                </div>
            )}
        </section>
    );
}

export default ProducerPanel;