import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4001/fetch-gpt?prompt=${searchPrompt}`
      );
      const results = await response.text();
      setApiResponse(results);
      console.log(results);
      return results;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a prompt..."
          value={searchPrompt}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <p className="answer">{apiResponse}</p>
      </div>
    </div>
  );
};

export default SearchBar;
