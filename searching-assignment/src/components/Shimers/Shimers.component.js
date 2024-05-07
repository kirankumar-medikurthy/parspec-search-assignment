import React from "react";
import "./Shimers.style.scss";

const Shimers = ({ wrapperBlock, elementBlock, count = 4 }) => {
  const cardCount = count ? count : 4;
  const cards = Array.from({ length: cardCount }, (_, index) => (
    <div key={index} className={elementBlock}></div>
  ));
  return <div className={wrapperBlock}>{cards}</div>;
};

export default Shimers;
