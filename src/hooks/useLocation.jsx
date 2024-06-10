import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as LocationGps from 'expo-location';

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [stateRefresh, setStateRefresh] = useState(false);

    const fetchLocation = async () => {
        let { status } = await LocationGps.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        const location = await LocationGps.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`);
        return response.data;
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['location'],
        queryFn: fetchLocation,
        enabled: stateRefresh,
    });

    const setDatas = () => {
        const { results } = data;
        let addressComponents = [];
        if (results.length > 0) {
            addressComponents = results[0].address_components;
        } else {
            setErrorMsg('Address not found');
        }

        const cityComponent = addressComponents.find(component => component.types.includes("locality"));
        const countryComponent = addressComponents.find(component => component.types.includes("country"));

        if (cityComponent && countryComponent) {
            const city = cityComponent.long_name;
            const country = countryComponent.long_name;
            setLocation(`${city}, ${country}`);
        } else {
            setErrorMsg('City or country not found');
        }
    };

    useEffect(() => {
        setStateRefresh(true);
    }, []);

    useEffect(() => {
        if (data) {
            setDatas();
        }
    }, [data]);

    return { isLoading, location, errorMsg };
};

export default useLocation;
