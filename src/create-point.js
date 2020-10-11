function populateUFs ()
{
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
            .then(states => {
                for(let state of states)
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
            .then(cities => {
                for(const city of cities)
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

                citySelect.disabled = false
            })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add or remove class with js
    itemLi.classList.toggle("selected")
    //get items id
    const itemId = itemLi.dataset.id

    //get items selected
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    //add or remove items into array
    if( alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item => item != itemId)
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    //att the hidden camp with selected items
    collectedItems.value = selectedItems
}
