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
           
            <h2>Registrazione Marchio e Articolo</h2>
            
            <form onSubmit={handleBrandRegistration}>
                
                <div className="form-group">
                    <label>Inserire il Nome del Brand:</label>
                    <input 
                        type="text" 
                        value={brandName} 
                        onChange={(e) => setBrandName(e.target.value)} 
                        placeholder="es: BRAND-001"
                        required 
                    />
                </div>

            
                <div className="form-group">
                    <label>Inserire l'ID del prodotto che si intende registrare:</label>
                    <input 
                        type="text" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        placeholder="es: MAGLIONE-IN-LANA-001"
                        required 
                    />
                </div>

            
                <div className="form-group">
                    <label>Inserire l'ID del Lotto della Materia Prima:</label>
                    <input 
                        type="text" 
                        value={rawMaterialID} 
                        onChange={(e) => setRawMaterialID(e.target.value)} 
                        placeholder="es: LOTTO-001"
                        required 
                    />
                </div>

              
                <div className="form-group">
                    <label>Elenca la Composizione dei Materiali:</label>
                    <input 
                        type="text" 
                        value={materials} 
                        onChange={(e) => setMaterials(e.target.value)} 
                        placeholder="es: 100% LANA"
                        required 
                    />
                </div>

               
                <div className="form-group">
                    <label>Dettagli Aggiuntivi Articolo:</label>
                    <textarea 
                        value={brandDetails} 
                        onChange={(e) => setBrandDetails(e.target.value)} 
                        placeholder="Specifiche tecniche o note del marchio"
                        required 
                    />
                </div>

                
                <button type="submit" disabled={loading} className="btn-success">
                    {loading ? 'Registrazione...' : 'Registra Brand'}
                </button>
            </form>

            
            {txHash && (
                <div className="mt-3 alert alert-success">
                    Registrazione completata con successo! <br/>
                    Hash: {txHash}
                </div>
            )}
            {error && <p className="error-message mt-2">{error}</p>}
        </section>
    );
}

export default BrandView;