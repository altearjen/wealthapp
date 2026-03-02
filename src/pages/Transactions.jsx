import { useState } from 'react';
import { transactions as initialTransactions, fmt, buildTransaction } from '../data';
import TransactionForm from '../components/TransactionForm';

const typeColors = {
  Buy: 'badge-green',
  Sell: 'badge-red',
  Dividend: 'badge-blue',
  Deposit: 'badge-purple',
  Withdrawal: 'badge-yellow',
};

const txTypes = ['All', 'Buy', 'Sell', 'Dividend', 'Deposit'];
const txAccounts = ['All Accounts', 'Brokerage', 'IRA', '401k'];

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [account, setAccount] = useState('All Accounts');
  const [txList, setTxList] = useState(initialTransactions);
  const [showForm, setShowForm] = useState(false);

  const handleAddTransaction = (formData) => {
    const newTx = buildTransaction(formData, txList);
    setTxList(prev => [newTx, ...prev]);
    setShowForm(false);
  };

  const filtered = txList.filter(t => {
    const matchType = type === 'All' || t.type === type;
    const matchAccount = account === 'All Accounts' || t.account === account;
    const matchSearch = !search ||
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchAccount && matchSearch;
  });

  const totalBuys = txList.filter(t => t.type === 'Buy').reduce((s, t) => s + t.amount, 0);
  const totalSells = txList.filter(t => t.type === 'Sell').reduce((s, t) => s + t.amount, 0);
  const totalDividends = txList.filter(t => t.type === 'Dividend').reduce((s, t) => s + t.amount, 0);
  const totalDeposits = txList.filter(t => t.type === 'Deposit').reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Transactions</h1>
          <p>Complete history of all account activity</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">Export CSV</button>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New Transaction</button>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* SUMMARY STATS */}
      <div className="grid-4">
        <div className="card">
          <div className="card-title">Total Buys</div>
          <div className="stat-value" style={{ color: 'var(--green)', fontSize: 22 }}>{fmt(totalBuys)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>
            {txList.filter(t => t.type === 'Buy').length} transactions
          </div>
        </div>
        <div className="card">
          <div className="card-title">Total Sells</div>
          <div className="stat-value" style={{ color: 'var(--red)', fontSize: 22 }}>{fmt(totalSells)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>
            {txList.filter(t => t.type === 'Sell').length} transactions
          </div>
        </div>
        <div className="card">
          <div className="card-title">Dividends Received</div>
          <div className="stat-value" style={{ color: 'var(--blue)', fontSize: 22 }}>{fmt(totalDividends)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>
            {txList.filter(t => t.type === 'Dividend').length} payments
          </div>
        </div>
        <div className="card">
          <div className="card-title">Net Deposits</div>
          <div className="stat-value" style={{ fontSize: 22 }}>{fmt(totalDeposits)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>
            {txList.filter(t => t.type === 'Deposit').length} deposits
          </div>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="search-row">
        <div className="search-wrap">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            className="search-input"
            placeholder="Search by symbol or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          value={account}
          onChange={e => setAccount(e.target.value)}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 14px', color: 'var(--text-primary)', fontSize: 13.5, outline: 'none', cursor: 'pointer' }}
        >
          {txAccounts.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div className="filter-tabs">
        {txTypes.map(t => (
          <div key={t} className={`filter-tab${type === t ? ' active' : ''}`} onClick={() => setType(t)}>{t}</div>
        ))}
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Symbol</th>
                <th className="td-right">Shares</th>
                <th className="td-right">Price</th>
                <th className="td-right">Amount</th>
                <th>Account</th>
                <th className="td-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.date}</td>
                  <td><span className={`badge ${typeColors[t.type] || 'badge-blue'}`}>{t.type}</span></td>
                  <td>
                    <div className="ticker">{t.symbol}</div>
                    <div className="ticker-name">{t.name}</div>
                  </td>
                  <td className="td-right">{t.shares ? t.shares.toLocaleString() : '—'}</td>
                  <td className="td-right">{t.price ? fmt(t.price) : '—'}</td>
                  <td className="td-right" style={{ fontWeight: 600 }}>
                    <span className={t.type === 'Buy' ? 'up-text' : t.type === 'Sell' ? 'down-text' : ''}>
                      {t.type === 'Sell' ? '-' : ''}{fmt(t.amount)}
                    </span>
                  </td>
                  <td><span className="badge badge-blue">{t.account}</span></td>
                  <td className="td-center"><span className="badge badge-green">{t.status}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px 14px' }}>
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
