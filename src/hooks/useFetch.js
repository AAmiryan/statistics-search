import { useState, useEffect, useCallback } from "react";

export const useFetch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    isLoading: false,
    data: null,
    onError: null,
  });

  const getData = useCallback(async () => {
    setData({ isLoading: true });
    try {
      let response = await fetch(
        `https://api.thecatapi.com/v1/breeds/search?q=${query}`
      );
      let data = await response.json();
      setData({ isLoading: false, data: data });
    } catch (err) {
      setData({ isLoading: false, onError: err });
      throw Error(err.message);
    }
  }, [query]);

  useEffect(() => {
    getData();
  }, [getData, query]);

  return {
    ...data,
    getData,
    query,
    setQuery,
  };
};
