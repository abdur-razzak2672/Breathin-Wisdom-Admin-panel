import axios from 'axios';
import { toast } from 'react-toastify';
const ApiService = {


  async getApiService(url, config = {}) {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async getApiDetails(url, config = {}) {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async postApiService(url, data, config = {}) {

    for (const [key, value] of data.entries()) {
  console.log(`${key}:`, value,url);
}

    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async putApiService(url, data, config = {}) {
    try {
      console.log(data, url, config)
      const response = await axios.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async deleteApiService(url, config = {}) {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};


const handleError = (error) => {
  if (!error.response) {
    console.error('Network error:', error);
    throw new Error('Network error. Please try again later.');
  }
  const { status, data } = error.response;
  switch (status) {
    case 404:
      console.error('Not Found:', data.message || 'The requested resource was not found.');
      toast.error(data.message);
      throw new Error('Resource not found.');
    case 403:
      console.error('Forbidden:', data.message || 'You do not have permission to access this resource.');
      toast.error(data.message);
      throw new Error('Access forbidden.');
    case 500:
      console.error('Server Error:', data.message || 'An unexpected error occurred on the server.');
      toast.error(data.message);
      throw new Error('Server error. Please try again later.');
    default:
      console.error('Error:', data.message || 'An unexpected error occurred.');
      toast.error(data.message);
      throw new Error(data.message || 'An unexpected error occurred.');
  }
};

export default ApiService;
