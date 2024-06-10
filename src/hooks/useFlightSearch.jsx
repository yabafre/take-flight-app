// hooks/useFlightSearch.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFlightSearchParams } from '@app/store/reducers/search/searchSlice';

const useFlightSearch = () => {
  const dispatch = useDispatch();
  const flightSearchParams = useSelector((state) => state.search.flightSearchParams);

  const [mode, setMode] = useState(flightSearchParams.mode || 'round-trip');
  const [departureCity, setDepartureCity] = useState(flightSearchParams.originLocationCode || '');
  const [arrivalCity, setArrivalCity] = useState(flightSearchParams.destinationLocationCode || '');
  const [selectedDates, setSelectedDates] = useState({
    startDate: flightSearchParams.departureDate || '',
    endDate: flightSearchParams.returnDate || '',
  });
  const [passengers, setPassengers] = useState({
    adults: flightSearchParams.adults?.toString() || '1',
    children: flightSearchParams.children?.toString() || '0',
  });

  let searchParams = {
    originLocationCode: departureCity,
    destinationLocationCode: arrivalCity,
    departureDate: selectedDates.startDate,
    adults: parseInt(passengers.adults),
  };

  if (mode === 'round-trip' && selectedDates.endDate) {
    searchParams = {
      ...searchParams,
      returnDate: selectedDates.endDate,
    };
  }

    if (passengers.children > 0) {
      searchParams = {
        ...searchParams,
        children: parseInt(passengers.children),
      };
    }

  useEffect(() => {
    const paramsChanged =
        flightSearchParams.originLocationCode !== searchParams.originLocationCode ||
        flightSearchParams.destinationLocationCode !== searchParams.destinationLocationCode ||
        flightSearchParams.departureDate !== searchParams.departureDate ||
        flightSearchParams.returnDate !== searchParams.returnDate ||
        flightSearchParams.adults !== searchParams.adults ||
        flightSearchParams.children !== searchParams.children;

    if (paramsChanged) {
      dispatch(setFlightSearchParams(searchParams));
    }
  }, [searchParams, dispatch, flightSearchParams]);

  return { searchParams, setDepartureCity, setArrivalCity, setSelectedDates, setPassengers, setMode, mode, departureCity, arrivalCity, selectedDates, passengers };
};

export default useFlightSearch;
