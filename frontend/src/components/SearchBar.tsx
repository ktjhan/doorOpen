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

  const toggleHighlight = () => {
    setHighlightEnabled(!highlightEnabled);

    if (!highlightEnabled) {
      document.onmouseup =
        document.onkeyup =
        document.onselectionchange =
          () => {
            const selection = document.getSelection()?.toString();

            if (selection?.length) {
              const trimmedSelection = selection.trim();
              const leadingSpaces = selection.split(trimmedSelection)[0];
              const trailingSpaces = selection.split(trimmedSelection)[1];
              const range = document.getSelection()?.getRangeAt(0);
              const newNode = document.createElement("span");

              newNode.setAttribute("style", "background-color: lightblue;");
              newNode.setAttribute("data-tag", "Your Tag");
              newNode.setAttribute("data-summary", "Your Summary");
              newNode.addEventListener("click", onHighlightClick);
              newNode.appendChild(document.createTextNode(selection));

              const leadingSpacesNode = document.createTextNode(leadingSpaces);
              const trailingSpacesNode =
                document.createTextNode(trailingSpaces);

              range?.deleteContents();
              range?.insertNode(trailingSpacesNode);
              range?.insertNode(newNode);
              range?.insertNode(leadingSpacesNode);
              setSearchPrompt(selection);
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
        <button onClick={toggleHighlight}>Toggle Highlighting</button>
      </div>
    </div>
  );
};

export default SearchBar;
