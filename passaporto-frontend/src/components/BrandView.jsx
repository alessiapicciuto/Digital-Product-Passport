// src/components/BrandView.jsx
import React from 'react';

function BrandView() {
  return (
    <section className="panel brand-view">
      <h2>Identità e sostenibilità dei Brand</h2>
     
      <form>
        <label>Nome del Brand:</label>
        <input type="text" placeholder="Es: Azienda Moda Italiana " />
        <label>Certificazioni Aziendali:</label>
        <textarea placeholder="Certificazioni Sostenibilità..."></textarea>
        <label>Insersci certificazioni</label>
        <input type="file" accept="application/pdf" />
        <button type="submit">Carica i Dati del Brand</button>
      </form>
    </section>
  );
}

export default BrandView;