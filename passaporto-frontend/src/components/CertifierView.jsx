import React from 'react';
import useCertifier from './CertifierLogic';

function CertifierView() {
    const { 
        productId, setProductId,
        statusNote, setStatusNote,
        handleCertification,
        loading, error, txHash 
    } = useCertifier();

    return (
        <section className="panel certifier-view">
            <h2>Area Ente Certificatore</h2>
            <p>Valida e conferma le dichiarazioni di sostenibilità sulla Blockchain</p>
            
            <form onSubmit={handleCertification}>
                <div className="form-group">
                    <label>ID Prodotto da Certificare:</label>
                    <input 
                        type="text" 
                        placeholder="Inserisci ID (es: BRAND-001)" 
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Esito della Verifica:</label>
                    <textarea 
                        placeholder="Es: Documentazione verificata. Prodotto conforme agli standard di sostenibilità." 
                        value={statusNote}
                        onChange={(e) => setStatusNote(e.target.value)}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <button type="submit" disabled={loading} className="cert-btn">
                    {loading ? 'Firma in corso...' : 'Rilascia Certificazione Digitale'}
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            {txHash && (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #28a745', borderRadius: '5px' }}>
                    <p style={{ color: '#28a745', fontWeight: 'bold' }}>✔ Certificazione Registrata!</p>
                    <p style={{ fontSize: '0.7em' }}>Il consumatore ora vedrà il bollino di garanzia.</p>
                </div>
            )}
        </section>
    );
}

export default CertifierView;