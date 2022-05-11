let outputdiv = document.getElementById("output-div")

const urls = [
        "people/",
        "planets/",
        "films/",
        "species/",
        "vehicles/",
        "starships/",
      ]
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

    let allresults = []
    for (let i = 0; i < urls.length; i++){
      console.log(urls[i])
      let results = await search(searchTerm, urls[i])
      console.log(results.count)
      if(results.count != 0){
      allresults.push(results)}
    }

   console.log("all results",allresults)
    renderResults(allresults)
  }
}

async function search(searchString, item){
    let response = await fetch(`https://swapi.dev/api/${item}?search=${searchString}`)
  
  let json = await response.json()
return json
}

function renderResults (res){
  res.forEach(element => {
    console.log(element.results[0],"element")


    
    if (element.results[0].gender != undefined){
      console.log("lägger till en people")
    let resultDiv = `<div><h3>${element.results[0].name}</h3>
    <p> Birth year: ${element.results[0].birth_year}
    <br>
        Height: ${element.results[0].height}</p></div>`;
        outputdiv.insertAdjacentHTML("AfterEnd", resultDiv);
      } else if (element.results[0].climate != undefined){
        console.log("söker på planet")
      } else if (element.results[0].average_height != undefined){
        console.log("det var en species")
      } else if (element.results[0].director != undefined){
        console.log("Det var en film")
      } else if (element.results[0].crew != undefined){
        console.log("Vehicle eller starship")
      }

    
  });
}


