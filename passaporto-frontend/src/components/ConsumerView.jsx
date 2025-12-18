import React from 'react';
import useConsumerLogic from './ConsumerLogic'; 

function ConsumerView() {
    const { 
        productID, setProductID, 
        passportDetails, 
        loading, error, 
        handleSearch 
    } = useConsumerLogic(); 

    const formatTimestamp = (timestamp) => {
        if (timestamp === '0' || !timestamp) return 'N/A';
        return new Date(parseInt(timestamp) * 1000).toLocaleString();
    };

    return (
        <section className="panel consumer-view">
            <h2>Traccia il Prodotto</h2>
            <p> Inserisci l'ID del prodotto </p>

            {/* Collega l'Input allo stato productID */}
            <input 
                type="text" 
                placeholder="ID prodotto" 
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
            />
            
            {/* Collega il Pulsante alla funzione di ricerca */}
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Ricerca in corso...' : 'Cerca'}
            </button>

            <div className="product-details">
                <h3>Risultati:</h3>
                
                {/* Visualizzazione errori */}
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                {/* Visualizzazione dei risultati se passportDetails è popolato */}
                {passportDetails ? (
                    <div>
                        <h4>Storico Prodotto ID: {productID}</h4>
                        <hr />
                        
                        <p><strong>Data Registrazione:</strong> {formatTimestamp(passportDetails.timestamp)}</p>
                        
                        <p><strong> Produttore:</strong> {passportDetails.producer}</p>
                        <p>Hash Dati Iniziali: {passportDetails.originHash}</p>
                        
                        <hr />
                        
                        {/* Fabbrica: appare solo se l'indirizzo è diverso da zero */}
                        {passportDetails.factory !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <p><strong>🏭 Fabbrica:</strong> {passportDetails.factory}</p>
                                <p>Hash Dati Produzione: {passportDetails.factoryHash}</p>
                                <hr />
                            </>
                        )}

                        <p><strong> Brand:</strong> {passportDetails.brand}</p>
                        <p>Hash Dati Brand: {passportDetails.brandHash}</p>

                        {/* Certificatore: appare solo se l'indirizzo è diverso da zero */}
                        {passportDetails.certifier !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <p><strong> Certificatore:</strong> {passportDetails.certifier}</p>
                                <p>Hash Certificazione: {passportDetails.certifierHash}</p>
                            </>
                        )}
                        
                    </div>
                ) : (
                    // Messaggio iniziale o di assenza di risultati
                    <p>Dettagli non ancora caricati. Inserisci l'ID e cerca.</p>
                )}
            </div>
        </section>
    );
}

export default ConsumerView;