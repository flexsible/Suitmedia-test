import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const getIdeas = async (page = 1, pageSize = 10, sort = '-published_at') => {
  try {
    const response = await api.get('/ideas', {
      params: {
        'page[number]': page,
        'page[size]': pageSize,
        'append[]': ['small_image', 'medium_image'],
        sort: sort,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};
