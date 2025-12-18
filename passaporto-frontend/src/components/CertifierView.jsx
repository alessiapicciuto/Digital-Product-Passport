// src/components/Certifier.jsx
import React from 'react';

function CertifierView() {
  return (
    <section className="panel certifying-view">
      <h2>Dati dell'Ente Certificatore </h2>
      
      <form>
        <label>Nome dell'Ente:</label>
        <input type="text" />
            
        <button type="submit">Salva i Dati dell'Ente</button>
      </form>
    </section>
  );
}

export default CertifierView;
