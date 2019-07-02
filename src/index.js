const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

fetchDisplay()


// console.log(dogBar)
// -----------------  ADDING EVENT LISTENERS  --------------------------
//action that will trigger the js; function finds the targe of the event, to see where it was clicked
dogBar.addEventListener('click', clickDog)



// -----------------DOM Manipulation -------------------------
//
function displayDog(dogs){
  // console.log('dogs', dogs);
  dogs.forEach(dog => {
    dogBar.innerHTML += `
    <span class="dog_name" id=${dog.id}>${dog.name}</span>
    `
  })
}

function singleDogBar(dog){
  dogInfo.innerHTML = `

    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button id="goodDogBtn">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog'} </button>
  `
  const goodDog = document.querySelector("#goodDogBtn")
  goodDog.addEventListener('click', (event) => fetchGoodDogBtn(event, dog))
}
//fucntion to make the event click work
function clickDog(event){
  if(event.target.className === 'dog_name'){
    const id = event.target.id
    fetchClickDog(id)
  }
}


// ----------------------- fetching -------------------------------
function fetchDisplay(){
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(displayDog)
}

//fetching to display each dog info
function fetchClickDog(id){
  fetch (`http://localhost:3000/pups/${id}`)
  .then(res => res.json())
  .then(singleDogBar)
}

function fetchGoodDogBtn(event, dog){
  fetch (`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      isGoodDog: !dog.isGoodDog})
  })
  .then(res => res.json())
  .then(singleDogBar)
}
