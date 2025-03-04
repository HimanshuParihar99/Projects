let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    return songs;
}
const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        playpause.src = "icon/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")

    let cardcontainer = document.querySelector(".cardcontainer")

    Array.from(anchors).forEach(async e => {
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0];

            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);
            cardcontainer.innerHTML = cardcontainer.innerHTML + ` <div data-folder="ncs" class="cardcircle" id="cardcircle">
                    <div class="play">
                 <img src="icon/play.svg" alt="">
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h4>${response.title}</h4>
                    <p>${response.description}</p>
                </div>`
        }
    })


}


async function main() {
    const progressBar = document.getElementById("progressBar");
    songs = await getSongs("songs/ncs");
    playMusic(songs[0], true);

    displayAlbums()

    let songUL = document
        .querySelector(".songList")
        .getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML =
            songUL.innerHTML +
            `<li><img src="icon/music-note.svg" alt="music note">
                        <div class="info">
                            <div class="song-title">${song.replaceAll(
                "%20",
                " "
            )}</div>
                            <div class="song-artist">BongCloud</div>
                        </div>
                        <div class="playnow">
                            <span>Play now</span>
                            <img class="invert" src="icon/playicon.svg" alt="play icon">
                        </div> </li>`;
    }
    Array.from(
        document.querySelector(".songList").getElementsByTagName("li")
    ).forEach((e) => {
        e.addEventListener("click", (element) => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    playpause.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playpause.src = "icon/pause.svg";
        } else {
            currentSong.pause();
            playpause.src = "icon/playicon.svg";
        }
    });
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
            currentSong.currentTime
        )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        currentSong.addEventListener("timeupdate", () => {
            if (currentSong.duration) {
                let progress = (currentSong.currentTime / currentSong.duration) * 100;
                progressBar.value = progress;
                progressBar.style.background = `linear-gradient(to right, #50C878 ${progress}%, #ccc ${progress}%)`;
            }
        });
        progressBar.addEventListener("input", () => {
            currentSong.currentTime =
                (progressBar.value / 100) * currentSong.duration;
        });
    });

    prevBtn.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        }
    });
    nextBtn.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    });
    document
        .querySelector(".volume-container")
        .getElementsByTagName("input")[0]
        .addEventListener("change", (e) => {
            currentSong.volume = parseInt(e.target.value) / 100;
        });

    Array.from(document.getElementsByClassName("cardcircle")).forEach(e => {
        console.log(e);

        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.current.dataset.folder}`);

        })
    })

// Select the volume bar and volume icon elements
const volumeBar = document.getElementById('volumebar');
const volumeIcon = document.getElementById('volumeicon');

// Define the paths to the different volume icons
const volumeIcons = {
    mute: 'icon/mute.svg',       // Icon for muted or very low volume
    low: 'icon/volume.svg',      // Icon for low volume
    full: 'icon/fullvolume.svg'  // Icon for full volume
};

// Define the volume states and their corresponding values
const volumeStates = [
    { level: 0, icon: volumeIcons.mute },   // Muted
    { level: 50, icon: volumeIcons.low },   // Low volume
    { level: 100, icon: volumeIcons.full }  // Full volume
];

let currentStateIndex = 2; // Start with the "full" volume state (index 2)

// Function to update the volume icon based on the volume level
function updateVolumeIcon(volumeLevel) {
    if (volumeLevel === 0) {
        volumeIcon.src = volumeIcons.mute;
    } else if (volumeLevel > 0 && volumeLevel <= 70) {
        volumeIcon.src = volumeIcons.low;
    } else {
        volumeIcon.src = volumeIcons.full;
    }
}

// Function to update the volume state
function updateVolumeState() {
    const currentState = volumeStates[currentStateIndex];
    volumeBar.value = currentState.level; // Update the slider value
    volumeIcon.src = currentState.icon;   // Update the icon
    updateVolumeBarStyle();               // Update the volume bar style
}

// Function to dynamically style the volume bar
function updateVolumeBarStyle() {
    const volumeValue = volumeBar.value;

    // Style the volume bar based on its value
    volumeBar.style.background = `linear-gradient(to right, #4caf50 ${volumeValue}%, #ddd ${volumeValue}%)`;
    volumeBar.style.height = '4px'; // Example: Set a custom height
    volumeBar.style.borderRadius = '5px'; // Example: Add rounded corners
}

// Add an event listener to the volume bar to detect changes
volumeBar.addEventListener('input', () => {
    const volumeLevel = parseInt(volumeBar.value, 10); // Get the current volume level

    // Find the closest volume state based on the slider value
    if (volumeLevel === 0) {
        currentStateIndex = 0; // Muted
    } else if (volumeLevel > 0 && volumeLevel <= 70) {
        currentStateIndex = 1; // Low
    } else {
        currentStateIndex = 2; // Full
    }

    updateVolumeIcon(volumeLevel); // Update the icon based on the slider value
    updateVolumeBarStyle();         // Update the volume bar style
});

// Add a click event listener to the volume icon
volumeIcon.addEventListener('click', () => {
    // Cycle through the volume states
    currentStateIndex = (currentStateIndex + 1) % volumeStates.length;
    updateVolumeState(); // Update the icon and slider
});

// Initialize the volume icon and bar styles based on the initial volume level
updateVolumeIcon(parseInt(volumeBar.value, 10));
updateVolumeBarStyle();
}
main();
