import axios from 'axios';

class DataService {
  constructor() {
    this.baseURL = 'http://localhost:3000';
    this.budgetData = [];
    this.listeners = [];
  }

  /**
   * Fetches budget data from the backend API
   * @returns {Promise} Promise containing the budget response
   */
  async fetchBudgetData() {
    try {
      const response = await axios.get(`${this.baseURL}/budget`);
      this.budgetData = response.data.myBudget;
      this.notifyListeners();
      return response.data;
    } catch (error) {
      console.error('Error fetching budget data:', error);
      throw error;
    }
  }

  /**
   * Gets the current budget data (synchronous)
   * @returns {Array} Array of budget items
   */
  getBudgetData() {
    return this.budgetData;
  }

  /**
   * Subscribe to budget data changes
   * @param {Function} callback - Function to call when data changes
   * @returns {Function} Function to unsubscribe
   */
  subscribe(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Checks if budget data is available
   * @returns {boolean} True if data is available
   */
  hasBudgetData() {
    return this.budgetData.length > 0;
  }

  /**
   * Notifies all listeners of data changes
   */
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.budgetData));
  }
}

// Export a singleton instance
export const dataService = new DataService();
export default DataService;