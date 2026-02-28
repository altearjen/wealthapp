import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { monthlyReturns, allocationData, portfolioStats, fmt, fmtPct } from '../data';

const reports = [
  { title: 'Annual Performance Report 2024', date: 'Dec 31, 2024', type: 'Performance', size: '2.4 MB' },
  { title: 'Q4 2024 Portfolio Summary', date: 'Dec 31, 2024', type: 'Summary', size: '1.1 MB' },
  { title: 'Q3 2024 Portfolio Summary', date: 'Sep 30, 2024', type: 'Summary', size: '1.0 MB' },
  { title: 'Tax Year 2024 – Realized Gains', date: 'Dec 31, 2024', type: 'Tax', size: '0.8 MB' },
  { title: 'Dividend Income Report 2024', date: 'Dec 31, 2024', type: 'Income', size: '0.5 MB' },
  { title: 'Q2 2024 Portfolio Summary', date: 'Jun 30, 2024', type: 'Summary', size: '0.9 MB' },
  { title: 'Tax Year 2023 – Realized Gains', date: 'Dec 31, 2023', type: 'Tax', size: '0.7 MB' },
  { title: 'Annual Performance Report 2023', date: 'Dec 31, 2023', type: 'Performance', size: '2.1 MB' },
];

const typeColors = { Performance: 'badge-purple', Summary: 'badge-blue', Tax: 'badge-yellow', Income: 'badge-green' };

const taxData = [
  { label: 'Short-Term Gains', value: 12844.20, color: 'var(--red)' },
  { label: 'Long-Term Gains', value: 48220.80, color: 'var(--green)' },
  { label: 'Qualified Dividends', value: 3840.00, color: 'var(--blue)' },
  { label: 'Ordinary Dividends', value: 514.00, color: 'var(--yellow)' },
];

const incomeData = [
  { month: 'Jan', dividends: 240, interest: 80 },
  { month: 'Feb', dividends: 180, interest: 80 },
  { month: 'Mar', dividends: 540, interest: 85 },
  { month: 'Apr', dividends: 160, interest: 82 },
  { month: 'May', dividends: 200, interest: 84 },
  { month: 'Jun', dividends: 480, interest: 88 },
  { month: 'Jul', dividends: 190, interest: 86 },
  { month: 'Aug', dividends: 170, interest: 87 },
  { month: 'Sep', dividends: 440, interest: 90 },
  { month: 'Oct', dividends: 210, interest: 89 },
  { month: 'Nov', dividends: 230, interest: 91 },
  { month: 'Dec', dividends: 560, interest: 92 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E8DDD0', borderRadius: 10, padding: '10px 14px', boxShadow: '0 2px 8px rgba(61,43,31,0.1)' }}>
      <p style={{ color: '#9C8B7E', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? '$' + p.value.toFixed(0) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function Reports() {
  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Reports</h1>
          <p>Tax documents, performance reports, and statements</p>
        </div>
        <button className="btn btn-primary">Generate Report</button>
      </div>

      {/* TAX SUMMARY */}
      <div className="grid-2-1" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-title">2024 Tax Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {taxData.map(t => (
              <div key={t.label} style={{ padding: '14px 16px', background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 6 }}>{t.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: t.color }}>{fmt(t.value)}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 16px', background: 'rgba(201,100,66,0.06)', borderRadius: 10, border: '1px solid rgba(201,100,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Estimated Tax Liability</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>$14,418.00</div>
              </div>
              <button className="btn btn-secondary">Download 1099</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Gain Distribution</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <PieChart width={140} height={140}>
              <Pie data={taxData.slice(0, 3)} cx={65} cy={65} innerRadius={42} outerRadius={65} dataKey="value" strokeWidth={2} stroke="#FAF7F2">
                <Cell fill="#A63228"/>
                <Cell fill="#2D6A4F"/>
                <Cell fill="#3B6FB7"/>
              </Pie>
            </PieChart>
          </div>
          {taxData.map((t, i) => (
            <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 12.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="dot" style={{ background: t.color }}/>
                <span style={{ color: 'var(--text-secondary)' }}>{t.label}</span>
              </div>
              <span style={{ fontWeight: 600 }}>{fmt(t.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INCOME CHART */}
      <div className="card section-mb">
        <div className="card-title">Monthly Income (Dividends & Interest) 2024</div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fill: '#9C8B7E', fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: '#9C8B7E', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '$' + v} width={44}/>
              <Tooltip content={<ChartTooltip />}/>
              <Bar dataKey="dividends" name="Dividends" fill="#C96442" radius={[3, 3, 0, 0]} stackId="a"/>
              <Bar dataKey="interest" name="Interest" fill="#3B6FB7" radius={[3, 3, 0, 0]} stackId="a"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 12, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="dot" style={{ background: 'var(--accent)' }}/>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Dividends: $3,400</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="dot" style={{ background: 'var(--blue)' }}/>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Interest: $1,034</span>
          </div>
        </div>
      </div>

      {/* REPORT LIBRARY */}
      <div className="card">
        <div className="card-title">Report Library</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {reports.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < reports.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 36, height: 36, background: 'var(--bg-primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ color: 'var(--accent)' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.date} · {r.size}</div>
              </div>
              <span className={`badge ${typeColors[r.type]}`}>{r.type}</span>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
