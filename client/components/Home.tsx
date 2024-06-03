// App.tsx

import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import SuggestionsList from './SuggestionsList/SuggestionsList'
import TextArea from './TextArea/TextArea'
import Suggestions from './Suggestions/Suggestions'
import Navbar from './Navbar/Navbar'
import '../main.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)

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
        '#--------------------snippet------------------------------- \n\n#--------------------end of file ---------------------------',
      group: '!cs',
    },
  ]

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
    let lastLine = lines.pop().trim()
    const lastSpaceIndex = lastLine.lastIndexOf(' ')
    lastLine = lastLine.substring(0, lastSpaceIndex + 1) + suggestion
    const newInputValue = [...lines, lastLine].join('\n')
    setInputValue(newInputValue)
    setSuggestions([])
  }

  const handleEnterPress = (event: {
    shiftKey: any
    keyCode: number
    preventDefault: () => void
  }) => {
    if (event.shiftKey && event.keyCode === 13) {
      event.preventDefault()
      setInputValue((prevValue) => prevValue + '\n')
    } else if (event.keyCode === 13) {
      event.preventDefault()
      console.log('Suggestions length:', suggestions.length)
      if (suggestions.length > 0) {
        console.log('Calling handleSuggestionClick')
        handleSuggestionClick(suggestions[selectedSuggestionIndex])
      }
    } else if (event.keyCode === 9) {
      event.preventDefault()
      setSelectedSuggestionIndex(
        (prevIndex) => (prevIndex + 1) % suggestions.length
      )
    }
  }

  return (
    <div className="secondContainer">
      <TextArea
        inputValue={inputValue}
        handleChange={handleChange}
        fuse={fuse}
        macroFuse={macroFuse}
      />
      <div className="gridElements">
        <Suggestions
          inputValue={inputValue}
          suggestions={suggestions}
          selectedSuggestionIndex={selectedSuggestionIndex}
          handleSuggestionClick={handleSuggestionClick}
          handleEnterPress={handleEnterPress}
          handleChange={handleChange}
        />
        <SuggestionsList suggestions={words} />
      </div>
    </div>
  )
}

export default App
