import axios from '../lib/axios';

export const adminUsersService = {
  getAdmins: async (params) => {
    return axios.get('/users', { params });
  },

  getAdminStats: async () => {
    return axios.get('/users/stats');
  },

  createAdmin: async (data) => {
    return axios.post('/users', data);
  },

  updateAdmin: async (id, data) => {
    return axios.put(`/users/${id}`, data);
  },

  resetAdminPassword: async (id, newPassword) => {
    return axios.post(`/users/${id}/reset-password`, { newPassword });
  },

  getAuditLogs: async (params) => {
    return axios.get('/users/audit-logs', { params });
  }
};
