
   	const wordEl = document.getElementById('word');
    const wrongLettersEl = document.getElementById('wrong-letters');
    const popup = document.getElementById('popup-container');
    const notification = document.getElementById('notification-container');
    const finalMessage = document.getElementById('final-message');
    const figureParts = document.querySelectorAll('.figure-part');

    const playAgainBtn = document.querySelector('#play-button');

    const words = ['india', 'pakistan', 'australia', 'france', 'germany', 
                'spain', 'russia', 'iran', 'egypt', 'philippines', 'malaysia',
                'bangladesh', 'greece', 'denmark', 'argentina', 'china', 'japan',
                'brazil', 'canada', 'switzerland', 'netherlands', 'afghanistan',
                'belgium', 'colombia', 'finland', 'hungary', 'indonesia', 'korea',
                'mexico', 'morocco', 'nepal', 'norway', 'sweden'];

    let selectedWord = words[Math.floor(Math.random() * words.length)];
    //console.log(selectedWord);

    const correctLetters = [];
    const wrongLetters = [];

    // Show hidden word
    function displayWord() {
        wordEl.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">
                                                                        ${correctLetters.includes(letter) ? letter : ''}
                                                                    </span>`).join('')}`;

        const innerWord = wordEl.innerText.replace(/\n/g, '');

        if (innerWord === selectedWord) {
            finalMessage.innerText = 'Congratulations!! YOU WON :)';
            popup.style.display = 'flex';
        }
    }
    // Update the wrong letters
    function updateWrongLettersEl() {
        // Display wrong letters
        wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

        // Display parts
        figureParts.forEach((part, index) => {
            const errors = wrongLetters.length;

            if (index < errors) {
                part.style.display = 'block';
            } else {
                part.style.display = 'none';
            }
        });

        // Check if lost
        if (wrongLetters.length === figureParts.length) {
            finalMessage.innerText = `You lost :( \n 
                                    The word was ${selectedWord}`;
            popup.style.display = 'flex';

        }
    }

    // Show notification
    function showNotification() {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }

    // Keydown letter press
    document.addEventListener('keydown', e => {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                const letter = e.key.toLowerCase();

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);

                        displayWord();
                    } else {
                        showNotification();
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);

                        updateWrongLettersEl();
                    } else {
                        showNotification();
                    }
                }
            }
        });

    // Restart game and play again
    console.log(playAgainBtn);
    playAgainBtn.addEventListener('click', () => {

        //  Empty arrays
        correctLetters.splice(0);
        wrongLetters.splice(0);

        selectedWord = words[Math.floor(Math.random() * words.length)];

        displayWord();

        updateWrongLettersEl();

        popup.style.display = 'none';
    });

    displayWord();