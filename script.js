document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const musicList = document.querySelector('.music-list');
    const volumeControl = document.getElementById('volume');
    const seekControl = document.getElementById('seek');
    const currentTimeDisplay = document.getElementById('current-time');
    const controlsContainer = document.querySelector('.controls');

    let musicPlayer; // Переменная для хранения текущего проигрывателя

    uploadBtn.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.multiple = true;
        fileInput.addEventListener('change', function(event) {
            const files = event.target.files;
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const audioSrc = e.target.result;
                        const audioElement = document.createElement('audio');
                        audioElement.src = audioSrc;
                        audioElement.controls = false;
                        const trackName = document.createElement('p');
                        trackName.textContent = file.name;
                        const trackContainer = document.createElement('div');
                        trackContainer.appendChild(trackName);
                        musicList.appendChild(trackContainer);
                        trackContainer.addEventListener('click', function() {
                            if (musicPlayer) {
                                musicPlayer.pause(); // Пауза предыдущего трека
                            }
                            musicPlayer = audioElement;
                            musicPlayer.currentTime = 0; // Возвращаемся в начало трека
                            musicPlayer.play(); // Воспроизведение нового трека
                        });

                        // Обработчик события изменения громкости
                        audioElement.addEventListener('loadedmetadata', function() {
                            const volumeControl = document.getElementById('volume');
                            volumeControl.addEventListener('input', function() {
                                audioElement.volume = volumeControl.value / 100;
                            });

                            // Обработчик события изменения времени проигрывания
                            audioElement.addEventListener('timeupdate', function() {
                                const currentTime = audioElement.currentTime;
                                const duration = audioElement.duration;
                                if (!isNaN(duration)) {
                                    const seekPosition = (currentTime / duration) * 100;
                                    seekControl.value = seekPosition;
                                    updateTimeDisplay(currentTime);
                                }
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
        fileInput.click();
    });

    // Обработчик изменения времени проигрывания
    seekControl.addEventListener('input', function() {
        if (musicPlayer) {
            const seekPosition = musicPlayer.duration * (seekControl.value / 100);
            musicPlayer.currentTime = seekPosition;
            updateTimeDisplay(seekPosition);
        }
    });

    // Обновление времени проигрывания
    function updateTimeDisplay(currentTime) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        currentTimeDisplay.textContent = formattedTime;
    }
});
