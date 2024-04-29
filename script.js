
//estraggo i dati dall'api e li posiziono nella sezione 

fetch ("https://striveschool-api.herokuapp.com/books")
    //trasformo i dati in json
    .then(response => response.json())
    .then (data=> {
        const libri = data;
        console.log(libri)
        const sezione = document.getElementById("sezione");
        libri.forEach(libro => {
            const card = document.createElement("div");
            card.classList.add("card","book")
            card.innerHTML= `
            <img src="${libro.img}" class="img-fluid" alt="cover ${libro.title}">
            <span class="badge">Added</span>
            <h5 class="card-title">${libro.title}</h5>
            <p class="card-text">Category: ${libro.category}</p>
            <b>Price: ${libro.price}€</b>
            <button class="btn btn-primary bottone" onclick = "addBook('${libro.asin}')">Add to Basket</button>
            `;
            sezione.appendChild(card);
            
        });
    })

function addBook(parametro) { 
  let buttons = document.querySelectorAll('.bottone');
  buttons.forEach(button =>  {
      const badge= button.closest('.badge');
      console.log(badge)
    })

    fetch ("https://striveschool-api.herokuapp.com/books")
    //trasformo i dati in json
    .then(response => response.json())
    .then (data=> {
        const libri = data;
        const carrello = document.getElementById("carrello");
        var idLibro =  parametro;
        let libriFiltrati = libri.filter((libro) =>       
      
        idLibro.includes(libro.asin)
        );
        libriFiltrati.forEach(libroFiltrato => {
        
        const card = document.createElement("li");
            card.classList.add("nav-item")
            card.innerHTML= `
                <div class="card mb-3" style="max-width: 500px;">
                  <div class="d-flex">
                      <img src="${libroFiltrato.img}" class="img-fluid rounded-start" alt="${libroFiltrato.title}" style="max-height: 150px; max-width: 125px;">
                      <div class= "ms-2">
                        <h5 class="card-title">${libroFiltrato.title}</h5>
                        <p class="card-text">Price: ${libroFiltrato.price}</p>
                        <button class="btn btn-primary btn-remove">Remove</button>
                      </div>
                  </div>
                </div>
            `;
            carrello.appendChild(card);
            remove();
        });
    });
}


function remove() {
  let buttons = document.querySelectorAll('.btn-remove');
  console.log(buttons)
  buttons.forEach(button =>  {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const card = this.closest('.card').remove();
      console.log(card)
    })
})
}


function removeAll() {
    let list = document.getElementById("carrello") 
  
    //Uso il While per la prima riga.
    while (list.firstChild){
      list.removeChild(list.firstChild);
    }
}
    

