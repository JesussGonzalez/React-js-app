import React from 'react';
import { leaderboardData } from '../data/leaderboard';

const Leaderboard = ({ sala }) => {
  // Filtramos los usuarios por la sala actual
  const usuariosSala = leaderboardData
    .filter(u => u.sala === sala)
    .sort((a, b) => b.points - a.points); // Ordenamos de mayor a menor puntaje

  return (
    <div className="leaderboard" style={{
      background: '#1e1e1e',
      color: 'white',
      borderRadius: '12px',
      padding: '15px',
      margin: '10px',
      border: '1px solid #00ff88'
    }}>
      <h3 style={{ color: '#00ff88', textAlign: 'center', marginBottom: '10px' }}>
        Ranking: {sala}
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Pos</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Usuario</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {usuariosSala.map((user, index) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '8px' }}>{index + 1}º</td>
              <td style={{ padding: '8px' }}>{user.name}</td>
              <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuariosSala.length === 0 && <p style={{textAlign: 'center', fontSize: '0.8rem'}}>Seleccioná una sala para ver el ranking</p>}
    </div>
  );
};

export default Leaderboard;