import api from '../lib/axios';

export const analyticsService = {
  getDashboardAnalytics: async () => {
    return api.get('/analytics');
  }
};
