import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

interface ProgressContextType {
  milestones: string[];
  unlockMilestone: (id: string) => Promise<void>;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const [milestones, setMilestones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      setIsLoading(true);
      api.user.getMilestones(token)
        .then((data) => {
          setMilestones(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setMilestones([]);
    }
  }, [user, token]);

  const unlockMilestone = async (id: string) => {
    if (!milestones.includes(id) && token) {
      // Optimistic update
      setMilestones((prev) => [...prev, id]);
      
      try {
        await api.user.unlockMilestone(token, id);
        // We could dispatch an event here to show a toast notification
        const event = new CustomEvent('milestone_unlocked', { detail: { id } });
        window.dispatchEvent(event);
      } catch (e) {
        // Revert on error
        setMilestones((prev) => prev.filter(m => m !== id));
      }
    }
  };

  return (
    <ProgressContext.Provider value={{ milestones, unlockMilestone, isLoading }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
