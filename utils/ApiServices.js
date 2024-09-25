import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// ApiService remains the same, but handleError will receive the router as a parameter
const ApiService = {
  async getApiService(url, router) {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async patchApiService(url, data, config = {}) {  // Patch Service
    try {
      console.log(data, url, config);
      const response = await axios.patch(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },


  async getApiDetails(url, router) {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error, router);
    }
  },

  async postApiService(url, data, router) {
    const accessToken = getAccessToken() || "";

    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      handleError(error, router);
    }
  },

  async putApiService(url, data, router) {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async deleteApiService(url, router) {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      handleError(error, router);
    }
  },
};

// Get access token from cookies
const getAccessToken = () => {
  const userInfo = Cookies.get('userInfo');
  if (!userInfo) {
    console.error('No user info found. User is not authenticated.');
    return null;
  }
  try {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo?.accessToken || null;
  } catch (error) {
    console.error('Invalid userInfo in cookies. Parsing error:', error);
    return null;
  }
};

// Updated handleError function to accept router as a parameter
const handleError = (error, router) => {
  if (!error.response) {
    console.error('Network error:', error);
    throw new Error('Network error. Please try again later.');
  }
  const { status, data } = error.response;
  switch (status) {
    case 404:
      console.error('Not Found:', data.message || 'The requested resource was not found.');
      toast.error(data.message || 'The requested resource was not found.');
      throw new Error('Resource not found.');
    case 401:
      toast.error('Token Session Expired please login');
      Cookies.remove("userInfo");
      window.location.reload()
      console.error('Unauthorized:', data.message || 'Access Denied');
      // Use router here passed from the component
      toast.error(data.message || 'Unauthorized access, please login.');
      throw new Error('Unauthorized access.');
    case 403:
      console.error('Forbidden:', data.message || 'You do not have permission to access this resource.');
      toast.error(data.message || 'Access forbidden.');
      throw new Error('Access forbidden.');
    case 500:
      console.error('Server Error:', data.message || 'An unexpected error occurred on the server.');
      toast.error(data.message || 'Server error. Please try again later.');
      throw new Error('Server error. Please try again later.');
    default:
      console.error('Error:', data.message || 'An unexpected error occurred.');
      toast.error(data.message || 'An unexpected error occurred.');
      throw new Error(data.message || 'An unexpected error occurred.');
  }
};

export default ApiService;
