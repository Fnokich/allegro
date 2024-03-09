document.addEventListener('DOMContentLoaded', function () {
    navigateToHome();
});

function navigateToHome() {
    hideAllPages();
    document.getElementById('home').style.display = 'block';
}

function navigateToPlayer() {
    hideAllPages();
    document.getElementById('player').style.display = 'block';
}

function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
}

function openTrackSelection() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();

    fileInput.addEventListener('change', function () {
        const audioPlayer = document.getElementById('audioPlayer');
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            const objectURL = URL.createObjectURL(selectedFile);
            audioPlayer.src = objectURL;
        }
    });
}

document.getElementById('volume').addEventListener('input', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = parseFloat(this.value);
});
