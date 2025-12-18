// File: src/App.jsx

import './App.css'; 
import React, { useState, useEffect } from 'react'; 
import { initWeb3 } from './utils/web3-instance'; 

import ProducerPanel from './components/ProducerPanel'; 
import ConsumerView from './components/ConsumerView';
import BrandView from './components/BrandView'; 
import CertifierView from './components/CertifierView';
import FactoryView from './components/FactoryView';


function App() {
    const [currentView, setCurrentView] = useState('producer');
    // Stati per la connessione Blockchain
    const [isReady, setIsReady] = useState(false);
    const [hasError, setHasError] = useState(false);


    // GESTIONE DELLA CONNESSIONE ASINCRONA
    useEffect(() => {
        const checkInit = async () => {
            const success = await initWeb3();
            
            if (success) {
                setIsReady(true);
            } else {
                setHasError(true);
            }
        };
        checkInit();
    }, []); 


    // RENDERING IN CASO DI ERRORE CRITICO (Connessione Fallita)
    if (hasError) {
        return (
            <div className="container" style={{ color: 'red', textAlign: 'center', padding: '50px' }}>
                <h1>❌ ERRORE DI CONNESSIONE CRITICO</h1>
                <p>Non è stato possibile connettersi alla blockchain. Controlla che Hardhat sia attivo (porta 8545).</p>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Passaporto Digitale del Made In Italy sostenibile</h1>
            </header>
            
            {/* RENDERING DELL'INTERFACCIA SOLO SE isReady è TRUE */}
            {isReady ? (
                <>
                    {/* Menu di navigazione */}
                    <nav className="navigation">
                        <button
                            className={currentView === 'producer' ? 'active' : ''}
                            onClick={() => setCurrentView('producer')}
                        >
                            Produttore: Registra Prodotto
                        </button>
                        <button
                            className={currentView === 'consumer' ? 'active' : ''}
                            onClick={() => setCurrentView('consumer')}
                        >
                            Consumatore: Traccia Prodotto
                        </button>
                        <button
                            className={currentView === 'brand' ? 'active' : ''}
                            onClick={() => setCurrentView('brand')}
                            >
                            Brand: Registra Articolo
                        </button>
                        <button
                            className={currentView === 'certifier' ? 'active' : ''}
                            onClick={() => setCurrentView('certifier')}
                        >
                            Ente Certificante: Convalida Certificazioni
                        </button>
                        <button
                            className={currentView === 'factory' ? 'active' : ''}
                            onClick={() => setCurrentView('factory')}
                        >
                            Fabbrica: Gestione Produzione
                        </button>
                    </nav>
            
                    {/* Rendering condizionale dei pannelli */}
                    <main className="content">
                        {currentView === 'producer' && <ProducerPanel />}
                        {currentView === 'consumer' && <ConsumerView />}
                        {currentView === 'brand' && <BrandView />}
                        {currentView === 'certifier' && <CertifierView />}
                        {currentView === 'factory' && <FactoryView />}
                    </main>
                </>
            ) : (
                // MOSTRA L'ATTESA SE isReady è FALSE
                <div style={{ padding: '50px', border: '1px solid #ccc', textAlign: 'center', marginTop: '50px' }}>
                    <h2>Connessione alla Blockchain in corso...</h2>
                    <p>Attendere il caricamento delle librerie Web3.</p>
                </div>
            )}
            
        </div>
    );
}

export default App;