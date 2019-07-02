fetchDogs()

const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')

let dogsList = []

//-------------------ONE DOG INFO ----------------

dogBar.addEventListener('click', handleClick)
dogInfo.addEventListener('click', handleClick)
goodDogFilter.addEventListener('click', handleClick)

function handleClick(event) {
  if (event.target.className.includes('dog-item')) {
    const dogId = event.target.id
    getDogInfo(event, dogId)
  } else if (event.target.className === 'dog-btn') {
    const dogId = event.target.id
    changeDogBtn(event, dogId)
  } else if (event.target.id === 'good-dog-filter') {
    filterDogs(event)
  }
}

function filterDogs(event) {
  // debugger
  if (event.target.className === 'off') {
    let filteredDogsList = dogsList.filter(dog => dog.isGoodDog)
    console.log(filteredDogsList)
    event.target.className = 'on'
    event.target.innerText = 'Filter good dogs: ON'
    slapDogsToBar(filteredDogsList)
  } else {
    event.target.className = 'off'
    event.target.innerText = 'Filter good dogs: OFF'
    fetchDogs()
  }
}


function slapDogInfo(data) {
  dogInfo.innerHTML = `
    <img src=${data.image}>
    <h2>${data.name}</h2>
    <button class='dog-btn' id='${data.id}'>${data.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
  `
  document.querySelector('.dog-btn').dataset.isGoodDog = data.isGoodDog
}

function getDogInfo(event, id) {
  fetch(`http://localhost:3000/pups/${id}`)
  .then(res => res.json())
  .then(slapDogInfo)
}

function changeDogBtn(event, id) {
  let boolean = JSON.parse(event.target.dataset.isGoodDog)
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({isGoodDog: !boolean})
  })
  .then(res => res.json())
  .then(slapDogInfo)
}



//---------------------SLAPPING DOGS -------------

function slapDogsToBar(allData) {
  dogsList = allData

  // const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = '';
  for (const dog of allData) {
    const span = document.createElement('span')
    span.className = `dog-item-${dog.id}`
    span.id = dog.id
    span.innerHTML = dog.name
    dogBar.append(span)
  }
}

function slapOneDogToBar(oneData, div) {
  const span = document.createElement('span')
  span.className = `dog-item-${oneData.id}`
  span.id = oneData.id
  span.innerHTML = oneData.name
  div.append(span)
}

function fetchDogs() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(slapDogsToBar)
}

//--------------- ONLOAD -----------------------------

// document.addEventListener('DOMContentLoaded', fetchDogs)
