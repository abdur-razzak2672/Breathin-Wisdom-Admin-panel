import axios from 'axios';
import { toast } from 'react-toastify';
const ApiService = {


  async getApiService(url) {
    try {
    const sharedSecret = process.env.NEXT_PUBLIC_GATEWAY_SHARED_SECRET;
    const headers = {
      'x-shared-secret': sharedSecret,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImVtYWlsIjoicmFqQGdtYWlsMS5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTcyNjkxNjg1MSwiZXhwIjoxNzI2OTE4NjUxfQ.M4HprsmuU53WY7hljVkuhNYXdBzLRcir4DRD3yp_DGk`,
    };
      const response = await axios.get(url, {headers});
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async getApiDetails(url) {
    try {
    const sharedSecret = process.env.NEXT_PUBLIC_GATEWAY_SHARED_SECRET;
    const headers = {
      'x-shared-secret': sharedSecret
    };
      const response = await axios.get(url, {headers});
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async postApiService(url, data) {
    try {
      const sharedSecret = process.env.NEXT_PUBLIC_GATEWAY_SHARED_SECRET;
      const headers = {
        'x-shared-secret': sharedSecret
      };
      const response = await axios.post(url, data, {headers});
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async putApiService(url, data) {
    try {
      const sharedSecret = process.env.NEXT_PUBLIC_GATEWAY_SHARED_SECRET;
      const headers = {
        'x-shared-secret': sharedSecret
      };
      const response = await axios.put(url, data, {headers});
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async deleteApiService(url) {
    try {
      const sharedSecret = process.env.NEXT_PUBLIC_GATEWAY_SHARED_SECRET;
      const headers = {
        'x-shared-secret': sharedSecret
      };
      const response = await axios.delete(url, {headers});
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
    case 401:
      console.error('Unauthorized', data.message || 'Access Denied');
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
