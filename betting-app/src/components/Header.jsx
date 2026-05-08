import React from 'react';

const Header = ({ usuario, saldo }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      background: '#1a1a1a',
      borderBottom: '1px solid #333',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1100
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#00ff88' }}>BetApp</h2>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>{usuario}</p>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#00ff88' }}>
          Saldo: ${saldo.toLocaleString()}
        </p>
      </div>
    </header>
  );
};

export default Header;