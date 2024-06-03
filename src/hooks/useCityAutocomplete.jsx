import { useQuery } from '@tanstack/react-query';
import apiClient from '@app/api';

const fetchCityAutocomplete = async (keyword) => {
  console.log('fetchCityAutocomplete', keyword);
  try {
    const response = await apiClient.get(`/search/locations`, {
      params: {
        keyword: keyword
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useCityAutocomplete = (keyword) => {
  const minLength = 3;
  const debounceTime = 20000;

  // Ne pas effectuer la requête si la longueur du mot-clé est inférieure à minLength
  const shouldFetch = keyword.length >= minLength;

  return useQuery({
    queryKey: ['cityAutocomplete', keyword],
    queryFn: () => fetchCityAutocomplete(keyword),
    enabled: shouldFetch,
    // Utiliser lodash.debounce pour débouncer la fonction de requête
    refetchOnWindowFocus: false,
    debounce: (fn) => lodash.debounce(fn, debounceTime),
  });
};
