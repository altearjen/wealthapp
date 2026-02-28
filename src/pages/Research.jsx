import { useState } from 'react';
import { researchItems, marketData, fmt, fmtPct } from '../data';

const ratingColors = { 'Strong Buy': 'badge-green', 'Buy': 'badge-blue', 'Hold': 'badge-yellow', 'Sell': 'badge-red', 'Strong Sell': 'badge-red' };

const news = [
  { title: 'Fed holds rates steady, signals cautious approach to cuts in 2024', source: 'Reuters', time: '2h ago', tag: 'Macro' },
  { title: 'NVIDIA delivers record Q4 earnings, data center revenue surges 409%', source: 'Bloomberg', time: '4h ago', tag: 'Technology' },
  { title: 'Apple Vision Pro launches, mixed initial reviews from analysts', source: 'WSJ', time: '6h ago', tag: 'Technology' },
  { title: 'S&P 500 closes at record high amid strong earnings season', source: 'CNBC', time: '8h ago', tag: 'Markets' },
  { title: 'Eli Lilly weight-loss drug Zepbound gains market share from Ozempic', source: 'FT', time: '12h ago', tag: 'Healthcare' },
  { title: 'JPMorgan sees 40% probability of US recession in 2024', source: 'Barrons', time: '1d ago', tag: 'Macro' },
];

export default function Research() {
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState('All');

  const filtered = researchItems.filter(r => {
    const matchRating = rating === 'All' || r.rating.includes(rating);
    const matchSearch = !search ||
      r.symbol.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.firm.toLowerCase().includes(search.toLowerCase());
    return matchRating && matchSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Research</h1>
        <p>Analyst ratings, price targets, and market news</p>
      </div>

      {/* NEWS FEED */}
      <div className="card section-mb">
        <div className="card-title">Market News</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {news.map((n, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < news.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4, cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                >
                  {n.title}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.source}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>·</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.time}</span>
                </div>
              </div>
              <span className="badge badge-purple" style={{ flexShrink: 0, marginTop: 2 }}>{n.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANALYST RATINGS */}
      <div>
        <div style={{ marginBottom: 16, fontSize: 15, fontWeight: 700 }}>Analyst Ratings</div>

        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="search-input"
              placeholder="Search symbol, company, or firm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-tabs">
          {['All', 'Buy', 'Hold', 'Sell'].map(r => (
            <div key={r} className={`filter-tab${rating === r ? ' active' : ''}`} onClick={() => setRating(r)}>{r}</div>
          ))}
        </div>

        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Rating</th>
                  <th className="td-right">Current Price</th>
                  <th className="td-right">Price Target</th>
                  <th className="td-right">Upside</th>
                  <th>Firm</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.symbol}>
                    <td>
                      <div className="ticker">{r.symbol}</div>
                      <div className="ticker-name">{r.name}</div>
                    </td>
                    <td>
                      <span className={`badge ${ratingColors[r.rating] || 'badge-blue'}`}>{r.rating}</span>
                    </td>
                    <td className="td-right">{fmt(r.current)}</td>
                    <td className="td-right" style={{ fontWeight: 600 }}>{fmt(r.target)}</td>
                    <td className="td-right">
                      <span className={r.upside >= 0 ? 'up-text' : 'down-text'}>
                        {r.upside >= 0 ? '+' : ''}{r.upside.toFixed(1)}%
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.firm}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12.5 }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
