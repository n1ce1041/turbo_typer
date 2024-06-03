// Suggestions.tsx

import React, { useEffect } from 'react'

interface SuggestionsProps {
  inputValue: string
  suggestions: string[]
  selectedSuggestionIndex: number
  handleSuggestionClick: (suggestion: string) => any
  handleEnterPress: (event: any) => any
  handleChange: (event: any) => any
}

const Suggestions: React.FC<SuggestionsProps> = ({
  inputValue,
  suggestions,
  selectedSuggestionIndex,
  handleSuggestionClick,
  handleEnterPress,
  handleChange,
}) => {
  console.log(`INPUT VALUE ${inputValue}`)
  useEffect(() => {
    document.addEventListener('keydown', handleEnterPress)
    return () => {
      null
    }
  }, [suggestions, selectedSuggestionIndex])

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
