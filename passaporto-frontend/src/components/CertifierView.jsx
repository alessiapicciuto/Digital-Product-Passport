import React from 'react';
import useCertifier from './CertifierLogic';

function CertifierView() {
    const { productId, setProductId, note, setNote, loading, error, txHash, handleCertify } = useCertifier();

    return (
        <section className="panel certifier-view">
            <h2> Convalida da parte dell'Ente Certificante</h2>
            <form onSubmit={handleCertify}>
                <div className="form-group">
                    <label>Inserire l'ID del Prodotto da Certificare:</label>
                    <input 
                        type="text" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        required 
                        placeholder="es: MAGLIONE-IN-LANA-001 "
                    />
                </div>
                <div className="form-group">
                    <label>Inserire Esito Convalida Delle Certificazione:</label>
                    <textarea 
                        value={note} 
                        onChange={(e) => setNote(e.target.value)} 
                        required
                        placeholder="es: Cerificato della Sostenibiltà 2025 APPROVATO " 
                    />
                </div>
                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Inviando...' : 'Convalida Certificazione'}
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            {txHash && (
                <div className="tx-success"> 
                   <p><strong>Certificazione Riuscita</strong></p>
                   <p style={{ fontSize: '0.7rem' }}>Transazione Blockchain: {txHash}</p>
                </div>
            )}
        </section>
    );
}

export default CertifierView;