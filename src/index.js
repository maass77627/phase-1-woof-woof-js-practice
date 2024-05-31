
document.addEventListener('DOMContentLoaded', (e) => {
console.log(e)

fetch('http://localhost:3003/pups')
.then((response) => response.json())
.then((json) => dogsOnDom(json))



function dogsOnDom(dogs) {
let dogbar = document.getElementById('dog-bar')

for (let dog of dogs) {
    let span = document.createElement('span')
    span.addEventListener('click', (e) => {dogInfo(e.target.innerHTML, dogs)})
    span.innerHTML = dog.name
    dogbar.appendChild(span)
}}

function dogInfo(dogname, dogs){
    console.log(dogs)
    console.log(dogname)
    let doggy = dogs.find((dog) => dog.name == dogname)
    let doginfos = document.getElementById('dog-info')
    let image = document.createElement('img')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    if (doggy.isGoodDog == true) {
        button.innerHTML = "Good Dog!"
    } else if (doggy.isGoodDog == false) {
        button.innerHTML = "Bad Dog!"
    }
    button.addEventListener('click', (e) => {toggle(e.target.innerHTML, doggy, button)})
    image.src = doggy.image
    h2.innerHTML = doggy.name
    doginfos.appendChild(image)
    doginfos.appendChild(h2)
    doginfos.appendChild(button)
}

function toggle(type, doggy, button) {
    console.log(button)
    console.log(type)
    console.log(doggy)

    if (type == "Good Dog!") {
       button.innerHTML = "Bad Dog!"
       fetch(`http://localhost:3003/pups/${doggy.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({isGoodDog: false})
    })
      
    } else if (type == "Bad Dog!") {
     button.innerHTML = "Good Dog!"
     fetch(`http://localhost:3003/pups/${doggy.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({isGoodDog: true})
    })
    }
}



})


