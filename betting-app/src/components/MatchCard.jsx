import React, { useState } from 'react'; // Paso A: Importar useState
import './MatchCard.scss';

const MatchCard = ({ match, onSelect }) => { // Agregamos onSelect
  const [seleccion, setSeleccion] = useState(null);

  const manejarClick = (tipo, cuota) => {
    setSeleccion(tipo);
    onSelect(match.homeTeam + " vs " + match.awayTeam, cuota); // Avisamos al padre
  };

  return (
    <div className="match-card">
      <div className="match-info">
        <span className="status">{match.status}</span>
        <span className="time">{match.time}</span>
      </div>
      
      <div className="teams">
        <div className="team">
          <p>{match.homeTeam}</p>
          {/* Paso C: Cambiar estilo dinámicamente si es la selección */}
          <button 
            className={`odd-btn ${seleccion === 'home' ? 'selected' : ''}`}
            onClick={() => manejarClick('home', match.odds.home)} // <--- Agregado match.odds.home
          >
            {match.odds.home}
          </button>
        </div>

        <div className="vs">VS</div>

        <div className="team">
          <p>{match.awayTeam}</p>
          <button 
            className={`odd-btn ${seleccion === 'away' ? 'selected' : ''}`}
            onClick={() => manejarClick('away', match.odds.away)} // <--- Agregado match.odds.away
          >
            {match.odds.away}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;