// hooks/useHotelSearch.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelSearchParams  } from '@app/store/reducers/search/searchSlice';

const useHotelSearch = () => {
    const [cityCode, setCityCode] = useState('');
    const [selectedDates, setSelectedDates] = useState({ startDate: '', endDate: '' });
    const [guests, setGuests] = useState({ adults: '1', children: '0' });

    const searchParams = {
        cityCode: cityCode,
        checkInDate: selectedDates.startDate,
        checkOutDate: selectedDates.endDate,
        adults: parseInt(guests.adults),
        children: parseInt(guests.children) || 0,
    };

    const dispatch = useDispatch();
    const { hotelSearchParams } = useSelector((state) => state.search);

    useEffect(() => {
        dispatch(setHotelSearchParams(searchParams));
    }, [searchParams, dispatch]);

    return { searchParams, setCityCode, setSelectedDates, setGuests };
}

export default useHotelSearch;