// TextArea.js
import React, { useState, useEffect } from 'react'

const TextArea = ({ inputValue, handleChange, fuse, macroFuse }) => {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const [suggestions, setSuggestions] = useState([])

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.keyCode === 13) {
      event.preventDefault()
      handleChange({ target: { value: inputValue + '\n' } })
    } else if (event.keyCode === 13) {
      event.preventDefault()
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex])
      }
    } else if (event.keyCode === 9) {
      event.preventDefault()
      setSelectedSuggestionIndex(
        (prevIndex) => (prevIndex + 1) % suggestions.length
      )
    }
  }

  const handleSuggestionClick = (suggestion) => {
    const lines = inputValue.split('\n')
    let lastLine = lines.pop()
    const lastSpaceIndex = lastLine.lastIndexOf(' ')
    lastLine = lastLine.substring(0, lastSpaceIndex + 1) + suggestion
    const newInputValue = [...lines, lastLine].join('\n')
    handleChange({ target: { value: newInputValue } })
    setSuggestions([])
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      handleKeyDown(event)
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [suggestions, selectedSuggestionIndex, inputValue])

  const handleInputChange = (event) => {
    handleChange(event)
    let segments = event.target.value.split(/[.,]/)
    let searchTerm = segments.pop().trim()

    if (searchTerm !== '') {
      if (searchTerm[0] === '!') {
        const result = macroFuse.search(searchTerm)
        let phrases = result.map((obj) => obj.item.phrase)
        setSuggestions(phrases)
        setSelectedSuggestionIndex(0)
      } else {
        const result = fuse.search(searchTerm)
        let phrases = result.map((obj) => obj.item.phrase)
        setSuggestions(phrases)
        setSelectedSuggestionIndex(0)
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="textArea">
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add all of your correspondence in here...."
        className="input-box"
      ></textarea>
    </div>
  )
}

export default TextArea
