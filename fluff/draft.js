// Fuzzy Search Algorithm

// 1 -> Getting input from text area.
// 2 -> As long as it is not a full stop, begin matching the text that is typed and searching for it
// 3 -> If theres a fullstop, stop the current search and then start a new fuzzy search based on the inputs.
// 4 -> If enter is pushed, grab the current top matched suggestion
// 5 -> Finish.

let input = document.getElementById('input')
let suggestion = document.getElementById('suggestion')
const enterKey = 13

// Sorting the array
let words = [
  'Apple',
  'Pencil',
  'Pen',
  'Chair',
  'Helmet',
  'Grapes',
  'Tub',
  'Trophy',
  'Cookie',
  'Donut',
  'Shirt',
  'Bat',
  'Ash',
  'Bell',
  'Chat',
  'Ball',
  'Eye',
  'Fish',
  'Zip',
  'Game',
  'Juice',
  'Orange',
  'Fan',
  'Ice',
]

words.sort()

// Clear the window on load of the webpage
// This will need to be cached
window.onload = () => {
  input.value = ''
  clearSuggestion()
}

const clearSuggestion = () => {
  suggestion.innerHTML = ''
}

// Read input from the page and feed it into the fuse.js search

input.addEventListener('input', (e) => {
  let value = input.value

  // Split the input string by dots
  let segments = value.split('.')

  // Update the search term to be the last segment after splitting by dots
  searchTerm = segments.pop().trim()

  console.log(`The current search term is ${searchTerm}`)
})
