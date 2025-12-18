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
        // Se il timestamp è 0 (uint256 default in Solidity), il prodotto non esiste
        if (timestamp === '0' || !timestamp) return 'N/A';
        return new Date(parseInt(timestamp) * 1000).toLocaleString();
    };

    return (
        <section className="panel consumer-view">
            <h2>Traccia il Prodotto</h2>
            <p> Inserisci l'ID del prodotto </p>
            
            <input 
                type="text" 
                placeholder="ID prodotto" 
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
            />
            
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Ricerca in corso...' : 'Cerca'}
            </button>

            <div className="product-details">
                <h3>Risultati:</h3>
                
                {/* Visualizzazione errori */}
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                {/* Visualizzazione dei risultati */}
                {passportDetails && passportDetails.timestamp !== '0' ? (
                    <div className="passport-data">
                        <h4>Storico Prodotto ID: {productID}</h4>
                        <hr />
                        
                        <p><strong>Data Registrazione:</strong> {formatTimestamp(passportDetails.timestamp)}</p>
                        <p><strong>Produttore:</strong> {passportDetails.producer}</p>
                        <p style={{ fontSize: '0.8em', color: '#666' }}>Hash Origine: {passportDetails.originHash}</p>
                        
                        <hr />
                        
                        {/* Fabbrica */}
                        {passportDetails.factory !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <p><strong>Fabbrica:</strong> {passportDetails.factory}</p>
                                <p style={{ fontSize: '0.8em', color: '#666' }}>Hash Produzione: {passportDetails.factoryHash}</p>
                                <hr />
                            </>
                        )}

                        {/* Brand */}
                        <p><strong>Brand:</strong> {passportDetails.brand}</p>
                        <p style={{ fontSize: '0.8em', color: '#666' }}>Hash Brand: {passportDetails.brandHash}</p>
                        <hr />

                        {/* Certificatore */}
                        {passportDetails.certifier !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <p><strong>Certificatore:</strong> {passportDetails.certifier}</p>
                                <p style={{ fontSize: '0.8em', color: '#666' }}>Hash Certificazione: {passportDetails.certifierHash}</p>
                            </>
                        )}
                    </div>
                ) : (
                    /* Messaggio se non è stato ancora cercato nulla o se l'ID è vuoto */
                    !loading && !error && <p>Inserisci un ID valido per visualizzare il passaporto digitale.</p>
                )}
            </div> 
        </section> 
    );
}

export default ConsumerView;