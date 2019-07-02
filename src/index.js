fetchDogs()

// GRAB FROM DOM
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const goodDogFilter = document.querySelector("#good-dog-filter")

let dogsList = []


// ADD EVENT LISTENERS
dogBar.addEventListener("click", clickHandler)
goodDogFilter.addEventListener("click", filterDogs)


// FETCH FROM SERVER
function fetchDogs(){
  fetch("http://localhost:3000/pups")
  .then(resp => resp.json())
  .then(dogs => dogsOnDom(dogs))
}

function fetchOneDog(dogId){
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(resp => resp.json())
  .then(showOneDog)
}

function fetchGoodDogPatch(event, dog){
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
    // key: what we are updating in our server
  })
  .then(res => res.json())
  .then(showOneDog)

}

// SLAP IT ON THE DOM

function dogsOnDom(dogs){
  dogsList = dogs
  dogBar.innerHTML = ''
  dogsList.forEach(dog => {
    dogBar.innerHTML += `
    <span class="dog-btn" id=${dog.id}> ${dog.name} </span>
    `
  })
}

function clickHandler(event){
  if(event.target.className === 'dog-btn'){
    const dogId = event.target.id
    fetchOneDog(dogId)
    //show the info for the dog that is clicked on
  }
}

function showOneDog(dog){
  dogInfo.innerHTML = `
  <img src = ${dog.image}>
  <h2>${dog.name}</h2>
  <button class="goodDogBtn">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  `
  // have to add event listener here b/c button doesnt exist until here
  const goodDogBtn = document.querySelector(".goodDogBtn")
  goodDogBtn.addEventListener('click', () => fetchGoodDogPatch(event, dog))
}

function filterDogs(event){
  if(event.target.className === 'off'){
    let filteredDogsList = dogsList.filter(dog => dog.isGoodDog )
    event.target.className = 'on'
    event.target.innerText = 'Filter Good Dogs: ON'
    dogsOnDom(filteredDogsList)
  }
  else {
    event.target.className = 'off'
    event.target.innerText = 'Filter Good Dogs: OFF'
    fetchDogs()
  }
}
