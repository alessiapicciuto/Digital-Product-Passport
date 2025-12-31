import React from 'react';
import useConsumer from './ConsumerLogic';

function ConsumerView() {
    const { productId, setProductId, passportData, loading, error, handleFetchPassport } = useConsumer();

    return (
        <section className="panel consumer-view">
            <h2>Tracciabilità Blockchain</h2>
            <form onSubmit={handleFetchPassport} className="mb-4">
                <div className="form-group d-flex gap-2">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Inserisci ID Prodotto (es: LANA-BIO-007)" 
                        value={productId} 
                        onChange={(e) => setProductId(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Ricerca...' : 'Cerca'}
                    </button>
                </div>
            </form>

            {error && <p className="alert alert-danger">{error}</p>}

            {passportData && (
                <div className="passport-results p-4 border rounded bg-white shadow-sm">
                    <h4>📦 Passaporto Digitale: {productId}</h4>
                    <p><strong>Creazione dati:</strong> {passportData.timestamp}</p>
                    <hr />

                    <div className="mb-3">
                        <h5>🏢 Informazioni sul marchio</h5>
                        <p>{passportData.brandDetails || "Dati non inseriti dal Brand"}</p>
                        <small className="text-muted">Registrato da: {passportData.brand}</small>
                    </div>
                    <hr />

                    <div className="mb-3">
                        <h5>🏭 Info Fabbrica</h5>
                        {passportData.factory !== "0x0000000000000000000000000000000000000000" ? (
                            <>
                                <p>{passportData.factoryHash}</p>
                                <small className="text-muted">Operato da: {passportData.factory}</small>
                            </>
                        ) : (
                            <p className="text-muted">Dati non ancora inseriti dalla fabbrica</p>
                        )}
                    </div>
                    <hr />

                    <div className="alert alert-info">
                        <h5>🛡️ Validazione Ente</h5>
                        {passportData.certifier !== "0x0000000000000000000000000000000000000000" ? (
                            <>
                                <p>{passportData.certifierNote}</p>
                                <small className="text-muted">Certificato da: {passportData.certifier}</small>
                            </>
                        ) : (
                            <p className="text-muted">In attesa di certificazione ufficiale</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ConsumerView;