import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to="/writers">Scrittori e Scrittrici</Link>
      |
      <Link to="/libri">Libri</Link>
    </div>
  </header>
);

export default Navigation;
