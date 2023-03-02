const form = document.querySelector('#create-form');
const fullNameInput = document.querySelector('#fullName');
const descInput = document.querySelector('#position');
const itemList = document.querySelector('#item-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = fullNameInput.value.trim();
  const position = descInput.value.trim();

  createItem(fullName, position);
});

function createItem(fullName, position) {
  fetch('http://localhost:3000/api/players', {
    method: 'POST',
    body: JSON.stringify({ fullName, position, age }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      getAllItems();
      fullNameInput.value = '';
      descInput.value = '';
    })
    .catch(err => console.error(err));
}

function getAllItems() {
  fetch('http://localhost:3000/api/players',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      itemList.innerHTML = '';
      console.log(data);
      data.listing.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.fullName} - ${item.position} - ${item.age}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          deleteItem(item.id);
        });

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.addEventListener('click', () => {
          updateItem(item.id, prompt('Enter the new fullName:'), prompt('Enter the new position:'),
          prompt('Enter the age:'));
        });

        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);
        itemList.appendChild(li);
      });
    })
    .catch(err => console.error(err));
}

function deleteItem(id) {
  fetch(`http://localhost:3000/api/players/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
        console.log("This is id", id);
      getAllItems();
    })
    .catch(err => console.error(err));
}

function updateItem(id, newfullName, newposition, newAge) {
  fetch(`http://localhost:3000/api/players/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ fullName: newfullName, position: newposition, age : newAge }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      getAllItems();
    })
    .catch(err => console.error(err));
}

// Retrieve all items from the API
getAllItems();
