import api from '../lib/axios';

export const changeRequestsService = {
  // Get all change requests with pagination and filters
  getChangeRequests: async (params) => {
    return api.get('/change-requests', { params });
  },

  // Get single change request by ID
  getChangeRequestById: async (id) => {
    return api.get(`/change-requests/${id}`);
  },

  // Approve or Reject a change request
  updateRequestStatus: async (id, status, adminRemarks = '') => {
    return api.patch(`/change-requests/${id}/status`, { status, adminRemarks });
  }
};
