import { AutoComplete, Empty, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import DataCard from "../Card/Card";
import "./Search.css";

const Search = () => {
  const { isLoading, data, query, setQuery } = useFetch();
  const [options, setOptions] = useState([]);
  const [saerchParams, setSerarchParams] = useSearchParams();

  useEffect(() => {
    const postQuery = saerchParams.get("search");
    if (postQuery) {
      let newPostQuery = postQuery.replace("+", " ");
      setQuery(newPostQuery);
    } else {
      setQuery("");
    }
  }, [saerchParams, setQuery]);

  const getAnaliticsData = () => {
    return JSON.parse(localStorage.getItem("statistics"))
      ? JSON.parse(localStorage.getItem("statistics"))
      : [];
  };

  const onSearch = (searchText) => {
    const searchOptions = data?.filter((cat) =>
      cat.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const optionsText = searchOptions?.map((option) => ({
      value: option.name.toLowerCase(),
    }));
    setOptions(searchText ? optionsText : []);
  };

  const onSelect = (selectData) => {
    setSerarchParams({ search: selectData });
    const analiticsData = getAnaliticsData();
    let result;
    let statistics = analiticsData.find((item) => item.label === selectData);

    if (statistics) {
      statistics.value = statistics.value + 1;
    } else {
      statistics = {
        value: 1,
        label: selectData,
      };
    }
    if (analiticsData.length) {
      if (statistics.value > 1) {
        result = analiticsData.map((item) => {
          if (item.label === selectData) {
            return statistics;
          }
          return item;
        });
      } else {
        result = [...analiticsData, statistics];
      }
    } else {
      result = [statistics];
    }

    return setItemLocalStorige(result);
  };

  const onChange = (searchedData) => {
    setQuery(searchedData);
  };

  const setItemLocalStorige = (data) => {
    localStorage.setItem("statistics", JSON.stringify(data));
  };

  return (
    <div className="searchContainer">
      <div>
        <h1>Search</h1>
        <p> Search for a Breed by using of it’s name </p>
        <p>
          For example: arabian mau, abyssinian, aegean, ragamuffin, american
          bobtails
        </p>
      </div>
      <div>
        <AutoComplete
          value={query}
          options={options}
          className="saerchAutoComplete"
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder="Enter cat name"
        />
      </div>

      {isLoading ? (
        <Spin size="large" />
      ) : data?.length ? (
        <div className="cardContainer">
          {data?.length === 1 &&
            data?.map(
              (item) =>
                query === item.name.toLowerCase() && (
                  <DataCard data={item} isLoading={isLoading} key={item.id} />
                )
            )}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Search;
