import React from 'react';
import useFactory from './FactoryLogic';

function FactoryView() {
    const { productId, setProductId, factoryData, setFactoryData, loading, error, txHash, handleUpdate } = useFactory();

    return (
        <section className="panel factory-view">
            <h2>Fabbrica: Gestione Produzione</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>ID Prodotto da aggiornare:</label>
                    <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Dettagli Produzione:</label>
                    <textarea value={factoryData} onChange={(e) => setFactoryData(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Inviando...' : 'Aggiorna Dati Fabbrica'}
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            {txHash && (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #28a745', borderRadius: '5px', backgroundColor: '#d4edda' }}>
                    <p style={{ color: '#155724', margin: 0, fontWeight: 'bold' }}>✔ Registrazione Fabbrica Riuscita</p>
                    <p style={{ fontSize: '0.7em', wordBreak: 'break-all' }}>Hash: {txHash}</p>
                </div>
            )}
        </section>
    );
}
export default FactoryView;