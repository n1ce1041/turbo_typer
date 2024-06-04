import React, { useState } from 'react'
import { useData } from '../App'

const Options = ({ onFileDownload }) => {
  // const { data, setData } = useData()
  // setData('hi')
  // console.log(data)

  let downloaded

  const [s3Url, setS3Url] = useState('')

  const handleInputChange = (event) => {
    setS3Url(event.target.value)
  }

  const handleTestDownload = async () => {
    try {
      const response = await fetch(s3Url)
      if (!response.ok) {
        throw new Error('Failed to download file')
      }
      const data = await response.json() // Assuming the file is JSON
      console.log('Downloaded data:', data)
      // Assign the downloaded data to the downloaded variable
      // For example:
      // downloaded = data;
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <div>
      <h2>Options</h2>
      <p>This is the Options page. Customize your settings here.</p>
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
      </form>
    </div>
  )
}

export default Options
