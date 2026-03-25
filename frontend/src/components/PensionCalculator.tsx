import { useState, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="neo-card" style={{ padding: '0.5rem 1rem', background: '#000', color: '#fff', border: 'none' }}>
        <p style={{ fontWeight: 900 }}>Age {payload[0].payload.age}</p>
        <p style={{ color: 'var(--secondary)', fontWeight: 700 }}>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PensionCalculator = () => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(50000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7); // 7% annual

  const data = useMemo(() => {
    const years = retireAge - age;
    if (years <= 0) return [];

    let current = savings;
    const yearlyContrib = monthly * 12;
    const r = rate / 100;

    const projection = [];
    for (let i = 0; i <= years; i++) {
      projection.push({
        age: age + i,
        balance: Math.round(current),
      });
      current = current * (1 + r) + yearlyContrib;
    }
    return projection;
  }, [age, retireAge, savings, monthly, rate]);

  const finalBalance = data.length > 0 ? data[data.length - 1].balance : 0;

  return (
    <div className="pension-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
      {/* Input Panel */}
      <div className="neo-card input-panel" style={{ background: 'var(--white)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Pension Strategy</h2>
        
        <div className="input-field">
          <label style={{ fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}>CURRENT AGE</label>
          <input className="neo-input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>

        <div className="input-field">
          <label style={{ fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}>RETIREMENT AGE</label>
          <input className="neo-input" type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} />
        </div>

        <div className="input-field">
          <label style={{ fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}>CURRENT SAVINGS ($)</label>
          <input className="neo-input" type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} />
        </div>

        <div className="input-field">
          <label style={{ fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}>MONTHLY CONTRIBUTION ($)</label>
          <input className="neo-input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
        </div>

        <div className="input-field">
          <label style={{ fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}>EXPECTED RETURN (%)</label>
          <input 
            className="neo-input" 
            type="range" 
            min="1" 
            max="15" 
            value={rate} 
            onChange={(e) => setRate(Number(e.target.value))}
            style={{ padding: '0.2rem' }}
          />
          <div style={{ textAlign: 'right', fontWeight: 900, fontSize: '1.25rem' }}>{rate}%</div>
        </div>
      </div>

      {/* Chart Panel */}
      <div className="neo-card chart-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 className="neo-badge" style={{ background: 'var(--secondary)' }}>Projected Result</h4>
            <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px' }}>
              ${finalBalance.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h4 className="neo-badge" style={{ backgroundColor: 'var(--accent)' }}>Time to retire</h4>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{retireAge - age} Years</div>
          </div>
        </div>

        <div style={{ width: '100%', height: '350px', background: '#f8fafc', border: '4px solid #000', padding: '1rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
              <XAxis 
                dataKey="age" 
                stroke="#000" 
                tick={{ fontWeight: 900 }} 
                axisLine={{ strokeWidth: 4 }}
              />
              <YAxis 
                stroke="#000" 
                tick={{ fontWeight: 900 }} 
                axisLine={{ strokeWidth: 4 }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="var(--secondary)" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorBalance)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="neo-card" style={{ background: 'var(--primary)', color: 'white', border: 'none', boxShadow: 'none', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <TrendingUp size={20} />
            <p style={{ fontWeight: 700 }}>Strategy Tip: Increasing your monthly contribution by $100 could add over $150k to your final fund balance!</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pension-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default PensionCalculator;
