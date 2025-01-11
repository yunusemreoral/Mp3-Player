const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')
const currentProgress = document.getElementById('current-progress')

// sırası
let index

// dongu
let loop = true

//sarki listesi
const songsList = [ 
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

// sarkı atama
const setSong = (arrayIndex) => { 
    // bir obje içerisini tek bir adımda dışarı çıkartıp değişkenleri atama sırası
let { name , link , artist , image } = songsList[arrayIndex];
audio.src = link;
songName.innerHTML = name;
songArtist.innerHTML = artist;
songImage.src = image;

 
// zamanı ayarla
audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration) // 125

}

// sarkı listesini izle
playListContainer.classList.add('hide')





// sarkıyı oynat
playAudio()

};

// sarkiyi cal
const playAudio = () => {
    audio.play();
    pauseButton.classList.remove('hide') // gorun
    playButton.classList.add('hide') // kaybol
}

// sarkı kendiliğinden bittiğinde sonrakine geç
audio.onended = () => {
    nextSong()
}

// sarkıyı durdur
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

// sonraki geç
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length -1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
    playAudio()
}

// onceki sarkıya gel
const previousSong = () => {
    pauseAudio()
    if (index > 0) {
        index -= 1 // index = index -1
    } else {
        index = songsList.length - 1
    }
setSong()
playAudio()
}

// zaman düzenleyici
const timeFormatter = (timeInput) => { 
let minute = Math.floor(timeInput / 60) 
minute = minute < 10 ? "0" + minute : minute
let second = Math.floor (timeInput % 60)
second = second < 10 ? "0" + second : second
return `${minute} : ${second}`
}

// tekrar açma,kapama
repeatButton.addEventListener('click',() => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = true
    }
})

// karıştırıcı taıklanıldıgında
shuffleButton.addEventListener('click',() => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = false
    }
})

// anlık zaman yakala
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    //progresi ilerlet
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))

}, 1000); // milnisaniye

//liste ekranını getir
playListButton.addEventListener('click',() => {
    playListContainer.classList.remove('hide')
})

// liste kapat
closeButton.addEventListener('click',() => {
    playListContainer.classList.add('hide')
})

// liste oluşturma
const initializePlaylist = () => {
    for(let i in songsList) {
playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[i].name}
            </span>
            <span id="playlist-song-artist-album">
                ${songsList[i].artist}
            </span>
        </div>
        </li>`
 
    }
    
}
initializePlaylist()


// progress bar ayarlama
progressBar.addEventListener('click',(event) => {
    let coordStart = progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

// zamanı güncelle
audio.addEventListener('timeupdate',() => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// sıradaki butona tıklanıldıgında
nextButton.addEventListener('click',nextSong)

// durdur butonuna tıklanıldıgında
pauseButton.addEventListener('click',pauseAudio)

// oynat butonuna tıklanıldıgında
playButton.addEventListener('click',playAudio)

// geri tusuna basıldıgında
prevButton.addEventListener('click',previousSong)

// ekran yükleme
window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
}


