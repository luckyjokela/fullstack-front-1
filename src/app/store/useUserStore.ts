import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (id: string, email: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  id: null,
  email: null,
  isAuthenticated: false,

  login: (id, email) => {
    localStorage.setItem("user", JSON.stringify({ id, email }));
    set({ id, email, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ id: null, email: null, isAuthenticated: false });
  },

  hydrate: () => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const { id, email } = JSON.parse(saved);
      set({ id, email, isAuthenticated: true });
    }
  },
}));
