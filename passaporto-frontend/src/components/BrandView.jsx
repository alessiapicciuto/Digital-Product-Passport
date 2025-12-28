// File: src/components/BrandView.jsx
import React from 'react';
import useBrand from './BrandLogic';

function BrandView() {
    const { 
        productId, setProductId,
        brandData, handleChange, 
        loading, error, txHash, 
        handleBrandRegistration 
    } = useBrand();

    return (
        <section className="panel brand-view">
            <h2>Identità e Sostenibilità del Brand</h2>
            <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
                In questa sezione il Brand definisce l'ID finale e dichiara le proprie certificazioni.
            </p>
            
            <form onSubmit={handleBrandRegistration}>
                <div className="form-group">
                    <label>ID Prodotto Finale (Etichetta):</label>
                    <input 
                        type="text" 
                        placeholder="Es: COLLEZIONE-2025-001"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nome del Brand:</label>
                    <input 
                        type="text" 
                        name="brandName"
                        value={brandData.brandName}
                        onChange={handleChange}
                        placeholder="Es: Azienda Moda Italiana"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Certificazioni Aziendali (Nomi):</label>
                    <textarea 
                        name="certifications"
                        value={brandData.certifications}
                        onChange={handleChange}
                        placeholder="Es: GOTS, OEKO-TEX, Fair Trade..."
                        rows="3"
                        required
                    ></textarea>
                </div>
                
                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Registrazione in corso...' : 'Registra Identità Brand'}
                </button>
            </form>

            {/* Feedback per l'utente */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            
            {txHash && (
                <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #007bff', borderRadius: '5px', backgroundColor: '#e7f3ff' }}>
                    <p style={{ color: '#007bff', margin: 0, fontWeight: 'bold' }}>✔ Identità Brand Registrata</p>
                    <p style={{ fontSize: '0.7em', wordBreak: 'break-all' }}>Transazione: {txHash}</p>
                </div>
            )}
        </section>
    );
}

export default BrandView;