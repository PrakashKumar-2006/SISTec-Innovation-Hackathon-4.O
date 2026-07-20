import axios from '../lib/axios';

export const selectionsService = {
  getSelections: async (params) => {
    return axios.get('/selections', { params });
  },

  getSelectionById: async (id) => {
    return axios.get(`/selections/${id}`);
  },

  createSelection: async (data) => {
    return axios.post('/selections', data);
  },

  updateSelection: async (id, data) => {
    return axios.put(`/selections/${id}`, data);
  },

  deleteSelection: async (id) => {
    return axios.delete(`/selections/${id}`);
  },

  bulkPublish: async (selectionIds) => {
    return axios.post('/selections/bulk-publish', { selectionIds });
  },

  bulkUnpublish: async (selectionIds) => {
    return axios.post('/selections/bulk-unpublish', { selectionIds });
  },

  bulkDelete: async (selectionIds) => {
    return axios.post('/selections/bulk-delete', { selectionIds });
  },

  exportSelections: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`/selections/export?${params}`, { responseType: 'blob' });
  },

  downloadTemplate: async () => {
    return axios.get('/selections/template', { responseType: 'blob' });
  },

  importSelections: async (formData) => {
    return axios.post('/selections/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
