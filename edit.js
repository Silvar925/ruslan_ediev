function getData(tableName, id) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "admin/includes/CRUD/getDataFromDB.php",
      type: "POST",
      data: {
        id: id,
        tableName: tableName,
      },
      dataType: "json",
      success: function (data) {
        // function compareDates(a, b) {
        //     const dateA = new Date(a.date);
        //     const dateB = new Date(b.date);

        //     // Сравниваем даты
        //     if (dateA > dateB) {
        //         return -1;
        //     } else if (dateA < dateB) {
        //         return 1;
        //     } else {
        //         return 0;
        //     }
        // }

        let dataArray = Object.values(data);

        //resolve(dataArray.sort(compareDates));
        resolve(dataArray);
      },
      error: function (xhr, status, error) {
        console.error("Error:", xhr, status, error);
        reject(error);
      },
    });
  });
}

function stringToImageArray(imageString) {
  return imageString.split(",").map((image) => image.trim());
}

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}


getData("album").then((response) => {
  let block = $(".swiper-wrapper").empty();

  response.forEach((element) => {
    console.log(element.title);
    block.append(`
        <div class="swiper-slide">
            <div class="audioSlider_block__slide">
                <div class="audioSlider_block__slide___left">
                    <div class="audioSlider_block__slide___left____img">
                        <img src="admin/img/${
                          stringToImageArray(element.img)[0]
                        }" alt="">
                    </div>
                    <div class="audioSlider_block__slide___left____title">
                        Альбом "${element.title}"
                    </div>
                    <div class="audioSlider_block__slide___left____year">
                        ${element.year}
                    </div>
                </div>

                <div class="audioSlider_block__slide___right" id="${
                  element.title
                }">

                </div>
            </div>
        </div>
        `);
  });
});

getData("music").then((response) => {

  response.forEach((element) => {
 
    // let block = $(".audioSlider_block__slide___right")
    let block = $(`#${element.album}`)
    // if (element.album === $(".audioSlider_block__slide___right").attr("album")) {
      block.append(`
          <div class="track">
              <audio class="audio" src="admin/img/${
                stringToImageArray(element.img)[0]
              }"></audio>
              <div class="play-pause-btn play" data-state="play">
                  <img src="img/play.png" alt="">
              </div>
              <div class="nameAndLine">
                  <div class="track-title" album="${element.album}">${element.title} </div>
                  <input class="progress-slider" type="range" min="0" step="1" value="0">
              </div>
              <div class="time-info">
                  <span class="current-time">0:00</span> / <span class="total-time">0:00</span>
              </div>
          </div>
      `);
    // }
  });
  // window.addEventListener("load", function () {
    const tracks = document.querySelectorAll(".track");

    tracks.forEach((track) => {
      const audio = track.querySelector(".audio");
      const playPauseBtn = track.querySelector(".play-pause-btn");
      const progressSlider = track.querySelector(".progress-slider");
      const currentTimeElem = track.querySelector(".current-time");
      const totalTimeElem = track.querySelector(".total-time");
      const trackTitleElem = track.querySelector(".track-title");

      playPauseBtn.addEventListener("click", () =>
        togglePlayPause(audio, playPauseBtn)
      );
      audio.addEventListener("timeupdate", () =>
        updateProgressBar(audio, progressSlider, currentTimeElem, totalTimeElem)
      );
      progressSlider.addEventListener("input", () =>
        setProgress(audio, progressSlider)
      );

      audio.addEventListener("play", () => {
        trackTitleElem.classList.add("playing");
        playPauseBtn.setAttribute("data-state", "pause");
        playPauseBtn.querySelector("img").setAttribute("src", "img/pause.png");
      });

      audio.addEventListener("pause", () => {
        trackTitleElem.classList.remove("playing");
        playPauseBtn.setAttribute("data-state", "play");
        playPauseBtn.querySelector("img").setAttribute("src", "img/play.png");
      });
    });

    function togglePlayPause(clickedAudio, clickedPlayPauseBtn) {
      tracks.forEach((track) => {
        const audio = track.querySelector(".audio");
        const playPauseBtn = track.querySelector(".play-pause-btn");

        if (audio !== clickedAudio) {
          audio.pause();
          playPauseBtn.setAttribute("data-state", "play");
          playPauseBtn.querySelector("img").setAttribute("src", "img/play.png");
        }
      });

      if (clickedAudio.paused) {
        clickedAudio.play();
        clickedPlayPauseBtn.setAttribute("data-state", "pause");
        clickedPlayPauseBtn
          .querySelector("img")
          .setAttribute("src", "img/pause.png");
      } else {
        clickedAudio.pause();
        clickedPlayPauseBtn.setAttribute("data-state", "play");
        clickedPlayPauseBtn
          .querySelector("img")
          .setAttribute("src", "img/play.png");
      }
    }

    function updateProgressBar(
      audio,
      progressSlider,
      currentTimeElem,
      totalTimeElem
    ) {
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
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  });
// });
