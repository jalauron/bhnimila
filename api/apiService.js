const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
