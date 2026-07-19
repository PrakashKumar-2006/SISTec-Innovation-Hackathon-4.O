import axios from '../lib/axios';

export const resultsService = {
  getResults: async (params) => {
    return axios.get('/admin/results', { params });
  },

  getResultStats: async () => {
    return axios.get('/admin/results/stats');
  },

  getResultById: async (id) => {
    return axios.get(`/admin/results/${id}`);
  },

  createResult: async (data) => {
    return axios.post('/admin/results', data);
  },

  updateResult: async (id, data) => {
    return axios.put(`/admin/results/${id}`, data);
  },

  updateResultStatus: async (id, status) => {
    return axios.patch(`/admin/results/${id}/status`, { status });
  },

  deleteResult: async (id) => {
    return axios.delete(`/admin/results/${id}`);
  },

  exportResults: async (format = 'csv', filters = {}) => {
    const params = new URLSearchParams({ format, ...filters }).toString();
    // Use window.open for direct download if backend returns file, 
    // but typically we fetch blob. Let's fetch blob.
    return axios.get(`/admin/results/export?${params}`, { responseType: 'blob' });
  }
};
