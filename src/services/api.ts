// Mock API para simular el backend propio

export interface User {
  id: string;
  email: string;
  role: 'particular' | 'colegio' | 'alumno';
  name: string;
}

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-123',
            user: {
              id: 'u1',
              email,
              role: email.includes('colegio') ? 'colegio' : 'particular',
              name: 'Explorador ' + email.split('@')[0],
            },
          });
        }, 1000);
      });
    },
    register: async (data: any): Promise<{ token: string; user: User }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token-new',
            user: {
              id: 'u2',
              email: data.email,
              role: data.role || 'particular',
              name: data.name || 'Nuevo Explorador',
            },
          });
        }, 1000);
      });
    },
  },
  user: {
    getMilestones: async (token: string): Promise<string[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(['primer_contacto']), 500);
      });
    },
    unlockMilestone: async (token: string, milestoneId: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
      });
    }
  }
};
