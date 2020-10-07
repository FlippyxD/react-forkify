import React from "react";

import Likes from "./Likes";

import Logo from "../img/logo.png";

import { FaSearch } from "react-icons/fa";

import "../styles/Header.css";

const Header = ({ getSearch, updateSearch, searchText, liked, showDetail }) => {
  return (
    <header className="header">
      <img src={Logo} alt="Logo" className="header__logo" />
      <form className="search" onSubmit={getSearch}>
        <input
          onChange={updateSearch}
          value={searchText}
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
        />
        <button className="btn search__btn">
          <FaSearch className="search__icon" />
          <span>Search</span>
        </button>
      </form>

      <Likes liked={liked} showDetail={showDetail} />
    </header>
  );
};

export default Header;
