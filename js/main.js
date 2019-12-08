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
