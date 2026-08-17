import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Orbit, Loader2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'colegio' ? 'colegio' : 'particular';
  
  const [type, setType] = useState<'particular' | 'colegio'>(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const t = searchParams.get('type');
    if (t === 'colegio' || t === 'particular') {
      setType(t);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ email, password, name, role: type });
      navigate('/app');
    } catch (err) {
      setError('Error al registrar perfil');
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
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500" />
        
        <h2 className="text-2xl font-light tracking-widest mb-2 text-center uppercase">Initialize Profile</h2>
        <p className="text-xs font-mono text-white/40 text-center mb-8">CREATE NEW OPERATOR RECORD</p>

        <div className="flex border border-white/20 mb-8 p-1 gap-1">
          <button 
            type="button"
            onClick={() => setType('particular')}
            className={`flex-1 py-2 text-xs font-mono tracking-widest transition-colors ${type === 'particular' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            PARTICULAR
          </button>
          <button 
            type="button"
            onClick={() => setType('colegio')}
            className={`flex-1 py-2 text-xs font-mono tracking-widest transition-colors ${type === 'colegio' ? 'bg-orange-500/20 text-orange-500' : 'text-white/50 hover:text-white/80'}`}
          >
            COLEGIO
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
              {type === 'colegio' ? 'Institution Name' : 'Operator Name'}
            </label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent border-b border-white/20 px-0 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Contact Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent border-b border-white/20 px-0 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Security Passcode</label>
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
            className={`mt-4 flex items-center justify-center gap-2 w-full p-4 border transition-colors text-sm tracking-widest uppercase disabled:opacity-50 ${type === 'colegio' ? 'border-orange-500/30 bg-orange-500/5 hover:border-orange-500 hover:bg-orange-500/10 text-orange-500' : 'border-white/30 bg-white/5 hover:border-white/80 hover:bg-white/10 text-white'}`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Initialize'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-white/40">
          Already registered? <Link to="/login" className="text-white hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
};
