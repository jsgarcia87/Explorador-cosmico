export type ScaleMode = 'educational' | 'realistic';

export interface GlobalState {
  scaleMode: ScaleMode;
}

type Listener = (state: GlobalState) => void;

class StateStore {
  private state: GlobalState = {
    scaleMode: 'educational',
  };
  private listeners: Set<Listener> = new Set();

  public getState(): GlobalState {
    return this.state;
  }

  public setState(partial: Partial<GlobalState>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Notificar inmediatamente al suscribirse con el estado actual
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const CosmicState = new StateStore();
