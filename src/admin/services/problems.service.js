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
  }
};
