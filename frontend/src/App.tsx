import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAdvisor from './components/AIAdvisor';
import PensionCalculator from './components/PensionCalculator';
import InvestmentCatalog from './components/InvestmentCatalog';
import GoalTracker from './components/GoalTracker';
import { Bot, Coins, Calculator, Target } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('advisor');

  const tabs = [
    { id: 'advisor', label: 'AI Advisor', icon: Bot, color: 'var(--primary)' },
    { id: 'pension', label: 'Pension Predictor', icon: Calculator, color: 'var(--secondary)' },
    { id: 'goals', label: 'Goal Tracker', icon: Target, color: '#ec4899' },
    { id: 'investments', label: 'Simple Investments', icon: Coins, color: 'var(--accent)' },
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar container">
        <div className="logo neo-badge" style={{ fontSize: '1.5rem', padding: '0.5rem 1rem' }}>
          FinNeo AI
        </div>
        <div className="nav-links">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`neo-button ${activeTab === tab.id ? '' : 'secondary'}`}
                style={{ 
                  marginRight: '1rem',
                  backgroundColor: activeTab === tab.id ? tab.color : 'var(--white)',
                  color: activeTab === tab.id ? 'var(--white)' : 'var(--accent)'
                }}
              >
                <Icon size={20} />
                <span className="nav-text">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container content-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          >
            {activeTab === 'advisor' && <AIAdvisor />}
            {activeTab === 'pension' && <PensionCalculator />}
            {activeTab === 'goals' && <GoalTracker />}
            {activeTab === 'investments' && <InvestmentCatalog />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="container" style={{ marginTop: '5rem', borderTop: '4px solid black', padding: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem' }}>FinNeo AI</h3>
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Financial independence, simplified.</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: 'black', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid black' }}>Privacy</a>
          <a href="#" style={{ color: 'black', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid black' }}>Terms</a>
          <a href="#" style={{ color: 'black', fontWeight: 900, textDecoration: 'none', borderBottom: '2px solid black' }}>Contact</a>
        </div>
      </footer>

      {/* Additional Styling for Layout */}
      <style>{`
        .app-container {
          min-height: 100vh;
          padding-top: 2rem;
          background: #f8fafc;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        .nav-links {
          display: flex;
          gap: 0.5rem;
        }
        .content-grid {
          display: grid;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .navbar { flex-direction: column; gap: 1.5rem; }
          .nav-text { display: none; }
          .neo-button { padding: 0.75rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
