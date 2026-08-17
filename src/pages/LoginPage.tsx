import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Orbit, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-3">
        <Orbit className="w-6 h-6 text-orange-500" />
        <span className="text-sm font-bold tracking-[0.2em] text-white">SCIENTIS</span>
      </Link>
      
      <div className="w-full max-w-md border border-white/10 bg-[#0a0a0a] p-8 relative">
        {/* HUD Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />
        
        <h2 className="text-2xl font-light tracking-widest mb-2 text-center uppercase">System Login</h2>
        <p className="text-xs font-mono text-white/40 text-center mb-8">AUTHENTICATION REQUIRED</p>
        
        {error && (
          <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Operator ID (Email)</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent border-b border-white/20 px-0 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
              placeholder="operator@scientis.org"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Passcode</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-transparent border-b border-white/20 px-0 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 w-full p-4 border border-orange-500/30 bg-orange-500/5 hover:border-orange-500 hover:bg-orange-500/10 transition-colors text-orange-500 text-sm tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Authenticate'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-white/40">
          Unregistered operator? <Link to="/register" className="text-orange-500 hover:underline">Initialize Profile</Link>
        </div>
      </div>
    </div>
  );
};
