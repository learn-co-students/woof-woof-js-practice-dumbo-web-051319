

// --------- DOM MANIPULATION ---------
function createPuppies(puppies, dogBar) {
  // const dogBar = document.querySelector('#dog-bar')
  puppies.forEach(pup => {singlePuppy(pup, dogBar)})
}

function singlePuppy(pup, dogBar) {
  const pupSpan = document.createElement('span')
  pupSpan.innerHTML = pup.name
  pupSpan.dataset.id = pup.id
  pupSpan.addEventListener("click", showPupInfo)
  dogBar.append(pupSpan)
}

function showPupInfo(event) {
 const dogId = parseInt(event.target.dataset.id)
 fetchSinglePup(dogId)
}

function displayPupInfo(pup) {
  const dogBox = document.querySelector('#dog-info')
  dogBox.innerHTML =  `
  <img src=${pup.image}>
  <h2>${pup.name}</h2>
  <button> ${goodBad(pup)}</button>
  `
}

function goodBad(pup) {
  if (pup.isGoodDog === true){
  return "Good Pupper!"
} else {
  return "Not So Good Dog!"
}}

// --------- EVENT LISTENERS ---------
document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector('#dog-bar')
  fetchPuppies(dogBar)

})


// --------- FETCH REQUESTS ---------
function fetchPuppies(dogBar) {
  fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
  .then(puppies => {createPuppies(puppies, dogBar)})
}

function fetchSinglePup(dogId) {
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(resp => resp.json())
  .then(displayPupInfo)
}
