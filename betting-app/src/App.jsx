import React, { useState, useEffect } from 'react';
import { initialMatches } from './data/matches';
import MatchCard from './components/MatchCard';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';

function App() {
  const [apuestaActual, setApuestaActual] = useState(null);
  const [salaSeleccionada, setSalaSeleccionada] = useState('Todas');
  const [procesando, setProcesando] = useState(false);
  const [matches, setMatches] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  
  // NUEVOS ESTADOS: Saldo e Historial
  const [saldo, setSaldo] = useState(50000); 
  const [historial, setHistorial] = useState([]); // Estado para guardar las jugadas
  const nombreUsuario = "Jesús Gonzalez";
  const monto = 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches(initialMatches);
      setCargandoDatos(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelection = (partido, cuota) => {
    setApuestaActual({ partido, cuota });
  };

  // Función actualizada: Descuenta saldo y guarda en historial
  const confirmarApuesta = () => {
    if (saldo < monto) {
      alert("❌ Saldo insuficiente para realizar esta apuesta.");
      return;
    }

    setProcesando(true);
    setTimeout(() => {
      // Creamos el objeto de la nueva jugada
      const nuevaJugada = {
        id: Date.now(),
        partido: apuestaActual.partido,
        cuota: apuestaActual.cuota,
        monto: monto,
        fecha: new Date().toLocaleTimeString()
      };

      setSaldo(prev => prev - monto);
      setHistorial(prev => [nuevaJugada, ...prev]); // Agregamos la jugada al inicio del historial
      
      alert(`✅ ¡Pronóstico confirmado!`);
      setProcesando(false);
      setApuestaActual(null);
    }, 1500);
  };

  const partidosFiltrados = salaSeleccionada === 'Todas' 
    ? matches 
    : matches.filter(m => m.sala === salaSeleccionada);

  const btnStyle = { 
    padding: '8px 15px', 
    borderRadius: '20px', 
    border: '1px solid #00ff88', 
    background: 'transparent', 
    color: 'white', 
    cursor: 'pointer',
    margin: '0 5px'
  };

  return (
    <div className="app-container" style={{ paddingBottom: '150px', backgroundColor: '#121212', minHeight: '100vh' }}>
      
      <Header usuario={nombreUsuario} saldo={saldo} />

      <h1 style={{ textAlign: 'center', color: 'white', padding: '20px' }}>Salas de Apuestas</h1>

      <div className="salas-filter" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setSalaSeleccionada('Todas')} style={{...btnStyle, background: salaSeleccionada === 'Todas' ? '#00ff88' : 'transparent', color: salaSeleccionada === 'Todas' ? 'black' : 'white'}}>Todas</button>
        <button onClick={() => setSalaSeleccionada('Eliminatorias')} style={{...btnStyle, background: salaSeleccionada === 'Eliminatorias' ? '#00ff88' : 'transparent', color: salaSeleccionada === 'Eliminatorias' ? 'black' : 'white'}}>Eliminatorias</button>
        <button onClick={() => setSalaSeleccionada('La Liga')} style={{...btnStyle, background: salaSeleccionada === 'La Liga' ? '#00ff88' : 'transparent', color: salaSeleccionada === 'La Liga' ? 'black' : 'white'}}>La Liga</button>
      </div>

      {salaSeleccionada !== 'Todas' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Leaderboard sala={salaSeleccionada} />
        </div>
      )}
      
      <div className="matches-list">
        {cargandoDatos ? (
          <p style={{ color: '#00ff88', textAlign: 'center', marginTop: '20px' }}>Cargando eventos deportivos...</p>
        ) : (
          partidosFiltrados.map((partido) => (
            <MatchCard 
              key={partido.id} 
              match={partido} 
              onSelect={handleSelection} 
            />
          ))
        )}
      </div>

      {/* SECCIÓN DE HISTORIAL: Aparece debajo de la lista de partidos */}
      <div className="historial-container" style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #333' }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>Mis Últimos Pronósticos</h3>
        {historial.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No has realizado apuestas todavía.</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {historial.map(item => (
              <div key={item.id} style={{ background: '#1e1e1e', padding: '12px', borderRadius: '8px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #00ff88' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.partido}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>{item.fecha}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#00ff88', fontWeight: 'bold' }}>-${item.monto}</div>
                  <div style={{ fontSize: '0.75rem' }}>Cuota: {item.cuota}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {apuestaActual && (
        <div className="bet-slip" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#2a2a2a',
          color: 'white',
          padding: '20px',
          borderTop: '3px solid #00ff88',
          textAlign: 'center',
          boxShadow: '0 -5px 15px rgba(0,0,0,0.5)',
          zIndex: 1000
        }}>
          <p style={{ margin: '5px 0' }}><strong>{apuestaActual.partido}</strong></p>
          <p style={{ margin: '5px 0' }}>Cuota: {apuestaActual.cuota}</p>
          <p style={{ margin: '5px 0' }}>Ganancia Estimada: <span style={{color: '#00ff88'}}>${(monto * apuestaActual.cuota).toFixed(2)}</span></p>
          
          <button 
            onClick={confirmarApuesta}
            disabled={procesando}
            style={{
              background: procesando ? '#555' : '#00ff88',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '10px',
              cursor: procesando ? 'not-allowed' : 'pointer'
            }}
          >
            {procesando ? 'Procesando...' : 'Confirmar Pronóstico'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;