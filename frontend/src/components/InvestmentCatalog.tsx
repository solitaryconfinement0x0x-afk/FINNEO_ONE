import { Shield, Zap, TrendingUp, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestmentCatalog = () => {
  const investments = [
    {
      title: 'S&P 500 ETF',
      type: 'Equity',
      risk: 'Moderate-High',
      returns: '7-10% Avg',
      description: 'The standard for growth. Invests in the top 500 US companies like Apple, Microsoft, and Amazon.',
      icon: TrendingUp,
      color: 'var(--primary)',
      badge: 'POPULAR'
    },
    {
      title: 'High-Yield Savings',
      type: 'Cash',
      risk: 'None-Low',
      returns: '4-5% Avg',
      description: 'Your safety net. High-interest accounts that keep your cash accessible and secure.',
      icon: Wallet,
      color: 'var(--secondary)',
      badge: 'SAFE'
    },
    {
      title: 'Total Bond Market',
      type: 'Fixed Income',
      risk: 'Low',
      returns: '3-4% Avg',
      description: 'The diversifier. Provides steady income and stability when the stock market is volatile.',
      icon: Shield,
      color: 'var(--accent)',
      badge: 'STABLE'
    },
    {
      title: 'Dividend Growth',
      type: 'Equity',
      risk: 'Moderate',
      returns: '6-8% Avg',
      description: 'Earn while you wait. Focuses on companies that regularly pay out profits to shareholders.',
      icon: DollarSign,
      color: '#ec4899', /* Pink for contrast */
      badge: 'INCOME'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '0.9' }}>Simple & Clear<br/><span style={{ color: 'var(--secondary)' }}>Investment Paths</span></h1>
        <p style={{ fontWeight: 700, fontSize: '1.25rem', opacity: 0.8 }}>No jargon. Just smart, proven strategies for long-term wealth.</p>
      </div>

      <motion.div 
        className="catalog-grid" 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
      >
        {investments.map((inv, i) => {
          const Icon = inv.icon;
          return (
            <motion.div key={i} variants={item} className="neo-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottomWidth: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: inv.color, padding: '1rem', border: '3px solid black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={32} />
                </div>
                <div className="neo-badge" style={{ background: inv.color }}>{inv.badge}</div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{inv.title}</h3>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem', color: 'gray' }}>{inv.type} • {inv.risk} Risk</div>
              </div>

              <p style={{ fontWeight: 700, fontSize: '1.1rem', flex: 1 }}>{inv.description}</p>

              <div className="stats-box" style={{ background: '#f1f5f9', padding: '1rem', border: '2px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 900, color: inv.color }}>EST. RETURNS</div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem' }}>{inv.returns}</div>
              </div>

              <button className="neo-button" style={{ background: inv.color, width: '100%', justifyContent: 'center' }}>
                Learn More <Zap size={18} fill="currentColor" />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="education-footer" style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="neo-card" style={{ background: 'var(--accent)', color: 'white' }}>
          <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>The Rule of 72</h2>
          <p style={{ fontWeight: 700 }}>Want to know how fast your money doubles? Divide 72 by your annual interest rate. At 7%, your money doubles in ~10 years!</p>
        </div>
        <div className="neo-card" style={{ borderStyle: 'dashed', background: 'transparent' }}>
          <h2 style={{ marginBottom: '1rem' }}>Diversification</h2>
          <p style={{ fontWeight: 700 }}>Don't put all your eggs in one basket. A mix of Equities, Bonds, and Cash reduces your risk significantly over time.</p>
        </div>
      </div>

      <style>{`
        .catalog-container { padding-bottom: 4rem; }
      `}</style>
    </div>
  );
};

export default InvestmentCatalog;
