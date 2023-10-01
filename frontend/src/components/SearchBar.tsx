import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4001/fetch-gpt?prompt=${searchPrompt}`);
    const results = await response.json();
    console.log(results);
    return results;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Type a prompt...' value={searchPrompt} onChange={handleChange} />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchBar;
