import React from "react";
import { getHighlightedText } from "../SearchPage/SearchPage.helper";
import "./UserList.style.scss";
const UserList = ({ user: { name = "", id = "", address = "" }, search }) => {
  return (
    <div className="user-list-main-container">
      <div className="user-list-sub-container">
        <div className="user-id">{getHighlightedText(id, search)}</div>
        <div className="user-name">{getHighlightedText(name, search)}</div>
        {search?.length > 0 && (
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

export default UserList;
