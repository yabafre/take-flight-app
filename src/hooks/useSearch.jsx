import {useQuery} from '@tanstack/react-query';
import {useDispatch, useSelector} from 'react-redux';
import apiClient from '@app/api';
import {setError, setFlights, setHotels, setStatus,} from '@app/store/reducers/search/searchSlice';
import {useEffect} from "react";

const fetchFlightOffers = async (params) => {
  // console.log('flight params : ',params)
  try {
    const response = await apiClient.get('/search/flight-offers', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchHotelOffers = async (params) => {
  try {
    const response = await apiClient.get('/search/hotels/offers', { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchFlightPricing = async (flightOffer) => {
    try {
      const response = await apiClient.post('/search/flight-offers/pricing', flightOffer);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
}


const useSearch = (type, params) => {
  // console.log('type : ',type, ',params : ',params)
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.search);

  const typeFn = () => {
    if (type === 'flights') {
      return fetchFlightOffers(params);
    } else if (type === 'hotels') {
      return fetchHotelOffers(params);
    } else if (type === 'flight-pricing') {
      return fetchFlightPricing(params);
    }
  }

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
      }
    }
  }, [data, isLoading, isError, error, type, dispatch]);

  return { status, error };
};

export default useSearch;
