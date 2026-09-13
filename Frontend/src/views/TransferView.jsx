import { useState } from 'react';
import api from '../services/api';

export default function TransferView() {
  const [form, setForm] = useState({ originAccount: '', destinationAccount: '', amount: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!form.originAccount || !form.destinationAccount || !form.amount) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const amountNum = Number(form.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('El monto debe ser un número mayor a 0 y no negativo.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/transactions', {
        senderAccountNumber: form.originAccount,
        receiverAccountNumber: form.destinationAccount,
        amount: amountNum
      });
      setMessage('Transferencia realizada con éxito.');
      setForm({ originAccount: '', destinationAccount: '', amount: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || 'Error al realizar la transferencia. Verifica las cuentas y el saldo.';
      setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-container">
      <h2>Realizar Transferencia</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Cuenta Origen:</label>
          <input
            type="text"
            value={form.originAccount}
            onChange={(e) => setForm({ ...form, originAccount: e.target.value })}
            placeholder="Ej: 123456"
          />
        </div>
        <div className="form-group">
          <label>Cuenta Destino:</label>
          <input
            type="text"
            value={form.destinationAccount}
            onChange={(e) => setForm({ ...form, destinationAccount: e.target.value })}
            placeholder="Ej: 654321"
          />
        </div>
        <div className="form-group">
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Ej: 100.50"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Procesando...' : 'Transferir Dinero'}
        </button>
      </form>
      
      {error && <div className="alert error">{error}</div>}
      {message && <div className="alert success">{message}</div>}
    </div>
  );
}
