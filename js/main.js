/*----- constants -----*/
const LOSE_WRONG_COUNT = 6
const SPRITE_WIDTH = 75
const WORDS = [
  'DEVELOPER',
  'HTML',
  'JAVASCRIPT',
  'PROGRAM',
  'CODE',
  'FUNCTION',
  'RECURSION',
  'OBJECT',
  'ARRAY',
]

/*----- app's state (variables) -----*/
let secretWord, guessWord, usedLetters, wrongLetters

/*----- cached DOM element references -----*/
const guessWordEl = document.getElementById('word')
const stageEl = document.getElementById('stage')
const messageEl = document.querySelector('h2')
const letterBtns = document.querySelectorAll('#letters button')
const replayBtn = document.getElementById('replay')

/*----- event listeners -----*/
document.getElementById('letters').addEventListener('click', handleLetterClick)

replayBtn.addEventListener('click', init)

/*----- functions -----*/
init()

function init() {
  console.log('Initialized Game')
  let rndIdx = Math.floor(Math.random() * WORDS.length)
  secretWord = WORDS[rndIdx]
  guessWord = ''
  for (let char of secretWord) {
    guessWord += char === ' ' ? char : '_'
  }
  usedLetters = []
  wrongLetters = []
  render()
}

function handleLetterClick(evt) {
  let letter = evt.target.textContent
  if (
    evt.target.tagName !== 'BUTTON' ||
    usedLetters.includes(letter) ||
    secretWord === guessWord ||
    wrongLetters.length === LOSE_WRONG_COUNT
  )
    return
  usedLetters.push(letter)
  if (secretWord.includes(letter)) {
    // correct guess
    let newGuessWord = ''
    for (let i = 0; i < secretWord.length; i++) {
      newGuessWord +=
        secretWord.charAt(i) === letter ? letter : guessWord.charAt(i)
    }
    guessWord = newGuessWord
  } else {
    wrongLetters.push(letter)
  }
  render()
}

function render() {
  // break up render function as necessary
  renderMessage()
  // display stage
  stageEl.style.backgroundPositionX = `${-SPRITE_WIDTH * wrongLetters.length}px`
  // display guessWord
  guessWordEl.textContent = guessWord
  // update letters
  letterBtns.forEach(function(btn) {
    let letter = btn.textContent
    if (wrongLetters.includes(letter)) {
      btn.className = 'wrong'
    } else if (usedLetters.includes(letter)) {
      btn.className = 'correct'
    } else {
      btn.className = ''
    }
  })
  replayBtn.style.visibility = isGameOver() ? 'visible' : 'hidden'
}

function renderMessage() {
  if (secretWord === guessWord) {
    messageEl.textContent = 'Congrats! You guessed the word!'
  } else if (wrongLetters.length === LOSE_WRONG_COUNT) {
    messageEl.textContent = 'Sorry, you fell down the hole!'
  } else {
    messageEl.textContent = `${LOSE_WRONG_COUNT -
      wrongLetters.length} of ${LOSE_WRONG_COUNT} Wrong Guesses Remaining - Good Luck!`
  }
}

function isGameOver() {
  return secretWord === guessWord || wrongLetters.length === LOSE_WRONG_COUNT
}
