/*
 Game Function:
-player must guess a number between a min and max
-player gets a certain amount of guesses 
-notify player of guesses remaining
-notify the player of the correct answer if loose
-let player choose to play again
*/

// Game values
let min=1, max=10,  winningNum = getRandomNum(min, max), guessesLeft=3;

// UI Elements
const game = document.querySelector('#guess-btn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// PlayAgain event listener
game.addEventListener('mousedown',(e)=>{
    if(e.target.className==='play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', ()=>{
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess)||guess<min ||guess>max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }else{

    // Check if won
    if(guess === winningNum){

        gameOver(true,`${winningNum} is correct, YOU WIN!`);
    
    }else{
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft===0){
            // Game Over LOST!
            gameOver(true, `Game over YOU Lost! The correct number was ${winningNum}`);
        }else{
            
            // game continues, wrong guess
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';
            // Tell user is the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }

    }
}
});

// Game Over 
function gameOver(won, msg){
    let color;
    won===true?color='green':color='red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);
    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning Number
function getRandomNum(min, max){
    return Math.floor((Math.random()*max)+1);
}

// Set message 
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}