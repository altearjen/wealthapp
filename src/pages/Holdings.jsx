import { useState } from 'react';
import { holdings, allocationData, fmt, fmtPct } from '../data';

const sectors = ['All', ...new Set(holdings.map(h => h.sector))];

export default function Holdings() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All');
  const [sortKey, setSortKey] = useState('value');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = holdings
    .filter(h => sector === 'All' || h.sector === sector)
    .filter(h => h.symbol.toLowerCase().includes(search.toLowerCase()) || h.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const v = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortDir === 'asc' ? v : -v;
    });

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.3 }}>
      {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  const totalValue = holdings.reduce((s, h) => s + h.value, 0);

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Holdings</h1>
          <p>{holdings.length} positions · {fmt(totalValue)} total market value</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">Export CSV</button>
          <button className="btn btn-primary">+ Add Position</button>
        </div>
      </div>

      {/* ALLOCATION MINI BARS */}
      <div className="card section-mb">
        <div className="card-title">Sector Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allocationData.map(a => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 110, fontSize: 12.5, color: 'var(--text-secondary)', flexShrink: 0 }}>{a.name}</div>
              <div style={{ flex: 1, background: 'var(--border)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${a.value}%`, height: '100%', background: a.color, borderRadius: 4 }}/>
              </div>
              <div style={{ width: 44, textAlign: 'right', fontSize: 12.5, fontWeight: 600 }}>{a.value}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="search-row">
        <div className="search-wrap">
          <span className="search-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            className="search-input"
            placeholder="Search symbol or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs">
        {sectors.map(s => (
          <div key={s} className={`filter-tab${sector === s ? ' active' : ''}`} onClick={() => setSector(s)}>{s}</div>
        ))}
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('symbol')}>Symbol <SortIcon k="symbol"/></th>
                <th>Sector</th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('shares')}>Shares <SortIcon k="shares"/></th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>Price <SortIcon k="price"/></th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('value')}>Market Value <SortIcon k="value"/></th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('dayChangePct')}>Day Change <SortIcon k="dayChangePct"/></th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('totalReturnPct')}>Total Return <SortIcon k="totalReturnPct"/></th>
                <th className="td-right" style={{ cursor: 'pointer' }} onClick={() => handleSort('weight')}>Weight <SortIcon k="weight"/></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.symbol}>
                  <td>
                    <div className="ticker">{h.symbol}</div>
                    <div className="ticker-name">{h.name}</div>
                  </td>
                  <td><span className="badge badge-purple">{h.sector}</span></td>
                  <td className="td-right">{h.shares.toLocaleString()}</td>
                  <td className="td-right">{fmt(h.price)}</td>
                  <td className="td-right" style={{ fontWeight: 600 }}>{fmt(h.value)}</td>
                  <td className="td-right">
                    <span className={h.dayChange >= 0 ? 'up-text' : 'down-text'}>
                      {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(2)} ({fmtPct(h.dayChangePct)})
                    </span>
                  </td>
                  <td className="td-right">
                    <div className={h.totalReturn >= 0 ? 'up-text' : 'down-text'} style={{ fontWeight: 600 }}>
                      {fmtPct(h.totalReturnPct)}
                    </div>
                    <div style={{ fontSize: 12, color: h.totalReturn >= 0 ? 'var(--green)' : 'var(--red)', opacity: 0.8 }}>
                      {h.totalReturn >= 0 ? '+' : ''}{fmt(h.totalReturn)}
                    </div>
                  </td>
                  <td className="td-right">
                    <div style={{ fontWeight: 600 }}>{h.weight.toFixed(2)}%</div>
                    <div style={{ width: 60, marginLeft: 'auto', background: 'var(--border)', borderRadius: 3, height: 4, marginTop: 4 }}>
                      <div style={{ width: `${Math.min(h.weight * 4, 100)}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
