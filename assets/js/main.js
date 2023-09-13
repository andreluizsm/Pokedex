const pokemonList = document.getElementById('pokemonList')
const loadMorebutton = document.getElementById('loadMoreButton')

const maxRecord = 151
const limit = 10
let offset = 0

function clickMe(){
    window.location.href = 'http://localhost:5500/status.html'
}

function convertPokemonToLi(pokemon) {
    return `   
        <button id = "statusButton" class= "status" onclick="clickMe()">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(``)}
                    </ol>

                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">

                </div>
            </li>
        </button>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit)

loadMorebutton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        
        loadMorebutton.parentElement.removeChild(loadMorebutton)
    } else {
        loadPokemonItens(offset,limit)
    }
  
})