document.addEventListener('DOMContentLoaded',()=>{
let divContainer=document.getElementById('chore-list')
fetch('http://localhost:3000/chores')
  .then(function (response) {
    return response.json() //Transform our response to json
  })
  .then (function(json){

    displayChores(json)
    //
    //event listener for div container
    divContainer.addEventListener('click', function(event){
      // debugger
      if (event.target.className === "delete-button") {
        // if (evet.target.dataset["id"] === "d")

        let sub = parseInt(event.target.dataset["id"])
        let deleteButton = document.querySelector(`[data-id="${sub}"]`)
        deleteButton.parentNode.remove()
        fetch(`http://localhost:3000/chores/${sub}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          }
        })
        .then(function (response) {
          return response.json() //Transform our response to json
        })
        .then (function(json){

          // displayChores(json)
        })
      }
    })
  })

  function displayChores(chores){
    divContainer.innerHTML=""
    chores.forEach(function(chore){
      divContainer.innerHTML += `<div class="chore-card">
        <button class="delete-button" data-id="${chore['id']}"=>x</button>
        <h3> '${chore['title']}' </h3>
        <p> Duration: ${chore['duration']} </p>
        <input value="${chore['priority']}">
      </div>`

    })
  }

//event for new chore form
let titleInput=document.getElementById('title')
let priorityInput=document.getElementById('priority')
let durationInput=document.getElementById('duration')
let submit =document.getElementById('new-chore-form')



submit.addEventListener('submit', function(){
  let titleVal = titleInput.value  //gets value of input id title
  let priorityVal = priorityInput.value
  let durationVal = durationInput.value

  fetch('http://localhost:3000/chores',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      title: titleVal,
      priority: priorityVal,
      duration: durationVal

    })
  })
  .then(function (response) {

    return response.json() //Transform our response to json
  })
  .then (function(json){


    displayChores(json)
    //
    //event listener for div container
  })

})




















})
