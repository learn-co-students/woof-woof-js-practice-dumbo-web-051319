

// --------- DOM MANIPULATION ---------
function createPuppies(puppies) {
  puppies.forEach(singlePuppy)
}

function singlePuppy(pup) {
  const dogBar = document.querySelector('#dog-bar')
  const pupSpan = document.createElement('span')
  pupSpan.className = "js-span"
  pupSpan.innerHTML = pup.name
  pupSpan.dataset.id = pup.id
  pupSpan.dataset.filter = pup.isGoodDog
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
  <button class="dogbtn" data-status=${pup.isGoodDog} data-id=${pup.id}> ${goodBad(pup)}</button>
  `
  dogBox.querySelector('.dogbtn').addEventListener("click", toggleStatus)
}

function goodBad(pup) {
  if (pup.isGoodDog === true){
  return "Good Pupper!"
} else {
  return "Not So Good Dog!"
}}

function toggleStatus(event) {
  const patchId = parseInt(event.target.dataset.id)
  fetchPupPatch(patchId, event)
}

function updatePupDom(pup, event) {
  event.target.dataset.status = pup.isGoodDog
  event.target.innerText = `${goodBad(pup)}`
}

function filterPups(event) {
  const dogBar = document.querySelector('#dog-bar')
  let buttonText = event.target.innerText
  if (buttonText === "Filter good dogs: OFF") {
    event.target.innerText = "Filter good dogs: ON"
    dogBar.innerText = ""
    fetchPuppies().then(puppies => {createPuppies(filterFetchPups(puppies))})
} else {
    event.target.innerText = "Filter good dogs: OFF"
    dogBar.innerText = ""
    fetchPuppies().then(createPuppies)
  }
}

function filterFetchPups(puppies) {
  let dogFilters = puppies.filter(pup => pup.isGoodDog === true)

  return dogFilters
}

// --------- EVENT LISTENERS ---------
document.addEventListener("DOMContentLoaded", () => {
  fetchPuppies().then(createPuppies)

  const filterButton = document.querySelector('#good-dog-filter')
  filterButton.addEventListener("click", filterPups)

})



// --------- FETCH REQUESTS ---------
function fetchPuppies() {
  return fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
}

function fetchSinglePup(dogId) {
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(resp => resp.json())
  .then(displayPupInfo)
}

function fetchPupPatch(patchId, event) {
  var boolPup = event.target.dataset.status
  if (boolPup === "true") {
    var boolValue = false
  } else {
    var boolValue = true
  }
  fetch(`http://localhost:3000/pups/${patchId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "isGoodDog": boolValue
    })
  })
  .then(resp => resp.json())
  .then(pup => {updatePupDom(pup, event)})
}
