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
    
    const [isReady, setIsReady] = useState(false);
    const [hasError, setHasError] = useState(false);

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


    
    if (hasError) {
        return (
            <div className="container" style={{ color: 'red', textAlign: 'center', padding: '50px' }}>
                <h1>errore di connessione </h1>
                <p>Non è stato possibile connettersi alla blockchain.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Passaporto Digitale del Made In Italy sostenibile</h1>
            </header>
            
            {isReady ? (
                <>

                    <nav className="navigation">
                        <button
                            className={currentView === 'producer' ? 'active' : ''}
                            onClick={() => setCurrentView('producer')}
                        >
                            Produttore: Registra Prodotto
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
                        <button
                            className={currentView === 'consumer' ? 'active' : ''}
                            onClick={() => setCurrentView('consumer')}
                        >
                            Consumatore: Traccia Prodotto
                        </button>
                    </nav>
            
                    <main className="content">
                        {currentView === 'producer' && <ProducerPanel />}
                        {currentView === 'consumer' && <ConsumerView />}
                        {currentView === 'brand' && <BrandView />}
                        {currentView === 'certifier' && <CertifierView />}
                        {currentView === 'factory' && <FactoryView />}
                    </main>
                </>
            ) : (
                
                <div style={{ padding: '50px', border: '1px solid #ccc', textAlign: 'center', marginTop: '50px' }}>
                    <h2>Connessione alla Blockchain</h2>
                </div>
            )}
            
        </div>
    );
}

export default App;