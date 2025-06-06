import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || "Rechercher..."}
    style={{ marginBottom: 16, padding: 8, width: "100%" }}
  />
);

export default SearchBar;
