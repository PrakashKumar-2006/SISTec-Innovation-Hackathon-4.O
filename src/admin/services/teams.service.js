import api from '../lib/axios';

export const teamsService = {
  /**
   * Fetch all teams with pagination, search, and filtering
   */
  getTeams: async (params) => {
    const response = await api.get('/teams', { params });
    return response.data;
  },

  /**
   * Fetch a single team by ID
   */
  getTeamById: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  /**
   * Update a team's status (Registration or Verification)
   */
  updateTeamStatus: async (id, statusData) => {
    const response = await api.patch(`/teams/${id}/status`, statusData);
    return response.data;
  },

  /**
   * Export teams to Excel Selection Template based on filters
   */
  exportSelectionTemplate: async (filters) => {
    return api.get('/teams/export-selection-template', { params: filters, responseType: 'blob' });
  },
};
