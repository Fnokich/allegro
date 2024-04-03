document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const musicPlayer = document.querySelector('.music-player audio');
    const volumeControl = document.getElementById('volume');
    const musicList = document.querySelector('.music-list');

    uploadBtn.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'audio/*';
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const audioSrc = e.target.result;
                    const audioElement = document.createElement('audio');
                    audioElement.src = audioSrc;
                    audioElement.controls = true;
                    musicList.innerHTML = ''; // Clear previous music
                    musicList.appendChild(audioElement);
                };
                reader.readAsDataURL(file);
            }
        });
        fileInput.click();
    });

    musicPlayer.addEventListener('timeupdate', function() {
        // Обновление времени песни
        const currentTime = Math.floor(musicPlayer.currentTime);
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime - minutes * 60;
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        document.getElementById('current-time').textContent = formattedTime;
    });

    volumeControl.addEventListener('input', function() {
        // Изменение громкости
        musicPlayer.volume = volumeControl.value / 100;
    });
});
