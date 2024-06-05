import React, { useState } from 'react'
import { useData } from '../App'
import './options.css'

const Options = () => {
  const { data, setData } = useData()
  const [s3Url, setS3Url] = useState('')
  const [jsonInput, setJsonInput] = useState('')

  const handleInputChange = (event) => {
    setS3Url(event.target.value)
  }

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value)
  }

  const handleTestDownload = async () => {
    try {
      const response = await fetch(s3Url)
      if (!response.ok) {
        throw new Error('Failed to download file')
      }
      const data = await response.json() // Assuming the file is JSON
      console.log('Downloaded data:', data)
      setData(data)
      window.alert('Config Loaded')
    } catch (error) {
      console.error('Error downloading file:', error)
      window.alert('Error: Check console for more info')
    }
  }

  const handleSaveToCache = () => {
    if (data) {
      localStorage.setItem('cachedData', JSON.stringify(data))
      console.log('Data saved to cache:', data)
      window.alert('Data saved to cache')
    } else {
      console.error('No data to save to cache')
      window.alert('No data to save to cache')
    }
  }

  const handleSubmitJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      setData(parsedData)
      console.log('Data set from JSON input:', parsedData)
      window.alert('Config Loaded')
    } catch (error) {
      console.error('Invalid JSON:', error)
      window.alert('Error: Check console for more info')
    }
  }

  return (
    <div className="options-container">
      <h2>Options</h2>
      <p>Enter a URL for your config json, or enter it in the field below</p>
      <p></p>
      <form>
        <label htmlFor="s3Url">S3 URL:</label>
        <input
          type="text"
          id="s3Url"
          value={s3Url}
          onChange={handleInputChange}
          placeholder="Enter S3 URL"
        />
        <button type="button" onClick={handleTestDownload}>
          Download
        </button>
        <div>
          <label htmlFor="jsonInput">Enter your JSON Data:</label>
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={handleJsonChange}
            placeholder='[{ "phrase" : "hello", "group" : "weeeeeeee!"}]'
            rows="10"
            cols="50"
          ></textarea>
          <button type="button" onClick={handleSubmitJson}>
            Submit JSON
          </button>
          <button type="button" onClick={handleSaveToCache}>
            Save to Cache
          </button>
        </div>
      </form>
      {data && (
        <div className="preview-box">
          <h3>Loaded Data Preview:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Options
