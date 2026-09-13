import { useState } from 'react';
import CustomersView from './views/CustomersView';
import TransferView from './views/TransferView';
import HistoryView from './views/HistoryView';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Banca Universitaria - Lab 1</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'customers' ? 'active' : ''} 
            onClick={() => setActiveTab('customers')}
          >
            Clientes
          </button>
          <button 
            className={activeTab === 'transfer' ? 'active' : ''} 
            onClick={() => setActiveTab('transfer')}
          >
            Transferir Dinero
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            Historial
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'customers' && <CustomersView />}
        {activeTab === 'transfer' && <TransferView />}
        {activeTab === 'history' && <HistoryView />}
      </main>
      
      <footer className="app-footer">
        <p>Laboratorio 1 de Arquitectura de Software</p>
      </footer>
    </div>
  );
}

export default App;
