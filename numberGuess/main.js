let randomNumber = Math.floor(Math.random()*100 + 1);
// store Results
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
// store guesses 
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
// check if the guess is right 
function checkGuess(){
    const userGuess = Number(guessField.value)
    // init prev guesses
    if(guessCount === 1){
        guesses.textContent = 'Previous guesses: '
    }
    guesses.textContent += ` ${userGuess}`
    // guess judgement
    if(userGuess === randomNumber){
        lastResult.textContent = 'You are correct!'
        lastResult.style.backgroundColor = 'green'
        lowOrHi.textContent = ''
        setGameOver();
    } else if ( guessCount === 10){
        lastResult.textContent = 'Limit guesses reached, game over'
        lowOrHi.textContent = ''
    }
    else {
        lastResult.textContent = 'Wrong'
        lastResult.style.backgroundColor = 'red'
        if(userGuess > randomNumber){
            lowOrHi.textContent = 'Too high'
        }
        else {
            lowOrHi.textContent = 'Too low'
        }
    }
    // prepare for next guess
    guessCount ++;
    guessField.value = ''
    guessField.focus();
}
// game end set up 
function setGameOver() {
    guessField.disabled = true
    guessField.disabled = true
    resetButton = document.createElement('button') // how to setup the style?
    resetButton.textContent = 'Start new game'
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame)
}

function resetGame() {
    guessCount = 1

    const resetParas = document.querySelectorAll('.resultParas p')
    for (const resetPara of resetParas){
        resetPara.textContent = ''
    }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false
    guessSubmit.disabled = false
    guessField.value = ''
    guessField.focus()

    lastResult.style.backgroundColor = 'white'

    randomNumber  = Math.floor(Math.random() *100 + 1)
}
// listen event and call event handler
guessSubmit.addEventListener('click', checkGuess);

