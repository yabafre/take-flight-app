// hooks/useFlightSearch.js
import { useState, useEffect } from 'react';
import useSearch from '@app/hooks/useSearch';

const useFlightSearch = () => {
  const [mode, setMode] = useState('round-trip');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [selectedDates, setSelectedDates] = useState({ startDate: '', endDate: '' });
  const [passengers, setPassengers] = useState({ adults: '1', children: '0' });

  const searchParams = {
    originLocationCode: departureCity,
    destinationLocationCode: arrivalCity,
    departureDate: selectedDates.startDate,
    returnDate: mode === 'round-trip' ? selectedDates.endDate : undefined,
    adults: parseInt(passengers.adults),
    children: parseInt(passengers.children) || 0,
  };

  const { data, status, error, page, totalPages, setPage } = useSearch('flights', searchParams);

  return {
    mode,
    setMode,
    departureCity,
    setDepartureCity,
    arrivalCity,
    setArrivalCity,
    selectedDates,
    setSelectedDates,
    passengers,
    setPassengers,
    data,
    status,
    error,
    page,
    totalPages,
    setPage
  };
};

export default useFlightSearch;
