import React from "react";
import { Card } from "antd";
import "./Card.css";
import PropTypes from "prop-types";

const DataCard = ({ data }) => {
  return (
    <Card title={data.name} bordered={false} className="dataCard">
      {data.name ? (
        <div>
          <p>
            Wikipedia:{" "}
            <a href={data.wikipedia_url} target="_blank" rel="noreferrer">
              About cat {data.name}
            </a>
          </p>
          <p>Life span: {data.life_span} year</p>
          <p>Origin: {data.origin}</p>
          <p>Description: {data.description}</p>
        </div>
      ) : (
        <div>
          <span>
            {data.label}: {data.value}
          </span>
        </div>
      )}
    </Card>
  );
};
export default DataCard;

DataCard.prototype = {
  data: PropTypes.object,
};
