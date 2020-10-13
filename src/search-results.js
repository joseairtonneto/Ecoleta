const collectionPoints = JSON.parse(localStorage.getItem('list_of_collection_points'));
const searchedCity = JSON.parse(localStorage.getItem('searched_city'));

const h4Element = document.querySelector('main h4');
const cardsElement = document.querySelector('.cards');

function renderCards() {
  if(searchedCity === '') {
    if(collectionPoints !== null) {
      quantityFound(collectionPoints);
      renderCard(collectionPoints);
    } else {
      quantityFound(0);
    }
  } else {
    let searchedCollectionPoints =  collectionPoints.map(point => {
      if(point.place.city === searchedCity)
        return point;
    });

    if(searchedCollectionPoints[0] !== undefined) {
      quantityFound(searchedCollectionPoints);

      renderCard(searchedCollectionPoints);
    } else {
      quantityFound(0);
    }
  }
}
function renderCard(searchedCollectionPoints) {
  searchedCollectionPoints.forEach(point => {
    let cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card')

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', point.image);
    imageElement.setAttribute('alt', 'Colectoria');

    let nameElement = document.createElement('h1');
    nameElement.appendChild(document.createTextNode(point.nome));

    let itemsElement = document.createElement('h3');
    itemsElement.appendChild(document.createTextNode(point.items));

    let pElement = document.createElement('p');
    let cityText = document.createTextNode(point.place.city);
    let stateText = document.createTextNode(point.place.state);
    let addressText = document.createTextNode(point.place.address);
    let address2Text = document.createTextNode(point.place.address2);

    pElement.appendChild(cityText);
    pElement.appendChild(document.createTextNode(','));
    pElement.appendChild(stateText);
    pElement.appendChild(document.createElement('br'));
    pElement.appendChild(addressText);
    pElement.appendChild(document.createElement('br'));
    pElement.appendChild(address2Text);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(nameElement);
    cardElement.appendChild(itemsElement);
    cardElement.appendChild(pElement);

    cardsElement.appendChild(cardElement);
  });
}

function quantityFound(searchedCollectionPoints) {
  let quantityFound = document.createElement('strong');
  if(searchedCollectionPoints.length === 0 || searchedCollectionPoints === null) {
    let quantityFoundText = document.createTextNode('Nenhum local cadastrado');
    quantityFound.appendChild(quantityFoundText)

    h4Element.appendChild(quantityFound);

    return;
  }

  if(searchedCollectionPoints.length === 1) {
    let quantityFoundText = document.createTextNode(`${searchedCollectionPoints.length} ponto`);

    let foundText = document.createTextNode(' encontrado');
    quantityFound.appendChild(quantityFoundText)

    h4Element.appendChild(quantityFound);
    h4Element.appendChild(foundText);
    return;
  }

  if(searchedCollectionPoints.length > 1) {
    let quantityFoundText = document.createTextNode(`${searchedCollectionPoints.length} pontos`);

    let foundText = document.createTextNode(' encontrados');
    quantityFound.appendChild(quantityFoundText)

    h4Element.appendChild(quantityFound);
    h4Element.appendChild(foundText);
    return;
  }
}

renderCards();
