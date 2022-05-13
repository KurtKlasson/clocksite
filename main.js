let outputdiv = document.getElementById("output-div");

const urls = [
  "people/",
  "planets/",
  "films/",
  "species/",
  "vehicles/",
  "starships/",
];
let searchText = document.getElementById("txtSearch");
console.log(searchText);

searchText.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchTerm = searchText.value;
    console.log("Söker efter ", searchTerm);

    let allresults = [];
    for (let i = 0; i < urls.length; i++) {
      console.log(urls[i]);
      let results = await search(searchTerm, urls[i]);
      console.log(results.count);
      if (results.count != 0) {
        allresults.push(results);
      }
    }

    console.log("all results", allresults);
    renderResults(allresults);
  }
};

async function search(searchString, item) {
  let response = await fetch(
    `https://swapi.dev/api/${item}?search=${searchString}`
  );

  let json = await response.json();
  return json;
}

function renderResults(res) {
  res.forEach((element) => {
    console.log(element.results[0], "element");

    if (element.results[0].gender != undefined) {
      console.log(element.results.length);
      console.log("lägger till en people");
      for (let i = 0; i < element.results.length; i++) {
        let resultDiv = `<div><h3>${element.results[i].name}</h3>
        <p> Birth year: ${element.results[i].birth_year}
        <br>
        Height: ${element.results[i].height}</p></div>`;
        console.log("lägger till en person");
        outputdiv.insertAdjacentHTML("Beforeend", resultDiv);
      }
    } else if (element.results[0].climate != undefined) {
      console.log("söker på planet");
    } else if (element.results[0].average_height != undefined) {
      console.log("det var en species");
    } else if (element.results[0].director != undefined) {
      console.log("Det var en film");
    } else if (element.results[0].crew != undefined) {
      console.log("Vehicle eller starship");
    }
  });
}
