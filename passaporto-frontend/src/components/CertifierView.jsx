import React from 'react';
import useCertifier from './CertifierLogic';

function CertifierView() {
    const { productId, setProductId, note, setNote, loading, error, txHash, handleCertify } = useCertifier();

    return (
        <section className="panel certifier-view">
            <h2>Ente Certificante: Convalida</h2>
            <form onSubmit={handleCertify}>
                <div className="form-group">
                    <label>ID Prodotto da certificare:</label>
                    <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Nota di Certificazione:</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Inviando...' : 'Convalida Certificazione'}
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            {txHash && (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #ffc107', borderRadius: '5px', backgroundColor: '#fff3cd' }}>
                    <p style={{ color: '#856404', margin: 0, fontWeight: 'bold' }}>✔ Certificazione Riuscita</p>
                    <p style={{ fontSize: '0.7em', wordBreak: 'break-all' }}>Hash: {txHash}</p>
                </div>
            )}
        </section>
    );
}
export default CertifierView;