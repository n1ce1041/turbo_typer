import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js' // Importing Fuse.js for fuzzy search
import SuggestionsList from './SuggestionsList' // Import the SuggestionsList component
import '../main.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  // Words array
  let words = [
    {
      phrase:
        'Thanks for contacting AWS Support. My name is Vili and I will be assisting you today.',
      group: '!hi',
    },
    {
      phrase:
        'Thanks for reaching out to AWS Lambda Support. My name is Vili and I will be helping you out today.',
      group: '!hi',
    },
    {
      phrase:
        'Thanks for reaching out to AWS API Gateway Support. My name is Vili and I will be helping you out today.',
      group: '!hi',
    },
    {
      phrase:
        'I am taking over from my colleague <COLLEAGUE>, who is unavailable at the moment',
      group: '!hi',
    },
    {
      phrase:
        'Just a kind reminder, that here at AWS Support we do not have visibility into your logging. This is for your security. Therefore, please export your logs from CloudWatch. If you need help, please see the following instructions [reference].',
      group: '!logs',
    },
    {
      phrase:
        'Just a reminder that here at AWS Support, code support is out of scope. This includes debugging and modifying your source code. Having said that, I can assist you on a best effort basis.',
      group: '!code',
    },
    {
      phrase:
        'I think a call and a chat over a screenshare would be appropriate. This should expedite investigtion and save us from any unncessary back and forth. Please disclose your number in international format and a good time (Please include your timezone) to call you to organise that. I work from 0900-1700 NZST.',
      group: '!call',
    },
    {
      phrase:
        "I'd be happy to discuss this over a screenshare with you. Please disclose your number in international format and a good time (Please include your timezone) to call you to organise that. I work from 0900-1700 NZST. Not to worry though, if i'm unavailable, I will make sure that a colleague of mine can attend in my stead.",
      group: '!call',
    },
    {
      phrase:
        "I hope that helps. Let me know if you have any burning questions about what we've discussed, and I'll be happy to give you a hand \n\nHave a great day!",
      group: '!end',
    },
    {
      phrase:
        'As agreed, I will be resolving this case now. However, you can always write back if you have any further questions. If you do, the case will be reopened.',
      group: '!resolved',
    },
    {
      phrase: '========================',
      group: '!ttl',
    },
    {
      phrase:
        '#--------------------stuff.py------------------------------- \n\n#--------------------end of file ---------------------------',
      group: '!cs',
    },
  ]

  // Initializing Fuse.js for fuzzy search
  const fuse = new Fuse(words, {
    shouldSort: true,
    threshold: 0.1,
    keys: ['phrase'],
  })

  // This one is to match macros!
  // Make this editable.
  const macroFuse = new Fuse(words, {
    shouldSort: true,
    threshold: 0.4,
    keys: ['group'],
  })

  // Function to handle input change
  const handleChange = (event) => {
    const { value } = event.target
    setInputValue(value)

    // Split the input string by dots
    let segments = value.split(/[.,]/)
    // Update the search term to be the last segment after splitting by dots
    let searchTerm = segments.pop().trim()

    // Check if the input is not empty
    if (searchTerm !== '') {
      // Check if the first character is '!'
      if (searchTerm[0] === '!') {
        console.log(`Reading "!" macro`)
        const result = macroFuse.search(searchTerm)
        let phrases = result.map((obj) => obj.item.phrase)
        console.log(phrases)
        setSuggestions(phrases)
      } else {
        console.log('Searching phrases')
        // Perform fuzzy search
        const result = fuse.search(searchTerm)
        // Map the phrases from the result
        let phrases = result.map((obj) => obj.item.phrase)
        console.log(phrases)
        setSuggestions(phrases)
      }
    } else {
      // Clear suggestions if input is empty
      setSuggestions([])
    }
  }
  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // Split the input value into lines
    const lines = inputValue.split('\n')

    // Get the last line (the line currently being typed)
    let lastLine = lines.pop()

    // Find the index of the last space character in the last line
    const lastSpaceIndex = lastLine.lastIndexOf(' ')

    // Remove the current search term from the last line and append the suggestion
    lastLine = lastLine.substring(0, lastSpaceIndex + 1) + suggestion

    // Combine the modified last line with the rest of the lines, preserving new lines
    const newInputValue = [...lines, lastLine].join('\n')

    // Set the new input value
    setInputValue(newInputValue)
    setSuggestions([])
  }

  // Function to handle Enter key press
  const handleEnterPress = (event) => {
    if (event.shiftKey && event.keyCode === 13) {
      // Check if Shift and Enter are pressed simultaneously
      event.preventDefault()
      setInputValue((prevValue) => prevValue + '\n') // Insert a newline character
    } else if (event.keyCode === 13) {
      // Handle normal Enter key press
      event.preventDefault()
      if (suggestions.length > 0) {
        // If there are suggestions, find the last space index in the input value before the cursor position
        const cursorPosition = event.target.selectionStart
        const lastSpaceIndex = inputValue.lastIndexOf(' ', cursorPosition)

        // Find the index of the last newline character before the cursor position
        const lastNewlineIndex = inputValue.lastIndexOf('\n', cursorPosition)

        // Check if the last space character occurs after the last newline character, if not, consider lastNewlineIndex as lastSpaceIndex
        const searchStartIndex =
          lastSpaceIndex > lastNewlineIndex ? lastSpaceIndex : lastNewlineIndex

        // Extract the search query including existing whitespace
        const searchQuery = inputValue
          .substring(searchStartIndex + 1, cursorPosition)
          .trim()

        // Construct the new input value with the suggestion and the remaining text
        const newValue =
          inputValue.substring(0, searchStartIndex + 1) +
          suggestions[0] +
          inputValue.substring(cursorPosition)

        setInputValue(newValue)
        setSuggestions([]) // Clear suggestions
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPress)
    return () => {
      document.removeEventListener('keydown', handleEnterPress)
    }
  }, [suggestions])

  return (
    <div className="container">
      <div className="title div">
        <h1>Turbo Typer</h1>
      </div>
      <div className="secondContainer">
        <div className="textArea">
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Add all of your correspondence in here...."
            className="input-box"
          ></textarea>
        </div>
        <div className="gridElements">
          <div className="suggestions">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          <SuggestionsList suggestions={words} />
        </div>
      </div>
      {/* <div className="input-container">
        <div className="input-box-container">
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="Correspondence here....."
            className="input-box"
          />
        </div>
        <div className="suggestions-container">
          <div className="matched-suggestions">
            <h2>Matched Suggestions</h2>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          <SuggestionsList suggestions={words} />
        </div>
      </div> */}
    </div>
  )
}

export default App
