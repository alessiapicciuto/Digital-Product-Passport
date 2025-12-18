// src/components/BrandView.jsx
import React from 'react';

function BrandView() {
  return (
    <section className="panel brand-view">
      <h2>Identità e sostenibilità dei Brand</h2>
    
      {/* Qui potrai aggiungere i campi per la storia aziendale, certificazioni generali, ecc. */}
      
      <form>
        <label>Nome del Brand:</label>
        <input type="text" placeholder="Es: Azienda Moda Italiana S.r.l." />
        <label>Certificazioni Aziendali (Link/Descrizione):</label>
        <textarea placeholder="ISO 9001, Certificazioni Sostenibilità..."></textarea>
        <label>Insersci certificazioni</label>
        <input type="file" accept="application/pdf" />
        <button type="submit">Carica i Dati del Brand</button>
      </form>
    </section>
  );
}

export default BrandView;