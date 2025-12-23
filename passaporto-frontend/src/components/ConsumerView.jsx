import React from 'react';
import useConsumerLogic from './consumerLogic'; 

function ConsumerView() {
    const { 
        productID, setProductID, 
        passportDetails, 
        loading, error, 
        handleSearch 
    } = useConsumerLogic(); 

    const formatTimestamp = (ts) => {
        if (!ts || ts === '0') return 'N/A';
        return new Date(Number(ts) * 1000).toLocaleString();
    };

    return (
        <section className="panel consumer-view">
            <h2>Traccia il Prodotto</h2>
            <p>Inserisci l'ID del prodotto per consultare la blockchain</p>
            
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Esempio: prova001" 
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading || !productID}>
                    {loading ? 'Ricerca...' : 'Cerca'}
                </button>
            </div>

            <div className="product-results">
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                {passportDetails && (
                    <div className="passport-card" style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
                        <h4>Passaporto Digitale: {productID}</h4>
                        <p><strong>Data Registrazione:</strong> {formatTimestamp(passportDetails.timestamp)}</p>
                        
                        <hr />
                        <h5>1. Origine (Produttore)</h5>
                        <p>Wallet: <span style={{fontSize: '0.8em'}}>{passportDetails.producer}</span></p>
                        <p>Dettagli: {passportDetails.originHash}</p>

                        {/* Visualizza Fabbrica solo se registrata */}
                        {passportDetails.factory !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <hr />
                                <h5>2. Produzione (Fabbrica)</h5>
                                <p>Wallet: <span style={{fontSize: '0.8em'}}>{passportDetails.factory}</span></p>
                                <p>Dettagli: {passportDetails.factoryHash}</p>
                            </>
                        )}

                        {/* Visualizza Certificatore solo se registrata */}
                        {passportDetails.certifier !== '0x0000000000000000000000000000000000000000' && (
                            <>
                                <hr />
                                <h5>3. Certificazione</h5>
                                <p>Wallet: <span style={{fontSize: '0.8em'}}>{passportDetails.certifier}</span></p>
                                <p>Dettagli: {passportDetails.certifierHash}</p>
                            </>
                        )}
                    </div>
                )}
            </div> 
        </section> 
    );
}

export default ConsumerView;