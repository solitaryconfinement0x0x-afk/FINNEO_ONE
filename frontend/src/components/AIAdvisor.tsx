import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, AlertCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAdvisor = () => {
  const [profile, setProfile] = useState({ age: 0, goal: '', risk: 'moderate' });
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I'm FinNeo AI. Before we dive into your strategy, how old are you?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const riskLevels = {
    low: { label: 'CONSERVATIVE', color: 'var(--secondary)', rec: 'High-Yield Savings' },
    moderate: { label: 'BALANCED', color: 'var(--primary)', rec: 'Total Market ETF' },
    high: { label: 'AGGRESSIVE', color: '#ec4899', rec: 'Technology/Growth ETF' }
  };

  const activeRisk = riskLevels[profile.risk as keyof typeof riskLevels];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Handle Onboarding logic
    if (onboardingStep === 0) {
      const age = parseInt(input.match(/\d+/)?.[0] || '0');
      if (age > 0) {
        setProfile(p => ({ ...p, age }));
        setOnboardingStep(1);
        setTimeout(() => setMessages(prev => [...prev, { id: Date.now()+1, text: `Got it, ${age}! What's your primary goal? (e.g., Retirement, Buying a House, Wealth Build)`, sender: 'bot' }]), 600);
      } else {
        setTimeout(() => setMessages(prev => [...prev, { id: Date.now()+1, text: "I need a number for your age to give accurate advice!", sender: 'bot' }]), 600);
      }
      return;
    }

    if (onboardingStep === 1) {
      setProfile(p => ({ ...p, goal: input }));
      setOnboardingStep(2);
      setTimeout(() => setMessages(prev => [...prev, { id: Date.now()+1, text: "Last one: How much risk can you handle? (Low, Moderate, High)", sender: 'bot' }]), 600);
      return;
    }

    if (onboardingStep === 2) {
       const risk = input.toLowerCase().includes('high') ? 'high' : input.toLowerCase().includes('low') ? 'low' : 'moderate';
       setProfile(p => ({ ...p, risk }));
       setOnboardingStep(3);
       setTimeout(() => setMessages(prev => [...prev, { id: Date.now()+1, text: `Strategy Locked. Since you want to focus on ${profile.goal}, I recommend ${riskLevels[risk].rec}. What else would you like to know?`, sender: 'bot' }]), 600);
       return;
    }

    // Standard AI logic
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  const generateResponse = (text: string) => {
    const inputClean = text.toLowerCase();
    
    if (inputClean.includes('age') || /\d+/.test(inputClean)) {
      const age = parseInt(inputClean.match(/\d+/)?.[0] || '0');
      if (age > 0) {
        if (age < 30) return `At ${age}, you have a massive time horizon. Consider a 100% Equity ETF like VTI or VOO. Your risk tolerance is naturally higher. Avoid safe-haven assets for now.`;
        if (age < 50) return `${age} is a prime time for wealth building. A 70/30 split between Total Market ETFs and High-Yield Bonds or Dividend Stocks is standard. Keep an emergency fund in a High-Yield Savings Account (HYSA).`;
        return `At ${age}, capital preservation is key. Focus on fixed income (Bonds, Treasury Bills) and a small portion (20-30%) in blue-chip dividend stocks. Ensure your HYSA is topped up.`;
      }
    }

    if (inputClean.includes('risk') || inputClean.includes('dangerous')) {
      return "Risk is just the price of admission for returns. If you can't stomach a 20% drop, stick to Government Bonds or Savings Accounts. What's your comfort level with market volatility?";
    }

    if (inputClean.includes('pension')) {
      return "I can help with that. Check out the 'Pension Predictor' tab. Generally, you should aim for a fund that's 25x your annual expenses by the time you retire.";
    }

    return "Tell me more about your situation. Are you saving for a house, retirement, or just wealth building?";
  };

  return (
    <div className="advisor-grid" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className="neo-card chat-container" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        <div className="chat-header" style={{ marginBottom: '1.5rem', borderBottom: '4px solid var(--accent)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="neo-badge" style={{ background: 'var(--primary)', padding: '0.5rem' }}>
            <Bot size={24} color="white" />
          </div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>FinAdvisor Pro</h2>
        </div>

        <div className="messages-area" ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: m.sender === 'bot' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`message-bubble ${m.sender}`}
                style={{
                  alignSelf: m.sender === 'bot' ? 'flex-start' : 'flex-end',
                  background: m.sender === 'bot' ? 'var(--white)' : 'var(--secondary)',
                  color: m.sender === 'bot' ? 'var(--accent)' : 'var(--white)',
                  padding: '1rem',
                  border: '3px solid var(--accent)',
                  fontWeight: 700,
                  maxWidth: '80%',
                  boxShadow: m.sender === 'bot' ? '4px 4px 0px black' : '-4px 4px 0px black'
                }}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="input-area" style={{ display: 'flex', gap: '1rem' }}>
          <input
            className="neo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your financial plan..."
          />
          <button className="neo-button" onClick={handleSend} style={{ padding: '1rem' }}>
            <Send size={24} />
          </button>
        </div>
      </div>
      
      {/* Quick Insights */}
      <div className="insights-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div className="neo-card" style={{ background: 'var(--primary)', color: 'white' }}>
          <TrendingUp size={24} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '0.875rem' }}>Portfolio Target</h4>
          <p style={{ fontWeight: 900, fontSize: '1.25rem' }}>{profile.goal.toUpperCase() || 'NOT SET'}</p>
        </div>
        <div className="neo-card" style={{ background: 'var(--secondary)', color: 'white' }}>
          <Sparkles size={24} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '0.875rem' }}>Top Recommendation</h4>
          <p style={{ fontWeight: 900, fontSize: '1.1rem' }}>{activeRisk.rec}</p>
        </div>
        <div className="neo-card" style={{ background: activeRisk.color, color: 'white' }}>
          <AlertCircle size={24} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '0.875rem' }}>Risk Level</h4>
          <p style={{ fontWeight: 900, fontSize: '1.25rem' }}>{activeRisk.label}</p>
        </div>
      </div>

      <style>{`
        .messages-area::-webkit-scrollbar { width: 8px; }
        .messages-area::-webkit-scrollbar-thumb { background: var(--accent); }
        .message-bubble { position: relative; }
      `}</style>
    </div>
  );
};

export default AIAdvisor;
