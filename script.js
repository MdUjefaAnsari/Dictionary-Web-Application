const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

const getData = async () => {
  let inputData = searchInput.value;
  const pattern = /^[a-zA-Z]+$/;
  if (inputData === "") {
    document.querySelector(".err").innerHTML = "* Please Enter a word !";
  } else if (!inputData.match(pattern)) {
    document.querySelector(".err").innerHTML =
      "* Please provide only word avoid also spaces !";
  } else {
    document.querySelector(".err").innerHTML = "";
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    if (inputData !== data && data.length > 0) {
      document.querySelector(".err").innerHTML = ``;
    } else {
      document.querySelector(
        ".err"
      ).innerHTML = `<h3 style="color:orange"> <span style="color:#ff6f3c;font-size:25px"><u>${inputData}</u></span> has no meanings found <i class="fa-solid fa-triangle-exclamation"></i></h3>`;
    }

    document.querySelector(".userWord").innerText = data[0].word;

    const phoneticM = `${data[0].phonetic}`;
    const phonetic = document.querySelector(".phonetic");
    if (phoneticM !== "undefined") {
      phonetic.innerText = `[${phoneticM}]`;
    } else {
      phoneticM.innerText = "";
    }

    const synonyms = data[0].meanings[0].synonyms;
    const elementSyno = document.querySelector(".synonyms");
    if (synonyms.length > 0) {
      elementSyno.textContent = `Synonyms: ${synonyms}`;
    } else {
      elementSyno.textContent = ``;
    }

    //  ---------------for audio voice ----start------------------
    const voiceAudio = data[0]?.phonetics[0]?.audio;
    const voiceElement = document.querySelector(".voice");

    if (voiceAudio) {
      voiceElement.innerHTML = `
    <div>
      <i class="fas fa-volume-up" id="playIcon" style="cursor: pointer;"></i>
      <audio src="${voiceAudio}" style="display: none;" controls id="audioPlayer"></audio>
    </div>`;
      const playIcon = document.getElementById("playIcon");
      const audioPlayer = document.getElementById("audioPlayer");

      playIcon.addEventListener("click", () => {
        if (audioPlayer.paused) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
      });
    } else {
      voiceElement.innerHTML = "";
    } //  ---------------for audio voice ----end------------------

    document.querySelector(".partOfSpeech").innerText =
      data[0].meanings[0].partOfSpeech + ",";
    document.querySelector(".difination1").innerText =
      " 1.    " + data[0].meanings[0].definitions[0].definition;
    document.querySelector(".difination2").innerText =
      "2.    " + data[0].meanings[0].definitions[1].definition;
    document.querySelector(".difination3").innerText =
      "3.    " + data[0].meanings[0].definitions[2].definition;

    const example = data[0].meanings[0].definitions[0].example;
    if (example) {
      document.querySelector(".example").innerText = `Example: ${example}`;
    } else {
      document.querySelector(".example").innerText = "";
    }
    // --------------------------another parts of speech-----------------
    document.querySelector(".partOfSpeech1").innerText =
      data[0].meanings[1].partOfSpeech + ",";
    document.querySelector(".difination4").innerText =
      " 1.    " + data[0].meanings[1].definitions[0].definition;
    document.querySelector(".difination5").innerText =
      "2.    " + data[0].meanings[1].definitions[1].definition;
  }
};


searchButton.addEventListener("click", (evnt) => {
  evnt.preventDefault();

  try {
    getData();
  } catch (error) {
    console.log(error);
  }
});
