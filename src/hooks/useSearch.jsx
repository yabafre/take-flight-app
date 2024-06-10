import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '@app/api';
import {
  setResults,
  setStatus,
  setError,
  setPage,
  setTotalPages,
} from '@app/store/search/searchSlice';
import { useEffect } from 'react';

const fetchSearchResults = async (type, params, page) => {
  const { data } = await apiClient.get(`/search/${type}`, {
    params: { ...params, page },
  });
  return data;
};

const useSearch = (type) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.search.page);
  const searchParams = useSelector((state) => state.search.searchParams[type]);

  const { data, status, error } = useQuery(
    {
    queryKey:['search', type, searchParams, page],
    queryFn: () => fetchSearchResults(type, searchParams, page),
    onSuccess: (data) => {
      dispatch(setResults({ type, results: data.results }));
      dispatch(setTotalPages(data.totalPages));
    },
    onError: (error) => {
      dispatch(setError(error));
    },
  });


  useEffect(() => {
    dispatch(setStatus(status));
  }, [status]);

  return { data, status, error, page, totalPages: data?.totalPages };
};

export default useSearch;
