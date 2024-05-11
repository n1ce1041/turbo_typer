import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js'; // Importing Fuse.js for fuzzy search
import '../main.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Words array
  let words = [
    "Apple", "Pencil", "Pen", "Chair", "Helmet", "Grapes", "Tub", "Trophy",
    "Cookie", "Donut", "Shirt", "Bat", "Ash", "Bell", "Chat", "Ball", "Eye",
    "Fish", "Zip", "Game", "Juice", "Orange", "Fan", "Ice"
  ];

  // Initializing Fuse.js for fuzzy search
  const fuse = new Fuse(words, {
    shouldSort: true,
    threshold: 0.4,
    keys: ['name']
  });

  // Function to handle input change
  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    // Split the input string by dots
    let segments = value.split('.');

    // Update the search term to be the last segment after splitting by dots
    let searchTerm = segments.pop().trim();
    

    console.log(`The Search Term is ${searchTerm}`)

    if (searchTerm !== '') {
      // Perform fuzzy search
      const result = fuse.search(searchTerm);

      // Set suggestions
      setSuggestions(result);
    } else {
      // Clear suggestions if input is empty
      setSuggestions([]);
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.item);
    setSuggestions([]);
  };

  // Function to handle Enter key press
  const handleEnterPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); 
      if (suggestions.length > 0) {
        setInputValue(suggestions[0].item);
        setSuggestions([]);
      }
    }
  };/*  */

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPress);
    return () => {
      document.removeEventListener('keydown', handleEnterPress);
    };
  }, [suggestions]);

  return (
    <div className="container">
  <h1>Turbo Typer</h1>
  <div className="input-container">
    <textarea
      value={inputValue}
      onChange={handleChange}
      placeholder="Correspondence here....."
      className="input-box"
    />
    <ul className="suggestion-list">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
          {suggestion.item}
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default App;
