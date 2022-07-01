import { useState, useEffect } from "react";

export const useFetch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({
    isLoadind: false,
    data: null,
    onError: null,
  });

  async function getDta() {
    setData({ isLoadind: true });
    try {
      let response = await fetch(
        `https://api.thecatapi.com/v1/breeds/search?q=${query}`
      );
      let data = await response.json();
      setData({ isLoadind: false, data: data });
    } catch (err) {
      setData({ isLoadind: false, onError: err });
      throw Error(err.message);
    }
  }

  useEffect(() => {
    query && getDta();
  }, [query]);

  return {
    ...data,
    getDta,
    query,
    setQuery,
  };
};
