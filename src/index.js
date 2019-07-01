// VARIABLES -----------------------------------------

const dogBar = document.querySelector('#dog-bar');
const dogSheet = document.querySelector('#dog-info');
const filterButton = document.querySelector('#good-dog-filter');

// LISTENERS HANDLERS ---------------------------------

document.addEventListener('DOMContentLoaded', getDogs);
dogBar.addEventListener('click', findClickedDog);
dogSheet.addEventListener('click', moralityHandler)
filterButton.addEventListener('click', changeFilterText)

function dogs(json){
  displayDogs(json);
  // debugger;
}

function findClickedDog(event){
  // dogName = event.target.innerText;
  dogId = event.target.dataset.id;
  getDog(dogId);
  // debugger;
}

function moralityHandler(event){
  const id = event.target.dataset.id
  const morality = event.target.innerText
  if(event.target.type == "button"){
    updateMorality(id, morality);
  }
  // debugger;
}

// FETCHES -------------------------------------------

function getDogs(){
  const promprom = fetch('http://localhost:3000/pups');
  const respo = promprom.then((response) => response.json());
  respo.then((json) => dogs(json));
  // debugger;
}

function getDog(dogId){
  fetch(`http://localhost:3000/pups/${dogId}`)
    .then((respo) => respo.json())
      .then((json) => displayClickedDog(json))
}

function updateMorality(id, morality){
  if(morality == "Good Dog!"){
    morality = false;
  }else{
    morality = true;
  }
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({isGoodDog: morality})
  });
  displayMorality(id, morality);
  // debugger;
}

// DOM MANIPULATION -----------------------------------

function displayMorality(id, morality){
  const buttonMorals = dogSheet.querySelector('button');
  if(buttonMorals.innerText == 'Good Dog!'){
    buttonMorals.innerText = 'Bad Dog!';
  }else{
    buttonMorals.innerText = 'Good Dog!';
  }
  location.reload();
  // debugger;
}

function displayClickedDog(json){
  let morality = ""
  if(json.isGoodDog){
    morality = "Good Dog!";
  }else{
    let morality = "Bad Dog!";
  }
  // debugger;
  dogSheet.innerHTML = `
    <img src=${json.image}>
    <h2>${json.name}</h2>
    <button type="button" data-id=${json.id}>${morality}</button>
  `;
  // debugger;
}

function displayDogs(json){
  dogBar.innerHTML = ''
  if(filterButton.innerText == "Filter good dogs: OFF") {
    json.forEach((dog) => {
      let span = document.createElement('span');
      span.innerText = `${dog.name}`;
      span.dataset.id = `${dog.id}`;
      dogBar.append(span);
    // debugger;
    });
  }else{
    json.forEach((dog) => {
      if(dog.isGoodDog == true){
        let span = document.createElement('span');
        span.innerText = `${dog.name}`;
        span.dataset.id = `${dog.id}`;
        dogBar.append(span);
      }
    // debugger;
    })
  }
}


function changeFilterText(){
  // debugger;
  if(filterButton.innerText == "Filter good dogs: OFF"){
    filterButton.innerText = "Filter good dogs: ON"
  }else{
    filterButton.innerText = "Filter good dogs: OFF"
  }
  getDogs();
}
// OTHER LOGIC ---------------------------------
