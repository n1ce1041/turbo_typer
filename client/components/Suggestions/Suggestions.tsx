// Suggestions.tsx

import React, { useEffect } from 'react'

interface SuggestionsProps {
  inputValue: string
  suggestions: string[]
  selectedSuggestionIndex: number
  handleSuggestionClick: (suggestion: string) => void
  handleEnterPress: (event: any) => void
  handleChange: (event: any) => void
}

const Suggestions: React.FC<SuggestionsProps> = ({
  inputValue,
  suggestions,
  selectedSuggestionIndex,
  handleSuggestionClick,
  handleEnterPress,
  handleChange,
}) => {
  useEffect(() => {
    document.addEventListener('keydown', handleEnterPress)
    return () => {
      document.removeEventListener('keydown', handleEnterPress)
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
