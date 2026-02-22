import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // Optional: Install react-bootstrap-icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Optional: Real-time search as user types
    if (onSearch) onSearch(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="w-50 max-width-md mt-10rem">
        {/* if i use 40%width why is search bar getting shrinked */}
      <InputGroup className="shadow-sm">
        <InputGroup.Text className="bg-white border-end-0">
          <Search className="text-muted" />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search for something..."
          className="shadow-none ps-0 focus-none"
          value={query}
          onChange={handleInputChange}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;