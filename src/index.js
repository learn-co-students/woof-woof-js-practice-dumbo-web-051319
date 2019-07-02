fetchThePups()

const goodDogFilter = document.querySelector("#good-dog-filter")
goodDogFilter.addEventListener("click", filterDogs)
let dogsList = []

function getPupsOnTheDom(puppies){
  // debugger
  console.log(puppies);
  dogsList = puppies

  let dogBar = document.querySelector("#dog-bar")
  dogBar.innerHTML = '' //set to empty string so when filter dogs buton is pushed, more of the same dogs arent appeneded 
  // let pupsList = filteredPups(pup)
  //pupslist.foreach
  puppies.forEach(function(getPuppy){
    // console.log(getPuppy)
    const span = document.createElement("span");
    span.id = getPuppy.id
    // document.body.appendChild(span);
    span.innerText = getPuppy.name
    // span.dataset.id = getPuppy.id
    dogBar.append(span)
    span.addEventListener("click", fetchSinglePupppy)
  })
}


function fetchThePups(){
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(getPupsOnTheDom)
}


function fetchSinglePupppy(event){ //retrieve data for each puppy from the dom
   const pupId = event.target.id //gets the id from the function above
   const promise = fetch(`http://localhost:3000/pups/${pupId}`)
   promise.then(response => response.json())
          .then(data => {
            addPuppyInfo(data)
        })
}

function addPuppyInfo(puppy)
{
  const dogInfo = document.querySelector("#dog-info")

  const dogImg = document.createElement("img")
  dogImg.src = puppy.image

  const dogTitle = document.createElement("h2")
  dogTitle.innerText = puppy.name

  const dogButton = document.createElement("button")
  dogButton.innerText = puppy.isGoodDog ? "Good Dog!" : "Bad Dog!" //true of false

  dogInfo.append(dogImg, dogTitle, dogButton)
  dogButton.addEventListener("click", changeDogStatus)

}

function dogStatus(e){ //shows the status of the dog on the dog button
  if (e.target.innerText === ""){
    e.target.isGoodDog === true ? e.target.innerText = "Good Dog!" : e.target.innerText = "Bad Dog!"
  }
}

function changeDogStatus(change){ //change the status of the dog when you click it

  if (change.target.innerText ===  "Good Dog!"){
    change.target.innerText = "Bad Dog!"
    change.isGoodDog = false
  }
  else if (change.target.innerText === "Bad Dog!"){
    change.target.innerText = "Good Dog!"
    change.isGoodDog = true
  }
}

function filterDogs(event) {
  if(event.target.className === 'off'){
    let filterdDogsList = dogsList.filter(dog => dog.isGoodDog)
    event.target.className = 'on'
    event.target.innerText = 'Filter good dogs: ON'
    getPupsOnTheDom(filterdDogsList)
  }else{
    event.target.className = 'off'
    event.target.innerText = 'Filter good dogs: OFF'
    fetchThePups()
  }
}
