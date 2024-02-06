const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

const getData = async () => {
  let inputData = searchInput.value;
  const pattern = /^[a-zA-Z]+$/;
  if (inputData === "") {
    document.querySelector(".err").innerHTML = "Please Enter a word";
  } else if (!inputData.match(pattern)) {
    document.querySelector(".err").innerHTML = "Please provide only word";
    return false;
  } else {
    document.querySelector(".err").innerHTML = "";
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    document.querySelector(".userWord").innerText = data[0].word;
  //  ---------------for audio voice ----start------------------ 
    const voiceAudio = data[0]?.phonetics[0]?.audio;
    if (voiceAudio) {
     const voiceElement= document.querySelector(".voice")
      voiceElement.innerHTML = `<audio controls src="${voiceAudio}"></audio>`;
    }else{ 
       document.querySelector(".voice").innerHTML =""
    }
    // /  ---------------for audio voice ----end------------------ 

    document.querySelector(".partOfSpeech").innerText =
      data[0].meanings[0].partOfSpeech + ",";
    document.querySelector(".difination1").innerText =
      " 1.    " + data[0].meanings[0].definitions[0].definition;
    document.querySelector(".difination2").innerText =
      "2.    " + data[0].meanings[0].definitions[1].definition;
    document.querySelector(".difination3").innerText =
      "3.    " + data[0].meanings[0].definitions[2].definition;
      document.querySelector(".example").innerText =
      "Example: " + data[0].meanings[0].definitions[0].example;

    // -------------------------------------------
    document.querySelector(".partOfSpeech1").innerText =
      data[0].meanings[1].partOfSpeech + ",";
    document.querySelector(".difination4").innerText =
      " 1.    " + data[0].meanings[1].definitions[0].definition;
    document.querySelector(".difination5").innerText =
      "2.    " + data[0].meanings[1].definitions[1].definition;
  }
};

searchButton.addEventListener("click", async (evnt) => {
  evnt.preventDefault();

  try {
    getData();
  } catch (error) {
    console.log(error);
  }
});
