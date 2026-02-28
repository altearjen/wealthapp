import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import { performanceData, monthlyReturns, fmtK, fmtPct } from '../data';

const ChartTooltip = ({ active, payload, label, isCurrency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e2130', border: '1px solid #2a2d3e', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#8b8fa8', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {isCurrency ? fmtK(p.value) : fmtPct(p.value)}
        </p>
      ))}
    </div>
  );
};

const metrics = [
  { label: 'Portfolio Return (YTD)', value: '+23.16%', sub: 'vs 19.2% S&P 500', positive: true },
  { label: 'Alpha', value: '+3.96%', sub: 'Annualized', positive: true },
  { label: 'Beta', value: '1.08', sub: 'vs S&P 500', positive: null },
  { label: 'Sharpe Ratio', value: '1.42', sub: 'Risk-adjusted return', positive: null },
  { label: 'Max Drawdown', value: '-8.4%', sub: 'Last 12 months', positive: false },
  { label: 'Volatility (Annual)', value: '14.2%', sub: 'Standard deviation', positive: null },
  { label: 'Winning Months', value: '9 / 12', sub: '75% win rate', positive: true },
  { label: 'Best Month', value: '+6.3%', sub: 'November 2023', positive: true },
];

export default function Performance() {
  return (
    <div>
      <div className="page-header">
        <h1>Performance</h1>
        <p>Track returns, risk metrics, and benchmark comparison</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid-4">
        {metrics.slice(0, 4).map(m => (
          <div className="card" key={m.label}>
            <div className="card-title">{m.label}</div>
            <div className="stat-value" style={m.positive === true ? { color: 'var(--green)' } : m.positive === false ? { color: 'var(--red)' } : {}}>
              {m.value}
            </div>
            <div className="stat-label" style={{ marginTop: 6 }}>{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="grid-4">
        {metrics.slice(4).map(m => (
          <div className="card" key={m.label}>
            <div className="card-title">{m.label}</div>
            <div className="stat-value" style={m.positive === true ? { color: 'var(--green)' } : m.positive === false ? { color: 'var(--red)' } : {}}>
              {m.value}
            </div>
            <div className="stat-label" style={{ marginTop: 6 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* CUMULATIVE CHART */}
      <div className="card section-mb">
        <div className="card-header">
          <div className="card-title">Cumulative Growth ($1.2M Invested Jan 2023)</div>
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
            {['6M','1Y','2Y','All'].map(t => (
              <div key={t} className={`filter-tab${t === 'All' ? ' active' : ''}`} style={{ padding: '4px 10px', fontSize: 11.5 }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.28}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false} interval={3}/>
              <YAxis tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v/1e6).toFixed(2) + 'M'} width={60}/>
              <Tooltip content={<ChartTooltip isCurrency />}/>
              <Legend wrapperStyle={{ fontSize: 12, color: '#8b8fa8' }}/>
              <Area type="monotone" dataKey="portfolio" name="Portfolio" stroke="#6366f1" fill="url(#pg2)" strokeWidth={2} dot={false}/>
              <Area type="monotone" dataKey="benchmark" name="S&P 500" stroke="#3b82f6" fill="url(#bg2)" strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MONTHLY RETURNS */}
      <div className="card section-mb">
        <div className="card-title">Monthly Returns vs Benchmark (2024)</div>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyReturns} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#555872', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => v + '%'} width={38}/>
              <Tooltip content={<ChartTooltip />}/>
              <Legend wrapperStyle={{ fontSize: 12, color: '#8b8fa8' }}/>
              <ReferenceLine y={0} stroke="#2a2d3e" strokeWidth={1}/>
              <Bar dataKey="return" name="Portfolio" fill="#6366f1" radius={[3, 3, 0, 0]}/>
              <Bar dataKey="benchmark" name="S&P 500" fill="#3b82f6" radius={[3, 3, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RISK SUMMARY */}
      <div className="card section-mb">
        <div className="card-title">Risk Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Value at Risk (1-day, 95%)', value: '-$24,418', color: 'var(--red)' },
            { label: 'Concentration Risk', value: 'Moderate', color: 'var(--yellow)' },
            { label: 'Sector Diversification', value: '7 sectors', color: 'var(--green)' },
            { label: 'Correlation to S&P 500', value: '0.88', color: 'var(--text-primary)' },
            { label: 'Info Ratio', value: '0.62', color: 'var(--text-primary)' },
            { label: 'Sortino Ratio', value: '1.78', color: 'var(--green)' },
          ].map(r => (
            <div key={r.label} style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{r.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: r.color }}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
