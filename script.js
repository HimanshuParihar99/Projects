
let currentSong = new Audio();


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play()
        playpause.src = "icon/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {
    const progressBar = document.getElementById("progressBar");
    let songs = await getSongs()
    playMusic(songs[0], true)
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img src="icon/music-note.svg" alt="music note">
                        <div class="info">
                            <div class="song-title">${song.replaceAll("%20", " ")}</div>
                            <div class="song-artist">BongCloud</div>
                        </div>
                        <div class="playnow">
                            <span>Play now</span>
                            <img class="invert" src="icon/playicon.svg" alt="play icon">
                        </div> </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })

    playpause.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            playpause.src = "icon/pause.svg"
        }
        else {
            currentSong.pause()
            playpause.src = "icon/playicon.svg"
        }
    })

    

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        currentSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
            currentSong.addEventListener("timeupdate", () => {
                if (currentSong.duration) {
                    let progress = (currentSong.currentTime / currentSong.duration) * 100;
                    progressBar.value = progress;
                    progressBar.style.background = `linear-gradient(to right, #ff5733 ${progress}%, #ccc ${progress}%)`;

                }
            });
            progressBar.addEventListener("input", () => {
                currentSong.currentTime = (progressBar.value / 100) * currentSong.duration;
            });


        })
    })



}
main()