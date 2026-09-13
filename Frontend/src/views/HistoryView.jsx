import { useState } from 'react';
import api from '../services/api';

export default function HistoryView() {
  const [accountNumber, setAccountNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchHistory = async (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      setError('Ingresa un número de cuenta válido.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSearched(true);
    setTransactions([]);
    
    try {
      const response = await api.get(`/transactions/${accountNumber}`);
      setTransactions(response.data);
    } catch (err) {
      setError('Error al cargar el histórico. Verifica que el backend esté en ejecución.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-container">
      <h2>Histórico de Transacciones</h2>
      <form onSubmit={fetchHistory} className="form-card row-form">
        <div className="form-group">
          <label>Número de Cuenta:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Ej: 123456"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>

      {error && <div className="alert error">{error}</div>}

      {!loading && searched && transactions.length === 0 && !error && (
        <div className="alert info">No se encontraron transacciones para esta cuenta.</div>
      )}

      {transactions.length > 0 && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Monto</th>
                <th>Fecha/Hora</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => {
                const origen = t.cuentaOrigen || t.originAccount || t.senderAccountNumber;
                const destino = t.cuentaDestino || t.destinationAccount || t.receiverAccountNumber;
                const monto = t.monto !== undefined ? t.monto : t.amount;
                const fecha = t.fecha || t.date || t.timeStamp || t.timestamp || t.createdAt || '-';
                const isOrigen = origen === accountNumber;
                
                return (
                  <tr key={t.id || Math.random()}>
                    <td>{t.id}</td>
                    <td>{origen}</td>
                    <td>{destino}</td>
                    <td className={isOrigen ? 'text-red' : 'text-green'}>
                      {isOrigen ? '-' : '+'}${monto}
                    </td>
                    <td>{new Date(fecha).toLocaleString() !== 'Invalid Date' ? new Date(fecha).toLocaleString() : fecha}</td>
                    <td>
                      <span className={`badge ${isOrigen ? 'badge-red' : 'badge-green'}`}>
                        {isOrigen ? 'Envío' : 'Recepción'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
