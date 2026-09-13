import { useState, useEffect } from 'react';
import api from '../services/api';

export default function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      setError('Error al cargar los clientes. Asegúrate de que el backend esté en ejecución.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Clientes</h2>
        <button onClick={fetchCustomers} disabled={loading} className="btn-primary">
          {loading ? 'Cargando...' : 'Recargar lista'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}
      
      {!loading && !error && customers.length === 0 && (
        <div className="alert info">No existen clientes registrados.</div>
      )}

      {customers.length > 0 && (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Número de cuenta</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre || c.firstName}</td>
                  <td>{c.apellido || c.lastName}</td>
                  <td>{c.numeroCuenta || c.accountNumber}</td>
                  <td>${c.saldo !== undefined ? c.saldo : c.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
