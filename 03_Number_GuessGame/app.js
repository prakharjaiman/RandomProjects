/* 
GAME FUNCTION:
-Player must guess a number between min and max 
-Player gets a certain amounts of guesses
-Notify player of guesses remaining
-Notify player of correct answer if loose
-Let Player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Element
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) { //Don't use click event, use mousedown
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess button
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    // Validate our Input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, `red`);
    }
    // Check if won
    if (guess === winningNum) {
        // GameOver - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Wrong Number
        guessesLeft -= 1;
        //guessesLeft = guessesLeft -  1;

        if (guessesLeft === 0) {
            //Game over - lost
            gameOver(false, `GAME OVER, you lost. The correct number was ${winningNum}`);

        } else {
            //Game Continues - answer wrong

            // Change Border Color
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';

            // Tell user it is the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'black')
        }
    }

});


//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    // Change Border Color
    guessInput.style.borderColor = color;
    // Change text color
    message.style.color = color;
    // Set Message
    setMessage(msg);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

//Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// setMessage
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}