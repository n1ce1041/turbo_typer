interface Suggestion {
  phrase: string
  group: string
}

interface SuggestionsListProps {
  suggestions: Suggestion[]
}

const SuggestionsList = ({ suggestions }: SuggestionsListProps) => {
  const groupedSuggestions = suggestions.reduce<Record<string, string[]>>(
    (groups, suggestion) => {
      const group = suggestion.group || 'Uncategorized'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(suggestion.phrase)
      return groups
    },
    {}
  )

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
