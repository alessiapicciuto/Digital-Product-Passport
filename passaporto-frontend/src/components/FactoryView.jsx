import React, { useState } from 'react';
import useFactory from './FactoryLogic';

function FactoryView() {
    // Etichette e stati locali per mantenere invariata l'interfaccia
    const [origin, setOrigin] = useState('');
    const [water, setWater] = useState('');
    const [energy, setEnergy] = useState('');
    const [chemicals, setChemicals] = useState('');
    const [details, setDetails] = useState('');

    const { 
        productId, setProductId, 
        setFactoryData,
        loading, error, txHash, handleUpdate 
    } = useFactory();

    const preHandleUpdate = (e) => {
        e.preventDefault();
        // Aggreghiamo i dati in un'unica stringa per la logica a 2 parametri
        const aggregatedData = `Località: ${origin} | Acqua: ${water} | Energia: ${energy} | Chimica: ${chemicals} | Note: ${details}`;
        setFactoryData(aggregatedData);
        handleUpdate(e);
    };

    return (
        <section className="panel">
            <h2> Gestione Produzione degli Articoli Semilavorati </h2>
            <form onSubmit={preHandleUpdate}>
                <div className="form-group">
                    <label> Inserire l'ID del Prodotto registrato dal produttore:</label>
                    <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="es: LOTTO-001" required />
                </div>

                <div className="form-group">
                    <label>Inserire il Luogo di Trasformazione della Materia Prima in Prodotto Semilavorato:</label>
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="es: Bari, Italia" required />
                </div>

                <div className="form-group">
                    <label>Inserire il Consumo Idrico per la Produzione:</label>
                    <input type="text" value={water} onChange={(e) => setWater(e.target.value)} placeholder="es: 500 litri" />
                </div>

                <div className="form-group">
                    <label>Inserire il Consumo Elettrico per la Produzione :</label>
                    <input type="text" value={energy} onChange={(e) => setEnergy(e.target.value)} placeholder="es: 500 kWh" />
                </div>

                <div className="form-group">
                    <label>Elencare le Sostanze Chimiche e/o Trattamenti:</label>
                    <textarea value={chemicals} onChange={(e) => setChemicals(e.target.value)} placeholder="Descrivere trattamenti" />
                </div>

                <div className="form-group">
                    <label>Inserire eventuali Dettagli Tecnici:</label>
                    <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Specifiche industriali" />
                </div>

                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Aggiornamento in corso...' : 'Invia Dati Produzione'}
                </button>
            </form>

            {txHash && (
                <div className="tx-success">
                    <p><strong>Dati salvati con successo</strong></p>
                    <p style={{ fontSize: '0.8rem' }}>Transazione Blockchain: {txHash}</p>
                </div>
            )}
            {error && <p className="error-text">{error}</p>}
        </section>
    );
}

export default FactoryView;