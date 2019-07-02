document.addEventListener("DOMContentLoaded", function() {
    
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(allPups)

    filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", filterPups)

})


function allPups(jsonPups) {
    
    let dogBar = document.querySelector("#dog-bar")
    let dogInfo = document.querySelector("#dog-info")
   
    jsonPups.map(pup => {
        let dogSpan = document.createElement("span")

        dogSpan.className = "pup"
        dogSpan.id = `${pup.id}`
        dogSpan.innerText = `${pup.name}`
        dogSpan.addEventListener("click", function() {singleDog(pup, event)})
        
        dogBar.append(dogSpan)
    })
}

function filterPups(event) {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(filteredPups)
}

function filteredPups(jsonPups) {
    let dogBar = document.querySelector("#dog-bar")
    let dogInfo = document.querySelector("#dog-info")
   
    if (filterButton.innerText === "Filter good dogs: OFF") {
        filterButton.innerText = "Filter good dogs: ON"
        dogBar.innerHTML = ""
        jsonPups.map(pup => {
        if (pup.isGoodDog === true) {
            let dogSpan = document.createElement("span")

            dogSpan.className = "pup"
            dogSpan.id = `${pup.id}`
            dogSpan.innerText = `${pup.name}`
            dogSpan.addEventListener("click", function() {singleDog(pup, event)})
            dogBar.append(dogSpan)
        }
    })

    } else if (filterButton.innerText === "Filter good dogs: ON") {
      
        filterButton.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        jsonPups.map(pup => {
            let dogSpan = document.createElement("span")

            dogSpan.className = "pup"
            dogSpan.id = `${pup.id}`
            dogSpan.innerText = `${pup.name}`
            dogSpan.addEventListener("click", function() {singleDog(pup, event)})
            dogBar.append(dogSpan)
        })

    }
    
}


function singleDog(pup, event) {
    let dogInfo = document.querySelector("#dog-info")
   
    dogInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button id="good-bad">${pup.isGoodDog === true ? "Good Dog!" : "Bad Dog!"} </button>
    `
    const goodBadButton = document.querySelector("#good-bad")
    goodBadButton.addEventListener("click", () => {
        toggleBehavior(pup, event)
    }) 
}


function toggleBehavior(pup, event) {

    fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "isGoodDog": (pup.isGoodDog === true ? false : true)
    })
    }).then( r => r.json() )
    .then( pup => {singleDog(pup,event)
    })
}

