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
    score.textContent = `Your typing speed is ${typingSpeed} words per minute. You typed ${totalWords} words in ${timeTaken} seconds.`;
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
        saveTestData(totalTimeTaken, totalWords); // Save test data
        loadTestData(); // Load and display test data
    } else {
        // If wrong text is typed, display error message
        errorMessage.textContent = 'Dude! You typed the wrong text.';
        score.textContent = ''; // Clear typing speed display
    }

    showSentence.textContent = "";
    typingGround.value = "";
};


// Function to start typing test
const startTyping = () => {
    const randomNumber = Math.floor(Math.random() * sentences.length);
    showSentence.textContent = sentences[randomNumber];
    startTime = Date.now();
    btn.textContent = "Done";
    typingGround.removeAttribute('disabled');
    typingGround.focus();
};

// Event listener for button click
btn.addEventListener('click', () => {
    if (btn.textContent.toLowerCase() === "start test") {
        startTyping();
    } else if (btn.textContent.toLowerCase() === "done") {
        typingGround.setAttribute('disabled', true);
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
        
        const totalWords = typedText.split(/\s+/).filter(Boolean).length;
        const timeTaken = (Date.now() - startTime) / 1000;
        
        calculateTypingSpeed(timeTaken, totalWords); // Display typing speed and other details
    } else {
        // Display error message and set border color to red for wrong input
        errorMessage.textContent = 'You wrote the wrong text.'; 
        typingGround.style.borderColor = 'red'; 
        score.textContent = ''; // Clear typing speed display
    }
});



