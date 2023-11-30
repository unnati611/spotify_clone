console.log("welcome to spotify");
let songindex = 0;
let audioelement = new Audio("songs/1.mp3");
let masterplay = document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let msong = document.getElementById("msong");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let songitemplay = Array.from(document.getElementsByClassName("songitemplay"));

let songs = [
  {
    songName: "salame ishq",
    filePath: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
  },
  {
    songName: "let me love you",
    filePath: "./songs/2.mp3",
    coverPath: "./covers/2.jpg",
  },
  {
    songName: "my fev music",
    filePath: "./songs/3.mp3",
    coverPath: "./covers/3.jpg",
  },
  {
    songName: "tu hai to",
    filePath: "./songs/4.mp3",
    coverPath: "./covers/4.jpg",
  },
  {
    songName: "aaj fir tumpe",
    filePath: "./songs/5.mp3",
    coverPath: "./covers/5.jpg",
  },
  {
    songName: "tum jo kehdo to",
    filePath: "./songs/6.mp3",
    coverPath: "./covers/6.jpg",
  },
  {
    songName: "tere hoke rahenge",
    filePath: "./songs/7.mp3",
    coverPath: "./covers/7.jpg",
  },
];

// audioelement.play;

//handle play pause click;
masterplay.addEventListener("click", (e) => {
  debugger;
  if (audioelement.paused || audioelement.currentTime <= 0) {
    audioelement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-pause-circle");
    document.getElementById("0").classList.add("fa-pause-circle");
    document.getElementById("0").classList.remove("fa-circle-play");
    gif.style.opacity = 1;
    console.log(e);
  } else {
    audioelement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-circle-play");
    document.getElementById("0").classList.remove("fa-pause-circle");
    document.getElementById("0").classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//listen to events
audioelement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  console.log(progress);
  myprogressbar.value = progress;
});

myprogressbar.addEventListener("change", () => {
  audioelement.currentTime =
    (myprogressbar.value * audioelement.duration) / 100;
});

songitem.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

const makeplay = () => {
  Array.from(document.getElementsByClassName("songitemplay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songitemplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      songindex = parseInt(e.target.id);
      makeplay();

      if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-pause-circle");
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        audioelement.src = `songs/${songindex + 1}.mp3`;
        msong.innerHTML = songs[songindex].songName;
        console.log(msong);
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
      } else {
        audioelement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-circle-play");
        masterplay.classList.add("fa-circle-play");
        masterplay.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;
      }
      // e.target.classList.remove("fa-circle-play");
      // e.target.classList.add("fa-circle-pause");
    });
  }
);

let backward = document.getElementById("backward");
let forward = document.getElementById("forward");

forward.addEventListener("click", () => {
  if (songindex > songs.length) {
    songindex = 0;
    msong.innerHTML = songs[songindex].songName;
  } else {
    songindex += 1;
    msong.innerHTML = songs[songindex].songName;
  }
  makeplay();
  audioelement.src = `songs/${songindex + 1}.mp3`;
  debugger;
  console.log(msong);
  audioelement.currentTime = 0;
  audioelement.play();
  document.getElementById(`${songindex}`).classList.remove("fa-circle-play");
  document.getElementById(`${songindex}`).classList.add("fa-pause-circle");
  masterplay.classList.remove("fa-circle-play");
  masterplay.classList.add("fa-pause-circle");
});
backward.addEventListener("click", () => {
  if (songindex <= 0) {
    songindex = 0;
    msong.innerHTML = songs[songindex].songName;
  } else {
    songindex -= 1;
    msong.innerHTML = songs[songindex].songName;
  }
  makeplay();
  audioelement.src = `songs/${songindex + 1}.mp3`;

  console.log(msong);
  audioelement.currentTime = 0;
  audioelement.play();
  document.getElementById(`${songindex}`).classList.remove("fa-circle-play");
  document.getElementById(`${songindex}`).classList.add("fa-pause-circle");
  masterplay.classList.remove("fa-circle-play");
  masterplay.classList.add("fa-pause-circle");
});
