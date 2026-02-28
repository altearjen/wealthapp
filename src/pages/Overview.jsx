import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { portfolioStats, performanceData, allocationData, holdings, fmt, fmtK, fmtPct } from '../data';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E8DDD0', borderRadius: 10, padding: '10px 14px', boxShadow: '0 2px 8px rgba(61,43,31,0.1)' }}>
      <p style={{ color: '#9C8B7E', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {fmtK(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Overview() {
  const top5 = [...holdings].sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Overview</h1>
          <p>Your complete financial picture at a glance</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Last updated</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Feb 28, 2026 · 4:00 PM EST</div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid-4">
        <div className="card">
          <div className="card-title">Total Portfolio Value</div>
          <div className="stat-value">{fmt(portfolioStats.totalValue)}</div>
          <div className={`stat-change ${portfolioStats.dayChange >= 0 ? 'up' : 'down'}`}>
            {portfolioStats.dayChange >= 0 ? '▲' : '▼'} {fmt(Math.abs(portfolioStats.dayChange))} ({fmtPct(portfolioStats.dayChangePct)}) today
          </div>
        </div>
        <div className="card">
          <div className="card-title">Total Return</div>
          <div className="stat-value up-text">{fmt(portfolioStats.totalReturn)}</div>
          <div className="stat-change up">▲ {fmtPct(portfolioStats.totalReturnPct)} all time</div>
        </div>
        <div className="card">
          <div className="card-title">Invested</div>
          <div className="stat-value">{fmt(portfolioStats.invested)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>Across 4 accounts</div>
        </div>
        <div className="card">
          <div className="card-title">Cash Balance</div>
          <div className="stat-value">{fmt(portfolioStats.cashBalance)}</div>
          <div className="stat-label" style={{ marginTop: 6 }}>Available to invest</div>
        </div>
      </div>

      {/* CHART + ALLOCATION */}
      <div className="grid-2-1">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Portfolio Value</div>
            <div className="filter-tabs" style={{ marginBottom: 0 }}>
              {['1M','3M','6M','1Y','All'].map(t => (
                <div key={t} className={`filter-tab${t === '1Y' ? ' active' : ''}`} style={{ padding: '4px 10px', fontSize: 11.5 }}>{t}</div>
              ))}
            </div>
          </div>
          <div className="chart-container" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData.slice(-12)} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C96442" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C96442" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: '#9C8B7E', fontSize: 11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill: '#9C8B7E', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v/1e6).toFixed(1) + 'M'} width={52}/>
                <Tooltip content={<CustomTooltip />}/>
                <Area type="monotone" dataKey="portfolio" name="Portfolio" stroke="#C96442" fill="url(#grad1)" strokeWidth={2} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Allocation</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <PieChart width={140} height={140}>
              <Pie data={allocationData} cx={65} cy={65} innerRadius={42} outerRadius={65} dataKey="value" strokeWidth={2} stroke="#FAF7F2">
                {allocationData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
            </PieChart>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {allocationData.map(a => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="dot" style={{ background: a.color }}/>
                <span style={{ flex: 1, fontSize: 12.5, color: 'var(--text-secondary)' }}>{a.name}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{a.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP POSITIONS */}
      <div className="card section-mb">
        <div className="card-title">Top Positions</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Sector</th>
                <th className="td-right">Value</th>
                <th className="td-right">Day Change</th>
                <th className="td-right">Total Return</th>
                <th className="td-right">Weight</th>
              </tr>
            </thead>
            <tbody>
              {top5.map(h => (
                <tr key={h.symbol}>
                  <td>
                    <div className="ticker">{h.symbol}</div>
                    <div className="ticker-name">{h.name}</div>
                  </td>
                  <td><span className="badge badge-purple">{h.sector}</span></td>
                  <td className="td-right">{fmt(h.value)}</td>
                  <td className="td-right">
                    <span className={h.dayChange >= 0 ? 'up-text' : 'down-text'}>
                      {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(2)} ({fmtPct(h.dayChangePct)})
                    </span>
                  </td>
                  <td className="td-right">
                    <span className={h.totalReturn >= 0 ? 'up-text' : 'down-text'}>
                      {h.totalReturn >= 0 ? '+' : ''}{fmt(h.totalReturn)} ({fmtPct(h.totalReturnPct)})
                    </span>
                  </td>
                  <td className="td-right">{h.weight.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
