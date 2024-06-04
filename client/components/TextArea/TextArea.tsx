// TextArea.js

const TextArea = ({ inputValue, handleChange }) => {
  return (
    <div className="textArea">
      <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="Add all of your correspondence in here...."
        className="input-box"
      ></textarea>
    </div>
  )
}

export default TextArea
