import api from '../lib/axios';

export const contactsService = {
  getContacts: async (params) => {
    return api.get('/contacts', { params });
  },

  getContactById: async (id) => {
    return api.get(`/contacts/${id}`);
  },

  updateStatus: async (id, status) => {
    return api.patch(`/contacts/${id}/status`, { status });
  },

  replyToContact: async (id, replyData) => {
    return api.post(`/contacts/${id}/reply`, replyData);
  }
};
