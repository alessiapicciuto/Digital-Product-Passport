import React from 'react';
import useFactory from './FactoryLogic';

function FactoryView() {
    const { 
        productId, setProductId,
        factoryData, handleChange, 
        loading, error, txHash, 
        handleFactoryRegistration 
    } = useFactory();

    return (
        <section className="panel factory-view">
            <h2>Dati dello Stabilimento e della Produzione</h2>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
                Inserisci l'ID del prodotto ricevuto dal fornitore per aggiornare il passaporto.
            </p>
            
            <form onSubmit={handleFactoryRegistration}>
                <div className="form-group">
                    <label>ID della materia prima tranformata nello stabilimento:</label>
                    <input 
                        type="text" 
                        placeholder="Es: TESSUTO-001"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        style={{ border: '2px solid #007bff' }} 
                    />
                </div>

                <div className="form-group">
                    <label>Indirizzo Stabilimento:</label>
                    <input 
                        type="text" 
                        name="address"
                        value={factoryData.address}
                        onChange={handleChange}
                        placeholder="Via dell'Industria, 10"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Consumo Energetico (kWh):</label>
                    <input 
                        type="number" 
                        name="energyConsumption"
                        value={factoryData.energyConsumption}
                        onChange={handleChange}
                        placeholder="Es: 5000"
                        required
                    />
                </div>
                
                <button type="submit" disabled={loading} className="save-btn">
                    {loading ? 'Registrazione in corso...' : 'Aggiorna Passaporto su Blockchain'}
                </button>
            </form>

            {/* Messaggi di feedback */}
            {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}
            
            {txHash && (
                <div className="success-box" style={{ marginTop: '15px', padding: '10px', border: '1px solid green', borderRadius: '5px' }}>
                    <p style={{ color: 'green', margin: 0 }}>✔ Dati Fabbrica Collegati con Successo!</p>
                    <p style={{ fontSize: '0.7em' }}>ID Transazione: {txHash}</p>
                </div>
            )}
        </section>
    );
}

export default FactoryView;