// Get references to elements
const mainTimerDisplay = document.querySelector('.main-timer');
const pauseButton = document.querySelector('.pause-btn');
const stopButton = document.querySelector('.stop-btn');
const deleteButton = document.querySelector('.delete-btn');
const waveformBars = document.querySelector('.waveform-bars'); // For basic animation if desired

let timerInterval;
let seconds = 0;
let milliseconds = 0;
let isPaused = true; // Start as paused/stopped

// Function to update the timer display
function updateTimer() {
    milliseconds++;
    if (milliseconds >= 100) { // 100 milliseconds = 1 second
        milliseconds = 0;
        seconds++;
    }

    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');

    mainTimerDisplay.textContent = `00:${formattedSeconds}.${formattedMilliseconds}`;
}

// Initial state for the main pause button (show play triangle)
pauseButton.innerHTML = `<div class="play-icon"></div>`;
pauseButton.classList.add('active');

// Function to start the timer (when 'Pause' becomes 'Record')
function startTimer() {
    if (isPaused) {
        timerInterval = setInterval(updateTimer, 10);
        isPaused = false;
        pauseButton.classList.remove('active');
        // Show pause bars when running
        pauseButton.innerHTML = `
            <div class="pause-icon">
                <div class="pause-bar"></div>
                <div class="pause-bar"></div>
            </div>
        `;
    }
}

// Function to pause the timer
function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        pauseButton.classList.add('active');
        // Show play triangle when paused
        pauseButton.innerHTML = `<div class="play-icon"></div>`;
    }
}

// Function to reset the timer
function stopTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    milliseconds = 0;
    mainTimerDisplay.textContent = '00:00.00';
    isPaused = true;
    pauseButton.classList.add('active');
    pauseButton.innerHTML = `<div class="play-icon"></div>`;
    console.log("Recording stopped and saved (conceptually)");
}

// Add event listeners to buttons
pauseButton.addEventListener('click', () => {
    if (isPaused) {
        startTimer();
    } else {
        pauseTimer();
    }
});

stopButton.addEventListener('click', stopTimer);

deleteButton.addEventListener('click', () => {
    // Add logic for deleting the current recording or prompt for confirmation
    alert('Delete functionality not yet implemented.');
    stopTimer(); // Optionally stop the timer if recording is active
});

// Basic waveform animation (conceptual, not real audio visualization)
let animationOffset = 0;
function animateWaveform() {
    if (!isPaused) {
        animationOffset -= 1; // Move left
        waveformBars.style.backgroundPositionX = animationOffset + 'px';
    }
    requestAnimationFrame(animateWaveform);
}