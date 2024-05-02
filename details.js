const parametri = new URLSearchParams(location.search);
const id = parametri.get("id")
const url = "https://striveschool-api.herokuapp.com/books/"+ id;
const container = document.querySelector(".container")

console.log(id)

fetch (url)
.then(response => response.json())
.then (data => {
  const dettagli = data;
  container.innerHTML= `
    <div class="card m-5" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${dettagli.img}" class="img-fluid rounded-start" alt="cover ${dettagli.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${dettagli.title}</h5>
            <p class="card-text">Category: ${dettagli.category}</p>
            <p class="card-text"><small class="text-body-secondary">Price: <b>${dettagli.price}€</b></small></p>
          </div>
        </div>
      </div>
    </div>
  `;

  
  })