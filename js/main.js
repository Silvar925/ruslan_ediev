document.addEventListener('DOMContentLoaded', function () {
    const tracks = document.querySelectorAll('.track');

    tracks.forEach(track => {
        const audio = track.querySelector('.audio');
        const playPauseBtn = track.querySelector('.play-pause-btn');
        const progressSlider = track.querySelector('.progress-slider');
        const currentTimeElem = track.querySelector('.current-time');
        const totalTimeElem = track.querySelector('.total-time');
        const trackTitleElem = track.querySelector('.track-title');

        playPauseBtn.addEventListener('click', () => togglePlayPause(audio, playPauseBtn));
        audio.addEventListener('timeupdate', () => updateProgressBar(audio, progressSlider, currentTimeElem, totalTimeElem));
        progressSlider.addEventListener('input', () => setProgress(audio, progressSlider));

        audio.addEventListener('play', () => {
            trackTitleElem.classList.add('playing');
            playPauseBtn.setAttribute('data-state', 'pause');
            playPauseBtn.querySelector('img').setAttribute('src', 'img/pause.png');
        });

        audio.addEventListener('pause', () => {
            trackTitleElem.classList.remove('playing');
            playPauseBtn.setAttribute('data-state', 'play');
            playPauseBtn.querySelector('img').setAttribute('src', 'img/play.png');
        });
    });

    function togglePlayPause(clickedAudio, clickedPlayPauseBtn) {
        tracks.forEach(track => {
            const audio = track.querySelector('.audio');
            const playPauseBtn = track.querySelector('.play-pause-btn');

            if (audio !== clickedAudio) {
                audio.pause();
                playPauseBtn.setAttribute('data-state', 'play');
                playPauseBtn.querySelector('img').setAttribute('src', 'img/play.png');
            }
        });

        if (clickedAudio.paused) {
            clickedAudio.play();
            clickedPlayPauseBtn.setAttribute('data-state', 'pause');
            clickedPlayPauseBtn.querySelector('img').setAttribute('src', 'img/pause.png');
        } else {
            clickedAudio.pause();
            clickedPlayPauseBtn.setAttribute('data-state', 'play');
            clickedPlayPauseBtn.querySelector('img').setAttribute('src', 'img/play.png');
        }
    }

    function updateProgressBar(audio, progressSlider, currentTimeElem, totalTimeElem) {
        const currentTime = formatTime(audio.currentTime);
        const totalTime = formatTime(audio.duration);

        currentTimeElem.textContent = currentTime;
        totalTimeElem.textContent = totalTime;

        // Устанавливаем значение ползунка в соответствии с текущим временем
        progressSlider.value = audio.currentTime;
        progressSlider.max = audio.duration;
    }

    function setProgress(audio, progressSlider) {
        audio.currentTime = progressSlider.value;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});


