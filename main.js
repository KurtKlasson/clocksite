


const APP={
  base: "https://swapi.dev/api/",
        urls:{
        people: "people/",
        planet: "planets/",
        films: "films/",
        species: "species/",
        vehicles: "vehicles/",
        starships: "starships/",
    }}
  /*
    buildNav: () => {
        let df = new DocumentFragment();
        for (let nm in APP.urls) {
          if (nm != 'base') {
            let link = document.createElement('a');
            link.href = `${APP.urls.base}${APP.urls[nm]}`;
            link.textContent = nm;
            link.setAttribute('data-link', `${APP.urls.base}${APP.urls[nm]}`);
            df.append(link);
          }
        }
        document.getElementById('nav').append(df);
      },
      getData: (ev) => {
        if (ev) ev.preventDefault();
        //show overlay / loader
        document.querySelector('.overlay').classList.add('active');
        //get the url
        let link = ev.target;
        let url = link.getAttribute('data-link');
        //fetch the data
        fetch(url)
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then(APP.buildList)
          .catch((err) => {
            console.error(err);
            document.querySelector('.overlay').classList.remove('active');
          });
}}
*/

let searchText = document.getElementById("txtSearch")
console.log(searchText)

searchText.onkeydown = async function (event){
  if(event.key === "Enter"){
    event.preventDefault()

    let searchTerm = searchText.value
    console.log("Söker efter ", searchTerm)

    let results = APP.urls.forEach(await search(searchTerm))

    renderResults(results)
  }
}

async function search(searchString, item){
    let response = await fetch(`https://swapi.dev/api/${item}/?search=${searchString}`)
  
  let json = await response.json()
return json
}

function renderResults (res){
  console.log(res)
}


