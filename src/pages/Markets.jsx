import { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { marketData, fmtPct } from '../data';

const sectors = ['All', 'Index', 'Technology', 'Financials', 'Healthcare', 'Consumer Disc.', 'Energy'];

const miniData = {
  up: [{ v: 10 }, { v: 12 }, { v: 11 }, { v: 14 }, { v: 13 }, { v: 16 }, { v: 15 }, { v: 18 }],
  down: [{ v: 18 }, { v: 16 }, { v: 17 }, { v: 14 }, { v: 15 }, { v: 12 }, { v: 13 }, { v: 10 }],
};

const marketIndices = [
  { name: 'S&P 500', value: '5,088.44', change: '+18.64', pct: '+0.37%', up: true },
  { name: 'NASDAQ', value: '16,084.22', change: '+88.12', pct: '+0.55%', up: true },
  { name: 'Dow Jones', value: '38,824.10', change: '-44.22', pct: '-0.11%', up: false },
  { name: 'Russell 2000', value: '2,042.88', change: '+12.44', pct: '+0.61%', up: true },
  { name: '10-Yr Treasury', value: '4.28%', change: '+0.02%', pct: '', up: false },
  { name: 'VIX', value: '14.82', change: '-0.44', pct: '-2.88%', up: false },
];

export default function Markets() {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('All');

  const filtered = marketData
    .filter(m => sector === 'All' || m.sector === sector)
    .filter(m =>
      m.symbol.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <div className="page-header">
        <h1>Markets</h1>
        <p>Real-time market data and watchlist</p>
      </div>

      {/* MARKET INDICES */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {marketIndices.map(idx => (
          <div className="card" key={idx.name} style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{idx.name}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{idx.value}</div>
              </div>
              <div style={{ height: 40, width: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={idx.up ? miniData.up : miniData.down} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                    <defs>
                      <linearGradient id={`mini-${idx.name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={idx.up ? '#22c55e' : '#ef4444'} stopOpacity={0.3}/>
                        <stop offset="100%" stopColor={idx.up ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={idx.up ? '#22c55e' : '#ef4444'} fill={`url(#mini-${idx.name})`} strokeWidth={1.5} dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: idx.up ? 'var(--green)' : 'var(--red)' }}>
              {idx.change} {idx.pct}
            </div>
          </div>
        ))}
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
            placeholder="Search symbol or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">+ Add to Watchlist</button>
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
                <th>Symbol</th>
                <th>Sector</th>
                <th className="td-right">Price</th>
                <th className="td-right">Change</th>
                <th className="td-right">Volume</th>
                <th className="td-right">Mkt Cap</th>
                <th className="td-right">P/E</th>
                <th className="td-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.symbol}>
                  <td>
                    <div className="ticker">{m.symbol}</div>
                    <div className="ticker-name">{m.name}</div>
                  </td>
                  <td><span className="badge badge-purple">{m.sector}</span></td>
                  <td className="td-right" style={{ fontWeight: 600 }}>${m.price.toFixed(2)}</td>
                  <td className="td-right">
                    <span className={m.change >= 0 ? 'down-text' : 'up-text'}>
                      {m.change >= 0 ? '+' : ''}{m.change.toFixed(2)} ({fmtPct(m.changePct)})
                    </span>
                  </td>
                  <td className="td-right" style={{ color: 'var(--text-secondary)' }}>{m.volume}</td>
                  <td className="td-right" style={{ color: 'var(--text-secondary)' }}>{m.mktCap}</td>
                  <td className="td-right" style={{ color: 'var(--text-secondary)' }}>{m.pe}x</td>
                  <td className="td-center">
                    <div style={{ display: 'inline-block', width: 60, height: 28 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={m.change >= 0 ? miniData.up : miniData.down} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                          <defs>
                            <linearGradient id={`trend-${m.symbol}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={m.change >= 0 ? '#22c55e' : '#ef4444'} stopOpacity={0.3}/>
                              <stop offset="100%" stopColor={m.change >= 0 ? '#22c55e' : '#ef4444'} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="v" stroke={m.change >= 0 ? '#22c55e' : '#ef4444'} fill={`url(#trend-${m.symbol})`} strokeWidth={1.5} dot={false}/>
                        </AreaChart>
                      </ResponsiveContainer>
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
