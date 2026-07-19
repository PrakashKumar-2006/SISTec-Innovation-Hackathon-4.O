import axios from '../lib/axios';

export const adminSettingsService = {
  getSettings: async () => {
    return axios.get('/settings');
  },

  updateSettings: async (settings) => {
    return axios.put('/settings', settings);
  },

  exportSettings: async () => {
    return axios.post('/settings/export');
  },

  importSettings: async (settings) => {
    return axios.post('/settings/import', settings);
  }
};
