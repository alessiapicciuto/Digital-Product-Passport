import React from 'react';
import useProducer from './ProducerLogic';

function ProducerPanel() {
    const { 
        productId, setProductId, 
        originArea, setOriginArea,
        harvestMethod, setHarvestMethod,
        certifications, setCertifications,
        details, setDetails, 
        loading, error, txHash, handleRegisterRawMaterial 
    } = useProducer();

    return (
        <section className="panel">
            <h2> Origine Materia Prima </h2>
            <p className="subtitle">Inserire i dati relativi alla provenienza e alla prima lavorazione della materia.</p>
            
            <form onSubmit={handleRegisterRawMaterial}>
                <div className="form-group">
                    <label>Inserire l'ID del Lotto della Materia Prima:</label>
                    <input 
                        type="text" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        placeholder="es: LOTTO-001"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Inserire l'Area di Provenienza:</label>
                    <input 
                        type="text" 
                        value={originArea} 
                        onChange={(e) => setOriginArea(e.target.value)} 
                        placeholder="es: Puglia, Italia"
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Inserire il Metodo di Estrazione o Raccolta:</label>
                    <input 
                        type="text" 
                        value={harvestMethod} 
                        onChange={(e) => setHarvestMethod(e.target.value)} 
                        placeholder="es: Tosatura manuale / Agricoltura Rigenerativa"
                    />
                </div>

                <div className="form-group">
                    <label>Inserire le Certificazioni della Materia Prima:</label>
                    <input 
                        type="text" 
                        value={certifications} 
                        onChange={(e) => setCertifications(e.target.value)} 
                        placeholder="es: Certificato sostenibilità 2025 "
                    />
                </div>

                <div className="form-group">
                    <label>Inserire eventuali Note Aggiuntive:</label>
                    <textarea 
                        value={details} 
                        onChange={(e) => setDetails(e.target.value)} 
                        placeholder="es: Eventuali Specifiche tecniche"
                    />
                </div>

                <button type="submit" disabled={loading} className="brand-btn">
                    {loading ? 'Registrazione in corso...' : 'Registra Materia Prima'}
                </button>
            </form>

            {txHash && (
                <div className="tx-success">
                    <p><strong>Certificato d'Origine Creato</strong></p>
                    <p style={{ fontSize: '0.8rem' }}>Transazione Blockchain: {txHash}</p>
                </div>
            )}
            
            {error && <p className="error-text">{error}</p>}
        </section>
    );
}

export default ProducerPanel;