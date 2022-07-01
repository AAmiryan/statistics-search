import React from "react";
import DataCard from "../Card/Card";
import "./Statistics.css";

const SearchStatistics = () => {
  const statistics = JSON.parse(localStorage.getItem("statistics"));
  return (
    <div className="statistiContainer">
      {statistics?.map((data) => (
        <DataCard data={data} key={data.label+data.value} />
      ))}
    </div>
  );
};
export default SearchStatistics;
