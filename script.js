// Phonics Learning App
class PhonicApp {
    constructor() {
        this.currentLetterIndex = 0;
        this.recognition = null;
        this.isListening = false;
        
        // Letter data with sounds and corresponding emoji images
        this.letters = [
            { letter: 'A', sound: 'ay', word: 'Apple', emoji: '🍎' },
            { letter: 'B', sound: 'buh', word: 'Boat', emoji: '🚤' },
            { letter: 'C', sound: 'kuh', word: 'Cat', emoji: '🐱' },
            { letter: 'D', sound: 'duh', word: 'Dog', emoji: '🐶' },
            { letter: 'E', sound: 'eh', word: 'Elephant', emoji: '🐘' },
            { letter: 'F', sound: 'fuh', word: 'Fish', emoji: '🐠' },
            { letter: 'G', sound: 'guh', word: 'Goat', emoji: '🐐' },
            { letter: 'H', sound: 'huh', word: 'House', emoji: '🏠' },
            { letter: 'I', sound: 'ih', word: 'Ice cream', emoji: '🍦' },
            { letter: 'J', sound: 'juh', word: 'Jelly', emoji: '🟣' },
            { letter: 'K', sound: 'kuh', word: 'Kite', emoji: '🪁' },
            { letter: 'L', sound: 'luh', word: 'Lion', emoji: '🦁' },
            { letter: 'M', sound: 'muh', word: 'Mouse', emoji: '🐭' },
            { letter: 'N', sound: 'nuh', word: 'Nest', emoji: '🪺' },
            { letter: 'O', sound: 'oh', word: 'Orange', emoji: '🍊' },
            { letter: 'P', sound: 'puh', word: 'Pig', emoji: '🐷' },
            { letter: 'Q', sound: 'kwuh', word: 'Queen', emoji: '👸' },
            { letter: 'R', sound: 'ruh', word: 'Robot', emoji: '🤖' },
            { letter: 'S', sound: 'suh', word: 'Sun', emoji: '☀️' },
            { letter: 'T', sound: 'tuh', word: 'Tree', emoji: '🌳' },
            { letter: 'U', sound: 'uh', word: 'Umbrella', emoji: '☂️' },
            { letter: 'V', sound: 'vuh', word: 'Violin', emoji: '🎻' },
            { letter: 'W', sound: 'wuh', word: 'Whale', emoji: '🐋' },
            { letter: 'X', sound: 'ks', word: 'Xylophone', emoji: '🎵' },
            { letter: 'Y', sound: 'yuh', word: 'Yo-yo', emoji: '🪀' },
            { letter: 'Z', sound: 'zuh', word: 'Zebra', emoji: '🦓' }
        ];
        
        this.initializeElements();
        this.initializeSpeechRecognition();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.letterElement = document.getElementById('current-letter');
        this.imageElement = document.getElementById('letter-image');
        this.descriptionElement = document.getElementById('image-description');
        this.startButton = document.getElementById('start-button');
        this.nextButton = document.getElementById('next-button');
        this.statusMessage = document.getElementById('status-message');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.celebration = document.getElementById('celebration');
    }
    
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateStatus('🎤 Listening... Say the sound!');
                this.startButton.textContent = '🔴 Listening...';
                this.startButton.disabled = true;
            };
            
            this.recognition.onresult = (event) => {
                const result = event.results[0][0].transcript.toLowerCase().trim();
                console.log('Heard:', result);
                this.processResult(result);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.handleRecognitionError(event.error);
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.startButton.disabled = false;
                this.startButton.textContent = '🎤 Try Again';
            };
        } else {
            this.updateStatus('❌ Speech recognition not supported in this browser');
            this.startButton.disabled = true;
        }
    }
    
    setupEventListeners() {
        this.startButton.addEventListener('click', () => {
            this.startListening();
        });
        
        this.nextButton.addEventListener('click', () => {
            this.nextLetter();
        });
        
        // Click outside celebration to close it
        this.celebration.addEventListener('click', (e) => {
            if (e.target === this.celebration) {
                this.hideCelebration();
            }
        });
    }
    
    updateDisplay() {
        const currentLetter = this.letters[this.currentLetterIndex];
        
        this.letterElement.textContent = currentLetter.letter;
        
        // Replace image with emoji display
        const imageContainer = this.imageElement.parentNode;
        imageContainer.innerHTML = `
            <div class="emoji-display">${currentLetter.emoji}</div>
            <p id="image-description" class="image-description">${currentLetter.word}</p>
        `;
        this.descriptionElement = document.getElementById('image-description');
        
        // Update progress
        const progress = ((this.currentLetterIndex + 1) / this.letters.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Letter ${this.currentLetterIndex + 1} of ${this.letters.length}`;
        
        // Update status message
        this.updateStatus(`Say the sound for "${currentLetter.letter}" (like in ${currentLetter.word})`);
        
        // Reset buttons
        this.startButton.textContent = '🎤 Start Learning!';
        this.nextButton.style.display = 'none';
    }
    
    updateStatus(message) {
        this.statusMessage.textContent = message;
    }
    
    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error starting recognition:', error);
                this.updateStatus('❌ Error starting microphone. Please try again.');
            }
        }
    }
    
    processResult(result) {
        const currentLetter = this.letters[this.currentLetterIndex];
        const expectedSounds = [
            currentLetter.sound.toLowerCase(),
            currentLetter.letter.toLowerCase(),
            currentLetter.word.toLowerCase()
        ];
        
        console.log('Expected sounds:', expectedSounds);
        console.log('Heard result:', result);
        
        // Check if the result contains any of the expected sounds
        const isCorrect = expectedSounds.some(sound => 
            result.includes(sound) || 
            this.soundMatches(result, sound) ||
            result.startsWith(currentLetter.letter.toLowerCase())
        );
        
        if (isCorrect) {
            this.celebrateSuccess();
        } else {
            this.updateStatus(`🤔 I heard "${result}". Try saying the "${currentLetter.letter}" sound!`);
            // Automatically restart listening after a short delay
            setTimeout(() => {
                if (!this.isListening) {
                    this.startListening();
                }
            }, 2000);
        }
    }
    
    soundMatches(heard, expected) {
        // Simple phonetic matching
        const phoneticMap = {
            'ay': ['a', 'hey', 'way'],
            'buh': ['b', 'be', 'bee'],
            'kuh': ['c', 'k', 'key'],
            'duh': ['d', 'de', 'dee'],
            'eh': ['e', 'hey'],
            'fuh': ['f', 'ef'],
            'guh': ['g', 'gee'],
            'huh': ['h', 'aitch'],
            'ih': ['i', 'eye'],
            'juh': ['j', 'jay'],
            'luh': ['l', 'el'],
            'muh': ['m', 'em'],
            'nuh': ['n', 'en'],
            'oh': ['o'],
            'puh': ['p', 'pee'],
            'kwuh': ['q', 'queue', 'cue'],
            'ruh': ['r', 'are'],
            'suh': ['s', 'es'],
            'tuh': ['t', 'tea', 'tee'],
            'uh': ['u'],
            'vuh': ['v', 'vee'],
            'wuh': ['w', 'double-u'],
            'ks': ['x', 'ex'],
            'yuh': ['y', 'why'],
            'zuh': ['z', 'zee', 'zed']
        };
        
        const alternatives = phoneticMap[expected] || [];
        return alternatives.some(alt => heard.includes(alt));
    }
    
    celebrateSuccess() {
        this.showCelebration();
        this.updateStatus('🎉 Perfect! You got it right!');
        this.nextButton.style.display = 'inline-block';
        
        // Auto-advance after celebration
        setTimeout(() => {
            this.hideCelebration();
        }, 3000);
    }
    
    showCelebration() {
        this.celebration.classList.add('show');
        
        // Add more sparkles dynamically
        this.createSparkles();
    }
    
    hideCelebration() {
        this.celebration.classList.remove('show');
    }
    
    createSparkles() {
        const sparkleContainer = this.celebration.querySelector('.sparkles');
        
        // Create additional sparkle elements
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = `sparkle ${1 + Math.random()}s ease-in-out infinite`;
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            
            sparkleContainer.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
    }
    
    nextLetter() {
        this.currentLetterIndex++;
        
        if (this.currentLetterIndex >= this.letters.length) {
            // Completed all letters
            this.updateStatus('🎊 Congratulations! You completed all letters!');
            this.startButton.textContent = '🔄 Start Over';
            this.startButton.onclick = () => {
                this.currentLetterIndex = 0;
                this.updateDisplay();
                this.setupEventListeners(); // Reset event listeners
            };
            this.nextButton.style.display = 'none';
        } else {
            this.updateDisplay();
        }
        
        this.hideCelebration();
    }
    
    handleRecognitionError(error) {
        let message = 'Error with microphone: ';
        
        switch (error) {
            case 'not-allowed':
                message += 'Microphone access denied. Please allow microphone access and try again.';
                break;
            case 'no-speech':
                message += 'No speech detected. Try speaking louder or closer to the microphone.';
                break;
            case 'audio-capture':
                message += 'No microphone found. Please check your microphone connection.';
                break;
            case 'network':
                message += 'Network error. Please check your internet connection.';
                break;
            default:
                message += 'Please try again.';
        }
        
        this.updateStatus(message);
        
        // Auto-retry for certain errors
        if (error === 'no-speech') {
            setTimeout(() => {
                if (!this.isListening) {
                    this.startListening();
                }
            }, 2000);
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhonicApp();
});

