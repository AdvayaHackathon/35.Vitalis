import { create } from 'zustand';
import type { UserProfile, HealthMetrics, ChatMessage } from '../types';

interface Store {
  userProfile: UserProfile | null;
  healthMetrics: HealthMetrics[];
  chatHistory: ChatMessage[];
  setUserProfile: (profile: UserProfile) => void;
  addHealthMetric: (metric: HealthMetrics) => void;
  addChatMessage: (message: ChatMessage) => void;
}

export const useStore = create<Store>((set) => ({
  userProfile: null,
  healthMetrics: [],
  chatHistory: [],
  setUserProfile: (profile) => set({ userProfile: profile }),
  addHealthMetric: (metric) =>
    set((state) => ({ healthMetrics: [...state.healthMetrics, metric] })),
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
}));