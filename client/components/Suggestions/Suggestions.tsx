// Suggestions.tsx

import React, { useEffect } from 'react'

interface SuggestionsProps {
  inputValue: string
  suggestions: string[]
  selectedSuggestionIndex: number
  handleSuggestionClick: (suggestion: string) => any
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  selectedSuggestionIndex,
  handleSuggestionClick,
}) => {
  return (
    <div className="suggestions">
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={index === selectedSuggestionIndex ? 'selected' : ''}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions
