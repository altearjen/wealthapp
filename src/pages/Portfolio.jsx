import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { portfolioStats, performanceData, allocationData, accounts, fmt, fmtK, fmtPct } from '../data';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e2130', border: '1px solid #2a2d3e', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#8b8fa8', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {fmtK(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function Portfolio() {
  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Portfolio</h1>
          <p>Overview of your full investment portfolio</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-primary">+ Add Position</button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid-4">
        {[
          { label: 'Total Value', value: fmt(portfolioStats.totalValue), sub: `${fmtPct(portfolioStats.dayChangePct)} today`, up: portfolioStats.dayChangePct >= 0 },
          { label: 'Total Return', value: fmt(portfolioStats.totalReturn), sub: `${fmtPct(portfolioStats.totalReturnPct)} all time`, up: true },
          { label: 'Day Gain / Loss', value: fmt(portfolioStats.dayChange), sub: fmtPct(portfolioStats.dayChangePct), up: portfolioStats.dayChange >= 0 },
          { label: 'Cash', value: fmt(portfolioStats.cashBalance), sub: '2.6% of portfolio', up: null },
        ].map(s => (
          <div className="card" key={s.label}>
            <div className="card-title">{s.label}</div>
            <div className="stat-value" style={s.up === true ? { color: 'var(--green)' } : s.up === false ? { color: 'var(--red)' } : {}}>{s.value}</div>
            <div className={`stat-change ${s.up === true ? 'up' : s.up === false ? 'down' : ''}`} style={{ color: s.up === null ? 'var(--text-secondary)' : '' }}>
              {s.up === true ? '▲' : s.up === false ? '▼' : ''} {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="card section-mb">
        <div className="card-header">
          <div className="card-title">Portfolio Performance vs S&P 500</div>
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
            {['1M','3M','6M','1Y','2Y','All'].map(t => (
              <div key={t} className={`filter-tab${t === '2Y' ? ' active' : ''}`} style={{ padding: '4px 10px', fontSize: 11.5 }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false} interval={3}/>
              <YAxis tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v/1e6).toFixed(1) + 'M'} width={54}/>
              <Tooltip content={<CustomTooltip />}/>
              <Legend wrapperStyle={{ fontSize: 12, color: '#8b8fa8' }}/>
              <Area type="monotone" dataKey="portfolio" name="Portfolio" stroke="#6366f1" fill="url(#pg)" strokeWidth={2} dot={false}/>
              <Area type="monotone" dataKey="benchmark" name="S&P 500" stroke="#3b82f6" fill="url(#bg)" strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALLOCATION + ACCOUNTS */}
      <div className="grid-1-2">
        <div className="card">
          <div className="card-title">Allocation</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <PieChart width={160} height={160}>
              <Pie data={allocationData} cx={75} cy={75} innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={2} stroke="#1e2130">
                {allocationData.map((e, i) => <Cell key={i} fill={e.color}/>)}
              </Pie>
            </PieChart>
          </div>
          {allocationData.map(a => (
            <div key={a.name} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="dot" style={{ background: a.color }}/>
                  <span style={{ color: 'var(--text-secondary)' }}>{a.name}</span>
                </div>
                <span style={{ fontWeight: 600 }}>{a.value}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${a.value}%`, background: a.color }}/>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Accounts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {accounts.map(acc => (
              <div key={acc.id} style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{acc.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{acc.institution} · {acc.accountNum}</div>
                  </div>
                  <span className="badge badge-purple">{acc.type}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{fmt(acc.value)}</div>
                    <div style={{ fontSize: 12, color: acc.dayChange >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600, marginTop: 2 }}>
                      {acc.dayChange >= 0 ? '+' : ''}{fmt(acc.dayChange)} today
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-muted)' }}>
                    {acc.holdings} holdings
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
