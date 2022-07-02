import { Empty } from "antd";
import React from "react";
import DataCard from "../Card/Card";
import "./Statistics.css";

const SearchStatistics = () => {
  const statistics = JSON.parse(localStorage.getItem("statistics"));
  return (
    <div className="statisticsContainer">
      <div>
        <h1>Statistics</h1>
        <p> Statistics of search for a Breed by it’s name </p>
      </div>
      {statistics && statistics.length ? (
        <div>
          {statistics?.map((data) => (
            <DataCard data={data} key={data.label + data.value} />
          ))}
        </div>
      ) : (
        <Empty description="No Statistics" />
      )}
    </div>
  );
};
export default SearchStatistics;
