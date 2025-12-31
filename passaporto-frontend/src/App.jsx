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
                <h1>Errore di Connessione</h1>
                <p>Verifica che Ganache sia attivo e MetaMask connesso.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Passaporto Digitale del Made In Italy Sostenibile</h1>
            </header>
            
            {isReady ? (
                <>
                    <nav className="navigation">
                        <button className={currentView === 'producer' ? 'active' : ''} onClick={() => setCurrentView('producer')}> Produttore di Materie Prime</button>
                        <button className={currentView === 'factory' ? 'active' : ''} onClick={() => setCurrentView('factory')}> Fabbrica </button>
                        <button className={currentView === 'brand' ? 'active' : ''} onClick={() => setCurrentView('brand')}> Brand</button>
                        <button className={currentView === 'certifier' ? 'active' : ''} onClick={() => setCurrentView('certifier')}> Ente Certificante </button>
                        <button className={currentView === 'consumer' ? 'active' : ''} onClick={() => setCurrentView('consumer')}> Consumatore </button>
                    </nav>
            
                    <main className="content">
                        {currentView === 'producer' && <ProducerPanel />}
                        {currentView === 'factory' && <FactoryView />}
                        {currentView === 'brand' && <BrandView />}
                        {currentView === 'certifier' && <CertifierView />}
                        {currentView === 'consumer' && <ConsumerView />}
                    </main>
                </>
            ) : (
                <div className="loading-screen">
                    <h2>Connessione alla Blockchain in corso...</h2>
                </div>
            )}
        </div>
    );
}

export default App;