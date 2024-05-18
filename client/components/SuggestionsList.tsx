import React from 'react'

const SuggestionsList = ({ suggestions }) => {
  // Group suggestions by their 'group' value
  const groupedSuggestions = suggestions.reduce((groups, suggestion) => {
    const group = suggestion.group || 'Uncategorized'
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(suggestion.phrase)
    return groups
  }, {})

  return (
    <div className="allSuggestions">
      {Object.entries(groupedSuggestions).map(([group, phrases]) => (
        <div key={group} className="group">
          <h3>{group}</h3>
          <ul>
            {phrases.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default SuggestionsList
