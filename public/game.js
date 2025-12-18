// Game State
let gameConfig = null;
let currentRound = 0;
let score = 0;
let attempts = 0;
let skipsUsed = 0;
let currentDuration = 2;
let results = [];
let selectedSongId = null;
let songOptions = [];
let isPlaying = false;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const noSongsScreen = document.getElementById('no-songs-screen');
const modalOverlay = document.getElementById('modal-overlay');
const audioElement = document.getElementById('audio-element');

// Buttons
const btnStart = document.getElementById('btn-start');
const btnHowToPlay = document.getElementById('btn-how-to-play');
const btnHelp = document.getElementById('btn-help');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnModalPlay = document.getElementById('btn-modal-play');
const btnPlay = document.getElementById('btn-play');
const btnSkip = document.getElementById('btn-skip');
const btnSubmit = document.getElementById('btn-submit');
const btnNext = document.getElementById('btn-next');
const btnPlayAgain = document.getElementById('btn-play-again');
const btnBackHome = document.getElementById('btn-back-home');

// Display Elements
const roundDisplay = document.getElementById('round-display');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const currentTimeDisplay = document.getElementById('current-time');
const maxTimeDisplay = document.getElementById('max-time');
const skipsRemaining = document.getElementById('skips-remaining');
const attemptsDisplay = document.getElementById('attempts-display');
const songSearch = document.getElementById('song-search');
const songDropdown = document.getElementById('song-dropdown');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

// Round Result Elements
const roundResult = document.getElementById('round-result');
const audioPlayer = document.getElementById('audio-player');
const guessSection = document.getElementById('guess-section');
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const resultSong = document.getElementById('result-song');
const resultStats = document.getElementById('result-stats');

// Final Results Elements
const finalScore = document.getElementById('final-score');
const resultsList = document.getElementById('results-list');

// Initialize
async function init() {
  await loadGameConfig();
  setupEventListeners();
}

async function loadGameConfig() {
  try {
    const response = await fetch('/api/game-config');
    gameConfig = await response.json();
  } catch (error) {
    console.error('Failed to load game config:', error);
    gameConfig = {
      totalRounds: 3,
      initialDuration: 2,
      maxDuration: 16,
      skipIncrement: 2,
      maxSkips: 5,
      songs: []
    };
  }
}

function setupEventListeners() {
  btnStart.addEventListener('click', startGame);
  btnHowToPlay.addEventListener('click', showModal);
  btnHelp.addEventListener('click', showModal);
  btnCloseModal.addEventListener('click', hideModal);
  btnModalPlay.addEventListener('click', () => {
    hideModal();
  });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) hideModal();
  });
  
  btnPlay.addEventListener('click', togglePlay);
  btnSkip.addEventListener('click', handleSkip);
  btnSubmit.addEventListener('click', handleSubmit);
  btnNext.addEventListener('click', handleNextRound);
  btnPlayAgain.addEventListener('click', playAgain);
  btnBackHome.addEventListener('click', () => showScreen('start'));
  
  songSearch.addEventListener('input', handleSearchInput);
  songSearch.addEventListener('focus', () => {
    if (songSearch.value || songOptions.length > 0) {
      showDropdown();
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      hideDropdown();
    }
  });
  
  audioElement.addEventListener('timeupdate', updateProgress);
  audioElement.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
  });
}

function showScreen(screen) {
  startScreen.classList.add('hidden');
  gameScreen.classList.add('hidden');
  resultsScreen.classList.add('hidden');
  noSongsScreen.classList.add('hidden');
  
  switch (screen) {
    case 'start':
      startScreen.classList.remove('hidden');
      break;
    case 'game':
      gameScreen.classList.remove('hidden');
      break;
    case 'results':
      resultsScreen.classList.remove('hidden');
      break;
    case 'no-songs':
      noSongsScreen.classList.remove('hidden');
      break;
  }
}

function showModal() {
  modalOverlay.classList.remove('hidden');
}

function hideModal() {
  modalOverlay.classList.add('hidden');
}

function startGame() {
  if (!gameConfig || gameConfig.songs.length === 0) {
    showScreen('no-songs');
    return;
  }
  
  currentRound = 0;
  score = 0;
  results = [];
  
  showScreen('game');
  setupRound();
}

function setupRound() {
  attempts = 0;
  skipsUsed = 0;
  currentDuration = gameConfig.initialDuration;
  selectedSongId = null;
  isPlaying = false;
  
  const currentSong = gameConfig.songs[currentRound];
  songOptions = getDecoyOptions(currentSong);
  
  // Update UI
  roundDisplay.textContent = `Round ${currentRound + 1}/${gameConfig.totalRounds}`;
  scoreDisplay.textContent = `Score: ${score}`;
  skipsRemaining.textContent = gameConfig.maxSkips - skipsUsed;
  attemptsDisplay.textContent = `Attempts: ${attempts}/5`;
  maxTimeDisplay.textContent = `/ 0:${currentDuration.toString().padStart(2, '0')}`;
  currentTimeDisplay.textContent = '0:00';
  progressFill.style.width = '0%';
  
  songSearch.value = '';
  hideDropdown();
  btnSubmit.disabled = true;
  
  // Show game elements, hide result
  audioPlayer.classList.remove('hidden');
  guessSection.classList.remove('hidden');
  attemptsDisplay.classList.remove('hidden');
  roundResult.classList.add('hidden');
  
  // Load audio
  audioElement.src = `/songs/${currentSong.filename}`;
  audioElement.load();
  
  updatePlayButton();
  updateSkipButton();
}

function getDecoyOptions(currentSong) {
  const options = [currentSong];
  const otherSongs = gameConfig.songs.filter(s => s.id !== currentSong.id);
  
  // Shuffle and pick decoys
  const shuffled = otherSongs.sort(() => Math.random() - 0.5);
  const decoys = shuffled.slice(0, Math.min(4, shuffled.length));
  
  options.push(...decoys);
  
  // Shuffle final options
  return options.sort(() => Math.random() - 0.5);
}

function togglePlay() {
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
  } else {
    audioElement.currentTime = 0;
    audioElement.play();
    isPlaying = true;
    
    // Stop at max duration
    const checkTime = setInterval(() => {
      if (audioElement.currentTime >= currentDuration) {
        audioElement.pause();
        isPlaying = false;
        updatePlayButton();
        clearInterval(checkTime);
      }
      if (!isPlaying) {
        clearInterval(checkTime);
      }
    }, 50);
  }
  updatePlayButton();
}

function updatePlayButton() {
  if (isPlaying) {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
  } else {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  }
}

function updateProgress() {
  const progress = Math.min((audioElement.currentTime / currentDuration) * 100, 100);
  progressFill.style.width = `${progress}%`;
  
  const seconds = Math.floor(audioElement.currentTime);
  currentTimeDisplay.textContent = `0:${seconds.toString().padStart(2, '0')}`;
}

function handleSkip() {
  if (skipsUsed < gameConfig.maxSkips) {
    skipsUsed++;
    currentDuration = Math.min(currentDuration + gameConfig.skipIncrement, gameConfig.maxDuration);
    
    skipsRemaining.textContent = gameConfig.maxSkips - skipsUsed;
    maxTimeDisplay.textContent = `/ 0:${currentDuration.toString().padStart(2, '0')}`;
    
    updateSkipButton();
  }
}

function updateSkipButton() {
  btnSkip.disabled = skipsUsed >= gameConfig.maxSkips;
}

function handleSearchInput() {
  const query = songSearch.value.toLowerCase().trim();
  
  if (!query) {
    renderDropdown(songOptions);
    return;
  }
  
  const filtered = songOptions.filter(song => 
    song.title.toLowerCase().includes(query) || 
    song.artist.toLowerCase().includes(query)
  );
  
  renderDropdown(filtered);
}

function renderDropdown(songs) {
  songDropdown.innerHTML = '';
  
  if (songs.length === 0) {
    songDropdown.classList.add('hidden');
    return;
  }
  
  songs.forEach(song => {
    const option = document.createElement('div');
    option.className = 'song-option' + (selectedSongId === song.id ? ' selected' : '');
    option.innerHTML = `
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
    `;
    option.addEventListener('click', () => selectSong(song));
    songDropdown.appendChild(option);
  });
  
  showDropdown();
}

function showDropdown() {
  songDropdown.classList.remove('hidden');
}

function hideDropdown() {
  songDropdown.classList.add('hidden');
}

function selectSong(song) {
  selectedSongId = song.id;
  songSearch.value = `${song.title} - ${song.artist}`;
  btnSubmit.disabled = false;
  hideDropdown();
}

function handleSubmit() {
  if (!selectedSongId) return;
  
  const currentSong = gameConfig.songs[currentRound];
  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}/5`;
  
  if (selectedSongId === currentSong.id) {
    // Correct!
    const points = calculatePoints(attempts, skipsUsed);
    score += points;
    showRoundResult(true, points);
  } else {
    // Wrong
    currentDuration = Math.min(currentDuration + 2, gameConfig.maxDuration);
    maxTimeDisplay.textContent = `/ 0:${currentDuration.toString().padStart(2, '0')}`;
    
    if (attempts >= 5) {
      showRoundResult(false, 0);
    } else {
      // Reset selection for another try
      selectedSongId = null;
      songSearch.value = '';
      btnSubmit.disabled = true;
    }
  }
}

function calculatePoints(attemptsUsed, skips) {
  const basePoints = 200;
  const attemptPenalty = (attemptsUsed - 1) * 20;
  const skipPenalty = skips * 10;
  return Math.max(0, basePoints - attemptPenalty - skipPenalty);
}

function showRoundResult(correct, points) {
  audioElement.pause();
  isPlaying = false;
  
  const currentSong = gameConfig.songs[currentRound];
  
  // Store result
  results.push({
    songTitle: currentSong.title,
    artist: currentSong.artist,
    correct: correct,
    attempts: attempts,
    points: points
  });
  
  // Update UI
  audioPlayer.classList.add('hidden');
  guessSection.classList.add('hidden');
  attemptsDisplay.classList.add('hidden');
  roundResult.classList.remove('hidden');
  
  resultIcon.className = 'result-icon ' + (correct ? 'correct' : 'incorrect');
  resultIcon.innerHTML = correct ? 
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' :
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  
  resultTitle.textContent = correct ? 'Correct!' : 'Not quite...';
  resultSong.textContent = `${currentSong.title} by ${currentSong.artist}`;
  resultStats.textContent = correct ? `+${points} points` : '0 points';
  
  const isLastRound = currentRound >= gameConfig.totalRounds - 1;
  btnNext.textContent = isLastRound ? 'See Results' : 'Next Round';
}

function handleNextRound() {
  if (currentRound >= gameConfig.totalRounds - 1) {
    showFinalResults();
  } else {
    currentRound++;
    setupRound();
  }
}

function showFinalResults() {
  showScreen('results');
  
  finalScore.textContent = `${score} points`;
  
  resultsList.innerHTML = '';
  results.forEach((result, index) => {
    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <div class="result-item-icon ${result.correct ? 'correct' : 'incorrect'}">
        ${result.correct ? 
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' :
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        }
      </div>
      <div class="result-item-info">
        <div class="result-item-title">${result.songTitle}</div>
        <div class="result-item-artist">${result.artist}</div>
      </div>
      <div class="result-item-points">+${result.points}</div>
    `;
    resultsList.appendChild(item);
  });
}

function playAgain() {
  showScreen('start');
}

// Start the app
init();
