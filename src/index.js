const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const close = document.querySelector('#modal .header a');
const formElement = document.querySelector('#modal form');
let searchedCity = null;

saveToStorage();

formElement.setAttribute('onsubmit', 'saveToStorage()');

buttonSearch.addEventListener("click", () => modal.classList.remove('hide'));

close.addEventListener("click", () => modal.classList.add('hide'));

function saveToStorage() {
  searchedCity = document.querySelector('#modal .search-field input').value;

  formElement.setAttribute('action', '/ecoleta/public/views/search-results.html');

  localStorage.setItem('searched_city', JSON.stringify(searchedCity));
}
