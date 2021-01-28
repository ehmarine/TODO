const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addTodo');
const output = document.querySelector('#output');
const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
const falsy = document.querySelector('#falsy');
const trueInput = document.querySelector('#trueInput');
const inputText = document.querySelector('h3');
const card = document.getElementsByClassName('myCard');


let todos = [];


// FETCH
const fetchTodos = async () => {

  const res = await fetch(url);
  const _todos = await res.json();
  // console.log(_todos)
  todos = _todos;
  // console.log(...todos)
  
  listTodos();
}
fetchTodos();


const listTodos = () => {
  output.innerHTML = '';

  todos.forEach(todo => {

    // console.log(todo)
    newTodo(todo);
  })
}


// APPEND HTML

const newTodo = (todo) => {

  let card = document.createElement('div');
  card.classList.add('p-3', 'my-3', 'todo' , 'myCard');
  card.id = todo.id;

  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  innerCard.id = todo.id;

  let title = document.createElement('h3');
  title.classList.add('title');
  title.innerText = todo.title;
  title.id = todo.id;

  let btn = document.createElement('button');
  btn.classList.add('btn', 'btn-danger', 'd-none');
  btn.innerText = 'X';
  btn.id = todo.id
  

  output.appendChild(card);
  card.appendChild(innerCard);
  innerCard.appendChild(title);
  innerCard.appendChild(btn);

  if(todo.completed) {

    title.classList.add('completed')
    btn.classList.remove('d-none')
  }

  // todos.forEach(todo => {
//   let template = todos.innerHTML += `
//   <div id="${todo.id}" class="myCard bg-white border rounded mt-4 p-3 d-flex justify-content-between align-items-center">
//     <div id="todoText">
//       <h2>${todo.title}</h2>
//     </div>
//     <button class="btn btn-danger">X</button>
// </div>`

//     output.innerHTML += template;
//   })

}

 

const createTodo = async (title) => {
  
    const _todo = {
      title,
      completed: false
      
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(_todo) 
    })
    const todo = await res.json();

    todo.id = Date.now()
    // console.log(todo.id)
    todos.unshift(todo);
    listTodos();
}




// EVENTLISTENERS


output.addEventListener('click', (e) => {

  todos.forEach(todo => {

    if(e.target.id == todo.id) {
    
      if(todo.completed == false) {
        todo.completed = true;
      }else {
        todo.completed = false;
      }
      // console.log('hej')
    }
  })

    if(e.target.classList.contains('btn')) {
      console.log(e.target.id)
     
      todos = todos.filter(todo => todo.id != e.target.parentNode.id) 
  }
  listTodos()

  console.log(e.target.id)
})





form.addEventListener('submit', (e) => {
  e.preventDefault();


  if(input.value === '') {
    input.classList.add('is-invalid')
    falsy.classList.remove('d-none')
    trueInput.classList.add('d-none')
    

    return false
  }else {
    createTodo(input.value)
    input.classList.remove('is-invalid')
    falsy.classList.add('d-none')
    trueInput.classList.remove('d-none')

    // input.classList.add('is-valid')
  }

  input.value = '';
  input.classList.remove('is-invalid')
  input.classList.remove('is-valid')
})




form.addEventListener('keydown', (e) => {

  // console.log(e)

  if(input.value === '') {
    input.classList.remove('is-valid')

    return false;

  }else {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    falsy.classList.add('d-none')
    trueInput.classList.add('d-none')
    
  }

})






// GAMLA FRÅN LISTTODOS




output.addEventListener('click', (e) => {
  // output.innerHTML = '<h1 class="container d-flex justify-content-center">Det var allt för mig, tack!</h1>'
  
  })
