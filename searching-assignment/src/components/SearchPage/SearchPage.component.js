import React, { useEffect, useState, useRef } from "react";
import { truncate } from "./SearchPage.helper";
import {
  USER_LIST_API_URL,
  SEARCH_PLACEHOLDER_TEXT,
} from "../../Utils/constants";
import { getUserListInformation } from "./SearchPage.helper";
import UserList from "../UserList/UserList.component";
import Clear from "./icons/close-black.png";
import searchIcon from "./icons/search-black.svg";
import "./SearchPage.style.scss";
import Shimers from "../Shimers/Shimers.component";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Index of the focused card

  useEffect(() => {
    getUserListInformation(USER_LIST_API_URL, setUserList, setIsLoading);
  }, []);

  const handleSearchTextChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterData = (item) => {
    if (
      item?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.id?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.address?.toLowerCase().includes(search?.toLowerCase()) ||
      item?.pincode?.toLowerCase().includes(search?.toLowerCase())
    ) {
      return item;
    }
  };

  const filteredUserList = userList.filter(handleFilterData);

  const renderNoResultFound = () => {
    return <div className="no-result-found">No User Found</div>;
  };

  const handleClear = () => {
    setSearch("");
    setFocusedIndex(-1); // Reset focused index when clearing the search
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredUserList.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  return (
    <div className="search-page-container" onKeyDown={handleKeyDown}>
      <div className="SearchIcon">
        <div>
          <img
            lazyLoad={true}
            id="searchIconImage"
            src={searchIcon}
            alt="searchIcon"
            // onClick={this.onSubmit}
          />
        </div>
        <div>
          <form className="searchFrom" id="header-search" autoComplete="off">
            <input
              id="search-field"
              name="search"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder={SEARCH_PLACEHOLDER_TEXT}
              onChange={handleSearchTextChange}
              value={search}
            />
          </form>
        </div>
        {search?.length > 0 && (
          <div>
            <img
              lazyLoad={true}
              id="clearIconImage"
              src={Clear}
              alt="clearIcon"
              onClick={handleClear}
            />
          </div>
        )}
      </div>
      <div className="userList-main-container">
        {isLoading ? (
          <Shimers
            wrapperBlock={"CategoiresAccordianWrapper"}
            elementBlock={"CategoiresAccordianCard"}
            count={5}
          />
        ) : filteredUserList.length > 0 ? (
          filteredUserList.map((user, index) => (
            <UserList
              key={user?.id}
              user={user}
              search={search}
              isFocused={index === focusedIndex}
            />
          ))
        ) : (
          renderNoResultFound()
        )}
      </div>
    </div>
  );
};

export default SearchPage;
