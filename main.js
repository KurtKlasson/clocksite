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
        Height: ${element.results[i].height}
        <br>
        Mass: ${element.results[i].mass}
        <br>
        Hair Color: ${element.results[i].hair_color}
        <br>
        Skin Color: ${element.results[i].skin_color}
        <br>
        Gender: ${element.results[i].gender}</p></div>`;
        console.log("lägger till en person");
        outputdiv.insertAdjacentHTML("afterbegin", resultDiv);
      }
    } else if (element.results[0].climate != undefined) {
      console.log("söker på planet");
      for (let i = 0; i < element.results.length; i++) {
        let resultDiv = `<div><h3>${element.results[i].name}</h3>
        <p> Rotation Period: ${element.results[i].rotation_period}
        <br>
        Orbital Period: ${element.results[i].orbital_period}
        <br>
        Climate: ${element.results[i].climate}
        <br>
        Diameter: ${element.results[i].diameter}
        <br>
        Population: ${element.results[i].population}
        <br>
        Terrain: ${element.results[i].terrain}
        <br>
        Gravity:        ${element.results[i].gravity}</p></div>`;
        outputdiv.insertAdjacentHTML("afterbegin", resultDiv);
      }
    } else if (element.results[0].average_height != undefined) {
      console.log("det var en species");
      for (let i = 0; i < element.results.length; i++) {
        let resultDiv = `<div><h3>${element.results[i].name}</h3>
        <p> Average height: ${element.results[i].average_height}
        <br>
        Average lifespan: ${element.results[i].average_lifespan}
        <br>
        Classification: ${element.results[i].classification}
        <br>
        Language: ${element.results[i].language}
        <br>
        Deisgnation: ${element.results[i].designation}
        <br>
        Eye Colors: ${element.results[i].eye_colors}
        <br>
        Skin Color:  ${element.results[i].skin_colors}</p></div>`;
        outputdiv.insertAdjacentHTML("afterbegin", resultDiv);
      }
    } else if (element.results[0].director != undefined) {
      console.log("Det var en film");
      for (let i = 0; i < element.results.length; i++) {
        let resultDiv = `<div><h3>${element.results[i].title}</h3>
        <p> Intro: ${element.results[i].opening_crawl}
        <br>
        Episode: ${element.results[i].episode_id}
        <br>
        Release Date: ${element.results[i].release_date}
        <br>
        Director: ${element.results[i].director}
        <br>
        Producer: ${element.results[i].producer}</p></div>`;
        outputdiv.insertAdjacentHTML("afterbegin", resultDiv);
      }
    } else if (element.results[0].crew != undefined) {
      console.log("Vehicle eller starship");
      for (let i = 0; i < element.results.length; i++) {
        let resultDiv = `<div><h3>${element.results[i].name}</h3>
        <p> Mega lights/hour: ${element.results[i].MGLT}
        <br>
        Passangers: ${element.results[i].passengers}
        <br>
        Cargo Capacity: ${element.results[i].cargo_capacity}
        <br>
        Manufacturer: ${element.results[i].manufacturer}
        <br>
        Crew: ${element.results[i].crew}
        <br>
        Model: ${element.results[i].model}
        <br>
        Cost: ${element.results[i].cost_in_credits} credits</p></div>`;
        outputdiv.insertAdjacentHTML("afterbegin", resultDiv);
      }
    }
  });
}
