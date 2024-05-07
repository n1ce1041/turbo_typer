import React, { useState } from 'react';
import '../main.css';
import Fuse from 'fuse.js'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  const words = ["apple", "banana", "orange", "grape", "kiwi", "pineapple", "strawberry"];
  const options = {
    includeScore: true
  }
  const fuse = new Fuse(words, options)

  const handleChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setInputValue(value);

    // Split the input string by dots
    const segments = value.split('.');
  
    // Update the search term to be the last segment after splitting by dots
    const searchTerm = segments.pop().trim();
    const result = fuse.search(searchTerm)
  
    console.log(`The current search term is ${searchTerm} with result:`);
    console.log(result)

  };

  return (
    <div>
      <h1>Turbo Typer</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something here..."
          className="input-box"
        />
      </div>
      <div>
        {/* Display suggestions here */}
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
