import { useState } from 'react';
import { Target, Zap } from 'lucide-react';

const GoalTracker = () => {
  const [target, setTarget] = useState(1000000);
  const [years, setYears] = useState(20);
  const [returnRate, setReturnRate] = useState(7);

  const calculateRequired = () => {
    const r = returnRate / 100 / 12;
    const n = years * 12;
    // Formula for PMT: FutureValue = PMT * [((1 + r)^n - 1) / r]
    // PMT = FutureValue / [((1 + r)^n - 1) / r]
    const denominator = (Math.pow(1 + r, n) - 1) / r;
    const monthly = target / denominator;
    return Math.round(monthly);
  };

  const monthlyRequired = calculateRequired();
  const dailyRequired = Math.round(monthlyRequired / 30);

  return (
    <div className="goal-tracker neo-card animate-in" style={{ background: 'var(--white)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '4px solid black', paddingBottom: '1rem' }}>
        <div className="neo-badge" style={{ backgroundColor: 'var(--primary)', padding: '0.5rem' }}>
          <Target size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '1.5rem' }}>Wealth Target Calculator</h2>
      </div>

      <div className="goal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div className="inputs-side" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="field">
            <label style={{ fontWeight: 900, display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>TARGET NET WORTH ($)</label>
            <input 
              className="neo-input" 
              type="number" 
              value={target} 
              onChange={(e) => setTarget(Number(e.target.value))} 
              step="10000"
            />
          </div>
          <div className="field">
            <label style={{ fontWeight: 900, display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>TIME HORIZON (YEARS)</label>
            <input 
              className="neo-input" 
              type="range" 
              min="1" 
              max="50" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))} 
            />
            <div style={{ textAlign: 'right', fontWeight: 900 }}>{years} Years</div>
          </div>
          <div className="field">
            <label style={{ fontWeight: 900, display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>EXPECTED RETURN (%)</label>
            <input 
              className="neo-input" 
              type="range" 
              min="1" 
              max="15" 
              value={returnRate} 
              onChange={(e) => setReturnRate(Number(e.target.value))} 
            />
            <div style={{ textAlign: 'right', fontWeight: 900 }}>{returnRate}%</div>
          </div>
        </div>

        <div className="results-side" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="neo-card" style={{ background: 'var(--accent)', color: 'white', textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.75rem', opacity: 0.8 }}>MONTHLY SAVING NEEDED</h4>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--secondary)' }}>
              ${monthlyRequired.toLocaleString()}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="neo-card" style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '0.65rem' }}>DAILY COST</h4>
              <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${dailyRequired}</div>
            </div>
            <div className="neo-card" style={{ textAlign: 'center', background: 'var(--primary)', color: 'white' }}>
              <h4 style={{ fontSize: '0.65rem' }}>TOTAL INVESTED</h4>
              <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${(monthlyRequired * years * 12).toLocaleString()}</div>
            </div>
          </div>

          <div className="neo-card" style={{ borderStyle: 'dashed', background: '#f8fafc' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              <Zap size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              To reach <strong>${target.toLocaleString()}</strong> in {years} years, you'll need to invest <strong>${monthlyRequired.toLocaleString()}</strong> every month, assuming a {returnRate}% annual return.
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .goal-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default GoalTracker;
