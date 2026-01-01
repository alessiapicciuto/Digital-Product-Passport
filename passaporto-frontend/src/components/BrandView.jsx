import React from 'react';
import useBrand from './BrandLogic';

function BrandView() {
    const { 
        productId, setProductId, 
        brandName, setBrandName, 
        rawMaterialID, setRawMaterialID, 
        materials, setMaterials, 
        brandDetails, setBrandDetails, 
        loading, error, txHash, 
        handleBrandRegistration 
    } = useBrand();

    return (
        <section className="panel">
            <h2>Registrazione Brand e Articolo</h2>
            <form onSubmit={handleBrandRegistration}>
            
                <div className="form-group">
                    <label>Inserire il Nome del Brand:</label>
                    <input 
                        type="text" 
                        value={brandName} 
                        onChange={(e) => setBrandName(e.target.value)} 
                        required 
                        placeholder="es: BRAND-001"
                    />
                </div>

                <div className="form-group">
                    <label>Inserire ID del prodotto che si intende registrare:</label>
                    <input 
                        type="text" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        required 
                        placeholder="es: MAGLIONE-IN-LANA-001"
                    />
                </div>

                <div className="form-group">
                    <label>Inserire l'ID del Lotto della Materia Prima:</label>
                    <input 
                        type="text" 
                        value={rawMaterialID} 
                        onChange={(e) => setRawMaterialID(e.target.value)} 
                        required
                        placeholder="es: LOTTO-001" 
                    />
                </div>

                <div className="form-group">
                    <label>Elencare la Composizione dei Materiali del Capo:</label>
                    <input 
                        type="text" 
                        value={materials} 
                        onChange={(e) => setMaterials(e.target.value)} 
                        required 
                        placeholder="es: 100% LANA"
                    />
                </div>

                <div className="form-group">
                    <label>Dettagli Aggiuntivi Articolo:</label>
                    <textarea 
                        value={brandDetails} 
                        onChange={(e) => setBrandDetails(e.target.value)} 
                        required 
                        placeholder="Specifiche tecniche o note del brand"
                    />
                </div>

                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? "Registrazione..." : "Registra Brand"}
                </button>
            </form>
            
            {txHash && <div className="tx-success">Registrazione Riuscita. Hash: {txHash}</div>}
            {error && <p className="error-text">{error}</p>}
        </section>
    );
}

export default BrandView;