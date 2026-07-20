import api from '../lib/axios';

export const problemsService = {
  // Get all problem statements with pagination and filters
  getAllProblems: async (params) => {
    return api.get('/problems', { params });
  },

  // Get single problem statement by ID
  getProblemById: async (id) => {
    return api.get(`/problems/${id}`);
  },

  // Create a new problem statement
  createProblem: async (data) => {
    return api.post('/problems', data);
  },

  // Update an existing problem statement
  updateProblem: async (id, data) => {
    return api.put(`/problems/${id}`, data);
  },

  // Toggle problem statement status (Active/Inactive)
  updateProblemStatus: async (id, status) => {
    return api.patch(`/problems/${id}/status`, { status });
  },

  // Export problem statements to Excel
  exportProblems: async () => {
    const response = await api.get('/problems/export/excel', { responseType: 'blob' });
    return response.data;
  },

  // Download template for import
  downloadTemplate: async () => {
    const response = await api.get('/problems/export/template', { responseType: 'blob' });
    return response.data;
  },

  // Import problem statements from Excel
  importProblems: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/problems/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
