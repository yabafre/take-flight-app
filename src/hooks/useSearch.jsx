import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '@app/api';
import { setError, setFlights, setHotels, setflightPricingData, setStatus, setAllInclusiveData } from '@app/store/reducers/search/searchSlice';
import { useEffect } from 'react';

const fetchFlightOffers = async (params) => {
  try {
    const response = await apiClient.get('/search/flight-offers', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchHotelOffers = async (params) => {
  try {
    const response = await apiClient.get('/search/hotels/offers', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchFlightPricing = async (flightOffer) => {
  try {
    const response = await apiClient.post('/search/flight-offers/pricing', flightOffer);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAllInclusiveOffers = async (params) => {
  try {
    const response = await apiClient.post('/search/assistant', params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useSearch = (type, params) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.search);

  const typeFn = () => {
    if (type === 'flights') {
      return fetchFlightOffers(params);
    } else if (type === 'hotels') {
      return fetchHotelOffers(params);
    } else if (type === 'flight-pricing') {
      return fetchFlightPricing(params);
    } else if (type === 'all-inclusive') {
      return fetchAllInclusiveOffers(params);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [type, params],
    queryFn: typeFn,
    enabled: params !== null && params !== undefined,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus('loading'));
    } else if (isError) {
      dispatch(setStatus('error'));
      dispatch(setError(error));
    } else {
      dispatch(setStatus('idle'));
      if (type === 'flights') {
        dispatch(setFlights(data));
      } else if (type === 'hotels') {
        dispatch(setHotels(data));
      } else if (type === 'flight-pricing') {
        dispatch(setflightPricingData(data));
      } else if (type === 'all-inclusive') {
        dispatch(setAllInclusiveData(data));
      }
    }
  }, [data, isLoading, isError, error, type, dispatch]);

  return { status, error, data };
};

export default useSearch;
