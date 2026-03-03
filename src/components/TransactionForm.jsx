import { useState } from 'react';

const defaultForm = {
  type: 'Buy',
  symbol: '',
  name: '',
  shares: '',
  price: '',
  account: 'Brokerage',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.symbol || !form.name) {
      setError('Symbol and name are required.');
      return;
    }

    if (form.type !== 'Deposit') {
      if (!form.shares || !form.price) {
        setError('Shares and price are required.');
        return;
      }
    }

    const prepared = {
      ...form,
      shares: form.shares ? parseFloat(form.shares) : null,
      price: form.price ? parseFloat(form.price) : null,
      symbol: form.type === 'Buy' ? null : form.symbol,
    };

    onSubmit(prepared);
    setForm(defaultForm);
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '9px 12px',
    color: 'var(--text-primary)',
    fontSize: 13.5,
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    color: 'var(--text-muted)',
    marginBottom: 4,
  };

  return (
    <div className="card" style={{ marginBottom: 20, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>New Transaction</div>
        <button className="btn btn-secondary" onClick={onCancel} style={{ padding: '6px 14px', fontSize: 12.5 }}>Cancel</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--red)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: 'var(--red)', fontSize: 13 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Type</label>
            <select value={form.type} onChange={e => handleChange('type', e.target.value)} style={inputStyle}>
              <option>Buy</option>
              <option>Sell</option>
              <option>Dividend</option>
              <option>Deposit</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Symbol</label>
            <input style={inputStyle} placeholder="AAPL" value={form.symbol} onChange={e => handleChange('symbol', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Company Name</label>
            <input style={inputStyle} placeholder="Apple Inc." value={form.name} onChange={e => handleChange('name', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Shares</label>
            <input type="number" step="any" style={inputStyle} placeholder="100" value={form.shares} onChange={e => handleChange('shares', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Price per Share</label>
            <input type="number" step="0.01" style={inputStyle} placeholder="150.00" value={form.price} onChange={e => handleChange('price', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Account</label>
            <select value={form.account} onChange={e => handleChange('account', e.target.value)} style={inputStyle}>
              <option>Brokerage</option>
              <option>IRA</option>
              <option>401k</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" style={inputStyle} value={form.date} onChange={e => handleChange('date', e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit Transaction</button>
      </form>
    </div>
  );
}
