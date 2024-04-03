document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const musicPlayer = document.querySelector('.music-player audio');
    const volumeControl = document.getElementById('volume');

    uploadBtn.addEventListener('click', function() {
        // Реализация загрузки музыки
        // Можно использовать File API для загрузки файлов
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
