import React from 'react';
import useConsumerLogic from './consumerLogic'; 

function ConsumerView() {
    const { productID, setProductID, passportDetails, loading, error, handleSearch } = useConsumerLogic(); 

    const formatDate = (ts) => new Date(Number(ts) * 1000).toLocaleString();

    return (
        <section className="panel consumer-view">
            <h2>Tracciabilità Blockchain</h2>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="ID Prodotto commerciale" 
                    value={productID}
                    onChange={(e) => setProductID(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>Cerca</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {passportDetails && (
                <div className="passport-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h3>📦 Passaporto Digitale: {productID}</h3>
                    <p><strong>Data Creazione:</strong> {formatDate(passportDetails.timestamp)}</p>
                    <hr />
                    <h4>🏢 Info Brand</h4>
                    <p>{passportDetails.brandDetails}</p>
                    <hr />
                    <h4>🏭 Info Fabbrica</h4>
                    <p>{passportDetails.factoryDetails || "Dati non ancora inseriti"}</p>
                    <hr />
                    <div style={{ backgroundColor: passportDetails.certifierNote ? '#d4edda' : '#fff3cd', padding: '10px' }}>
                        <h4>🛡️ Validazione Ente</h4>
                        <p>{passportDetails.certifierNote || "In attesa di certificazione ufficiale"}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ConsumerView;