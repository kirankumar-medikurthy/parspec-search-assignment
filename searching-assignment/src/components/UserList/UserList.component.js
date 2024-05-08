import React, { useState } from "react";
import { getHighlightedText } from "../SearchPage/SearchPage.helper";
import "./UserList.style.scss";
const UserList = ({ user: { name = "", id = "", address = "" }, search }) => {
  const [hover, setHover] = useState(false);

  const withFoundItemLabel = () => {
    return (
      <div className="user-list-main-container">
        <div className="user-list-sub-container">
          <div className="user-id">{getHighlightedText(id, search)}</div>
          <div className="user-name">{getHighlightedText(name, search)}</div>
          {search?.length > 0 && hover && (
            <div className="result-found-query">
              <div className="dot"></div>"{search}" found in items
            </div>
          )}
          <div className="user-address">
            {getHighlightedText(address, search)}
          </div>
        </div>
      </div>
    );
  };
  const handleMouseEnter = () => {
    if (!hover) {
      setHover(true);
    }
  };
  const handleMouseLeave = () => {
    if (hover) {
      setHover(false);
    }
  };
  return (
    <div
      className="user-list-main-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="user-list-sub-container">
        <div className="user-id">{getHighlightedText(id, search)}</div>
        <div className="user-name">{getHighlightedText(name, search)}</div>
        <div className="user-address">
          {getHighlightedText(address, search)}
        </div>
      </div>
      {hover ? withFoundItemLabel() : null}
    </div>
  );
};

export default UserList;
