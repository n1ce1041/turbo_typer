// App.tsx

import { useState, useEffect, useCallback } from 'react'
import Fuse from 'fuse.js'
import SuggestionsList from './SuggestionsList/SuggestionsList'
import TextArea from './TextArea/TextArea'
import Suggestions from './Suggestions/Suggestions'
import WordsJson from '../words2.json'
import '../main.css'
import { useData } from './App'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const { data } = useData()

  // let words = WordsJson
  console.log(data)

  let words

  if (data) {
    words = data
  } else {
    words = WordsJson
  }

  const fuse = new Fuse(words, {
    shouldSort: true,
    threshold: 0.1,
    keys: ['phrase'],
  })

  const macroFuse = new Fuse(words, {
    shouldSort: true,
    threshold: 0.4,
    keys: ['group'],
  })

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    setInputValue(value)

    let segments = value.split(/[.,]/)
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

  const handleSuggestionClick = (suggestion: string) => {
    const lines = inputValue.split('\n')
    const lastIndex = lines.length - 1
    let lastLine = lines[lastIndex].trim()
    const lastDotIndex = lastLine.lastIndexOf('.')

    if (lastDotIndex !== -1) {
      lastLine = lastLine.substring(0, lastDotIndex + 1)
    } else {
      lastLine = ''
    }

    const newInputValue = [
      ...lines.slice(0, lastIndex),
      lastLine + suggestion,
    ].join('\n')
    setInputValue(newInputValue)
    setSuggestions([])
  }

  const handleShiftEnterPress = useCallback(
    (event: any) => {
      event
      if (event.shiftKey && event.keyCode === 13) {
        event.preventDefault()
        setInputValue((prevValue) => prevValue + '\n')
      }
    },
    [handleChange]
  )

  const handlePlainEnterPress = useCallback(
    (event: any) => {
      if (!event.shiftKey && event.keyCode === 13) {
        event.preventDefault()
        console.log('Suggestions length:', suggestions.length)
        if (suggestions.length > 0) {
          console.log('Calling handleSuggestionClick')
          handleSuggestionClick(suggestions[selectedSuggestionIndex])
        }
      }
    },
    [handleSuggestionClick, suggestions, selectedSuggestionIndex]
  )

  const handleTabPress = useCallback(
    (event: any) => {
      if (event.keyCode === 9) {
        event.preventDefault()
        setSelectedSuggestionIndex(
          (prevIndex) => (prevIndex + 1) % suggestions.length
        )
      }
    },
    [suggestions.length]
  )

  const handleShortcutKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey) {
      let shortcutKey = ''
      switch (event.key) {
        case '1':
          shortcutKey = '[1]'
          break
        case '2':
          shortcutKey = '[2]'
          break
        case '3':
          shortcutKey = '[3]'
          break
        case '4':
          shortcutKey = '[4]'
          break
        case '5':
          shortcutKey = '[5]'
          break
        case '6':
          shortcutKey = '[6]'
          break
        case '7':
          shortcutKey = '[7]'
          break
        // Add more cases for other shortcut keys as needed
        default:
          return
      }
      setInputValue((prevValue) => prevValue + shortcutKey)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleShortcutKeyPress)

    return () => {
      document.removeEventListener('keydown', handleShortcutKeyPress)
    }
  }, [handleShortcutKeyPress])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      handleShiftEnterPress(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleShiftEnterPress])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      handlePlainEnterPress(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePlainEnterPress])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      handleTabPress(event)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleTabPress])

  return (
    <div className="secondContainer">
      <TextArea inputValue={inputValue} handleChange={handleChange} />
      <div className="gridElements">
        <Suggestions
          inputValue={inputValue}
          suggestions={suggestions}
          selectedSuggestionIndex={selectedSuggestionIndex}
          handleSuggestionClick={handleSuggestionClick}
        />
        <SuggestionsList suggestions={words} />
      </div>
    </div>
  )
}

export default App
