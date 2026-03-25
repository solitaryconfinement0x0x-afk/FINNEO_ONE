import api from './api.js';

export const transactionService = {
  async getTransactions() {
    const response = await api.get('/transactions');
    return response.data;
  },

  async createTransaction(data: any) {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  async deleteTransaction(id: string) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};
