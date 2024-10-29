document.addEventListener("DOMContentLoaded", 
function () {
    const imgOptions = {};
    const imgObserver = new IntersectionObserver((entries, imgObserver)=> {
        entries.forEach((entry)=> {
            if(!entry.isIntersecting)return;
            const img = entry.target
            var dataImage = img.getAttribute("data-image")
            img.src=dataImage
            imgObserver.unobserve(img)
        })
    },imgOptions)
//#region fetch pokemon
  const fetchPokemons = async (endpoint) => {
    let data;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
    } catch (error) {
      console.log(error);
    }
    return data.pokemon_species;
  };
  //#endregion
  function orderNumber(str){
    var MySubstring = str.substring(
        str.lastIndexOf("s/")+2,str.lastIndexOf("/")
    )
    return MySubstring
  }
  async function getPokemons(numero, toggle) {
    let endpoint=`https://pokeapi.co/api/v2/generation/${numero}/`
    var container =document.getElementById("container")
    container.innerHTML=""
    let pokemons =[];
    pokemons = await fetchPokemons(endpoint)
    for(let j=0; j<pokemons.length; j++) {
        pokemons[j].nr=orderNumber(pokemons[j].url);
    }

    pokemons.sort((a,b)=> a.nr-b.nr);

    pokemons.forEach((item) => {
        let numero3Decimales = orderNumber(item.url)
        if(numero3Decimales<10){
            numero3Decimales="0"+numero3Decimales;
        }
        if(numero3Decimales<100){
            numero3Decimales="0"+numero3Decimales;
        }
        let divItem= document.createElement("li")
        divItem.classList.add("item")
    var img = new Image();
    const toggleurl = toggle
    ?"http://assets.pokemon.com/assets/cms2/img/pokedex/full/":
    "https://serebii.net/pokemongo/pokemon/";
    img.src= "https://i.ibb.co/vZpZ3rW/SVKl.gif"
    const urlImage =`${toggleurl}${numero3Decimales}.png`
    img.setAttribute("data-image",urlImage);
    img.setAttribute("class","pokeimage");
    img.setAttribute("alt", item.name);

    divItem.innerHTML=`<div> ${orderNumber(item.url)}-${item.name}</div>`
    divItem.appendChild(img)
    container.appendChild(divItem);
    imgObserver.observe(img)
        
    });
  };
  var numero=1;
  getPokemons(1)
  var toggle = false;
  const btnIcon=document.getElementById("btnIcon")
  btnIcon.addEventListener("click", function(){
    toggle =!toggle;
    getPokemons(numero,toggle)
  })
  var geners = [
    "Generation-1",
    "Generation-2",
    "Generation-3",
    "Generation-4",
    "Generation-5",
    "Generation-6",
    "Generation-7",
  ];

  var filters = document.getElementById("filters");

  var gen = "";

  for (let i = 0; i < geners.length; i++) {
    gen += ` <input class="radi-gens" type="radio" id=${geners[i]} 
            value=${i + 1} name="generation" checked>
    <label for=${geners[i]} class="label-gens">${geners[i]}</label>`;
  }
  filters.innerHTML = gen;
  filters.addEventListener("click", function(f){
    let targ = f.target.type
    if(targ=="radio"){
        getPokemons(f.target.value, toggle)
        title.innerHTML="pokemon " + f.target.id;
    }
  })
});
