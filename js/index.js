// Selecting necessary elements
const typingGround = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const showSentence = document.querySelector('#showSentence');
const errorMessage = document.querySelector('#errorMessage');

let startTime, endTime, totalTimeTaken;

// Array of sentences for the typing test
const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
    'How razorback-jumping frogs can level six piqued gymnasts!',
    'Sixty zippers were quickly picked from the woven jute bag.',
    'Crazy Fredrick bought many very exquisite opal jewels.'
];

// Function to calculate typing speed
const calculateTypingSpeed = (timeTaken, totalWords) => {
    const typingSpeed = totalWords ? Math.round((totalWords / timeTaken) * 60) : 0;
    let resultMessage = '';
    let emoji = '';

    // Categorize results based on typing speed
    if (typingSpeed >= 50) {
        resultMessage = 'Excellent!';
        emoji = '🌟';
    } else if (typingSpeed >= 30) {
        resultMessage = 'Average!';
        emoji = '🙂';
    } else {
        resultMessage = 'Waste!';
        emoji = '😞';
    }

    // Display result with typing speed and emoji
    score.innerHTML = `
        Your typing speed is <strong>${typingSpeed} WPM</strong>. 
        You typed <strong>${totalWords} words</strong> in <strong>${timeTaken.toFixed(2)} seconds</strong>. 
        <br>Result: <strong>${resultMessage}</strong> ${emoji}
    `;
};

// Function to end typing test
const endTypingTest = () => {
    btn.textContent = "Start Test";
    endTime = Date.now();
    const totalTimeTaken = (endTime - startTime) / 1000;
    const totalWords = typingGround.value.trim().split(/\s+/).filter(Boolean).length;

    const typedText = typingGround.value.trim();
    const sentence = showSentence.textContent.trim();

    if (sentence.startsWith(typedText)) {
        // If correct text is typed, calculate and display typing speed
        calculateTypingSpeed(totalTimeTaken, totalWords);
    } else {
        // If wrong text is typed, display error message
        errorMessage.textContent = 'Dude! You typed the wrong text.';
        score.textContent = ''; // Clear typing speed display
    }

    showSentence.textContent = "";
    typingGround.value = "";
    typingGround.setAttribute('disabled', true);
};

// Function to start typing test
const startTyping = () => {
    const randomNumber = Math.floor(Math.random() * sentences.length);
    showSentence.textContent = sentences[randomNumber];
    startTime = Date.now();
    btn.textContent = "Done";
    typingGround.removeAttribute('disabled');
    typingGround.focus();
    errorMessage.textContent = ''; // Clear previous error message
    score.textContent = ''; // Clear previous score
    typingGround.style.borderColor = ''; // Reset border color
};

// Event listener for button click
btn.addEventListener('click', () => {
    if (btn.textContent.toLowerCase() === "start test") {
        startTyping();
    } else if (btn.textContent.toLowerCase() === "done") {
        endTypingTest();
    }
});

// Event listener for input
typingGround.addEventListener('input', () => {
    const typedText = typingGround.value.trim();
    const sentence = showSentence.textContent.trim();
    
    if (typedText === '') {
        // Clear error message and typing speed display when no text is typed
        errorMessage.textContent = ''; 
        score.textContent = ''; 
        typingGround.style.borderColor = ''; 
        return;
    }
    
    if (sentence.startsWith(typedText)) {
        // Reset border color and error message
        typingGround.style.borderColor = ''; 
        errorMessage.textContent = ''; 
    } else {
        // Display error message and set border color to red for wrong input
        errorMessage.textContent = 'You wrote the wrong text.'; 
        typingGround.style.borderColor = 'red'; 
        score.textContent = ''; // Clear typing speed display
    }
});
