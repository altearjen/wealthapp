import { accounts, holdings, fmt, fmtPct } from '../data';

const typeColors = { Taxable: 'badge-yellow', 'Tax-Deferred': 'badge-blue', 'Tax-Free': 'badge-green' };

export default function Accounts() {
  const total = accounts.reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Accounts</h1>
          <p>Manage your linked investment accounts</p>
        </div>
        <button className="btn btn-primary">+ Link Account</button>
      </div>

      {/* SUMMARY */}
      <div className="grid-4">
        <div className="card">
          <div className="card-title">Total Assets</div>
          <div className="stat-value">{fmt(total)}</div>
          <div className="stat-change up">▲ across {accounts.length} accounts</div>
        </div>
        {accounts.map(a => (
          <div className="card" key={a.id}>
            <div className="card-title">{a.name}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{fmt(a.value)}</div>
            <div style={{ fontSize: 12, color: a.dayChange >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600, marginTop: 6 }}>
              {a.dayChange >= 0 ? '+' : ''}{fmt(a.dayChange)} today
            </div>
          </div>
        ))}
      </div>

      {/* ACCOUNT CARDS */}
      <div className="grid-2">
        {accounts.map(acc => (
          <div className="card" key={acc.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{acc.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 3 }}>
                  {acc.institution} · {acc.accountNum}
                </div>
              </div>
              <span className={`badge ${typeColors[acc.type]}`}>{acc.type}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ padding: '12px 14px', background: 'var(--bg-primary)', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Market Value</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{fmt(acc.value)}</div>
              </div>
              <div style={{ padding: '12px 14px', background: 'var(--bg-primary)', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Cash</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{fmt(acc.cashBalance)}</div>
              </div>
              <div style={{ padding: '12px 14px', background: 'var(--bg-primary)', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Holdings</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{acc.holdings}</div>
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Account allocation</span>
                <span style={{ fontWeight: 600 }}>{((acc.value / total) * 100).toFixed(1)}% of total</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(acc.value / total) * 100}%`, background: 'var(--accent)' }}/>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>View Holdings</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Transfer Funds</button>
            </div>
          </div>
        ))}
      </div>

      {/* HOLDINGS ACROSS ACCOUNTS */}
      <div className="card">
        <div className="card-title">All Positions</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Sector</th>
                <th className="td-right">Shares</th>
                <th className="td-right">Market Value</th>
                <th className="td-right">Day Change</th>
                <th className="td-right">Total Return</th>
              </tr>
            </thead>
            <tbody>
              {holdings.slice(0, 8).map(h => (
                <tr key={h.symbol}>
                  <td>
                    <div className="ticker">{h.symbol}</div>
                    <div className="ticker-name">{h.name}</div>
                  </td>
                  <td><span className="badge badge-purple">{h.sector}</span></td>
                  <td className="td-right">{h.shares.toLocaleString()}</td>
                  <td className="td-right" style={{ fontWeight: 600 }}>{fmt(h.value)}</td>
                  <td className="td-right">
                    <span className={h.dayChange >= 0 ? 'up-text' : 'down-text'}>
                      {h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(2)} ({fmtPct(h.dayChangePct)})
                    </span>
                  </td>
                  <td className="td-right">
                    <span className={h.totalReturn >= 0 ? 'up-text' : 'down-text'}>
                      {fmtPct(h.totalReturnPct)}
                    </span>
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
