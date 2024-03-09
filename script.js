let isPlaying = false;

function togglePlayPause() {
    isPlaying = !isPlaying;
    const playPauseButton = document.getElementById('playPauseButton');
    playPauseButton.textContent = isPlaying ? 'Пауза' : 'Слушать сейчас';
    // Здесь добавь логику для проигрывания музыки, например, путем изменения классов и т.д.
}

function changeVolume() {
    const volumeControl = document.getElementById('volumeControl');
    const volumeValue = volumeControl.value;
    // Здесь добавь логику для управления громкостью, например, изменением стилей или использование аудио API
}