import React, { useState, useEffect } from "react";

const SearchBar: React.FC = () => {
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [highlightEnabled, setHighlightEnabled] = useState<boolean>(false);

  const onHighlightClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log((e.target as HTMLElement).dataset.tag);
    console.log((e.target as HTMLElement).dataset.summary);
  };
  
  const onClick = () => {
    setHighlightEnabled(!highlightEnabled);
  
    if (!highlightEnabled) {
      document.onmouseup = document.onkeyup = document.onselectionchange = () => {
        const selection = document.getSelection()?.toString().trim();
    
        if (selection?.length) {
          const range = document.getSelection()?.getRangeAt(0)
          const newNode = document.createElement('span');
          newNode.setAttribute('style', 'background-color: lightblue;');
          newNode.setAttribute('data-tag', 'Your Tag');
          newNode.setAttribute('data-summary', 'Your Summary');
          newNode.addEventListener('click', onHighlightClick);
          newNode.appendChild(document.createTextNode(selection));
          range?.deleteContents();
          range?.insertNode(newNode);
          setSearchPrompt(selection);  // Updated state here
        }
      };
    } else {
      document.onmouseup = document.onkeyup = document.onselectionchange = null;
    }
  };

  useEffect(() => {
    return () => {
      document.onmouseup = document.onkeyup = document.onselectionchange = null;
    };
  }, []);

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
      <div className="answer">
        <p>{apiResponse}</p>
        <button onClick={onClick}>Toggle Highlighting</button>
      </div>
    </div>
  );
};

export default SearchBar;
