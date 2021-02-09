import React, { Fragment, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { filterGames, clearFilter } from "../actions/gameActions";

const SearchBar = () => {
  const gameFilter = useSelector((state) => state.gameFilter);
  const { filtered } = gameFilter;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterGames(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Fragment>
      <form id='searchForm'>
        <input
          type='text'
          placeholder='Search games '
          onChange={onChange}
          ref={text}
          className='searchBar'
        />
        <button>
          <i className='fas fa-search searchBtn'></i>
        </button>
      </form>
    </Fragment>
  );
};

export default SearchBar;
