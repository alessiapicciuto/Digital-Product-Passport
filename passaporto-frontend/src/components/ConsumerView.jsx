import React from 'react';
import useConsumer from './ConsumerLogic';
import { QRCodeSVG } from 'qrcode.react';

const DataRow = ({ label, value }) => (
    <div className="data-row">
        <span className="data-label">{label}:</span>
        <span className="data-value">{value || "Dato non disponibile"}</span>
    </div>
);

function ConsumerView() {
    const { productId, setProductId, passportData, loading, error, handleFetchPassport } = useConsumer();

    return (
        <section className="consumer-view-container">
            <header className="header-minimal">
                <h2>Tracciabilità Digitale</h2>
            </header>

            <form onSubmit={handleFetchPassport} className="search-interface">
                <input 
                    type="text" className="input-field" 
                    value={productId} onChange={(e) => setProductId(e.target.value)} 
                    placeholder="Inserisci ID Prodotto (es: MAGLIONE-IN-LANA-001)" required 
                />
                <button type="submit" className="btn-search" disabled={loading}>
                    {loading ? 'Cerca...' : 'Cerca'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {passportData && (
                <article className="passport-document animate-fade-in">
                    <div className="passport-header-box">
                        <QRCodeSVG value={`${window.location.origin}/?id=${productId}`} size={120} />
                        <div className="badge-container">
                            <span className="badge-label">Blockchain Verified ID</span>
                            <span className="badge-value">{productId}</span>
                        </div>
                    </div>

                    <div className="passport-body">
                        {/* SEZIONE BRAND */}
                        <section className="data-group">
                            <h4>Origine e Marchio</h4>
                            <DataRow label="Dettagli" value={passportData.brandName} />
                            <DataRow label="Composizione" value={passportData.materialComposition} />
                        </section>

                        {/* SEZIONE MATERIA PRIMA */}
                        {passportData.rawInfo && (
                            <section className="data-group highlight-green">
                                <h4>Dettagli Materia Prima (ID: {passportData.linkedRawMaterialID})</h4>
                                <DataRow label="Provenienza" value={passportData.rawInfo.area} />
                                <DataRow label="Metodo" value={passportData.rawInfo.method} />
                                <DataRow label="Certificazioni" value={passportData.rawInfo.certs} />
                            </section>
                        )}

                        {/* SEZIONE FABBRICA */}
                        {passportData.factoryInfo && (
                            <section className="data-group highlight-blue">
                                <h4>Impatto di Produzione (ID: {passportData.linkedFactoryID})</h4>
                                <DataRow label="Località" value={passportData.factoryInfo.location} />
                                <DataRow label="Consumo Idrico" value={passportData.factoryInfo.water} />
                                <DataRow label="Consumo Energetico" value={passportData.factoryInfo.energy} />
                            </section>
                        )}

                        <section className="data-group">
                            <h4>Stato della Verifica delle Certificazione</h4>
                            <div className="certification-box">
                                <strong>Esito:</strong> {passportData.certifierNote || "Verifica in corso"}
                            </div>
                        </section>
                    </div>

                    <footer className="passport-footer">
                        <time>Validazione: {passportData.timestamp}</time>
                        <p className="stamped">Registro Blockchain Immutabile</p>
                    </footer>
                </article>
            )}
        </section>
    );
}

export default ConsumerView;