
//estraggo i dati dall'api e li posiziono nella sezione dedicata nella pagina

fetch ("https://striveschool-api.herokuapp.com/books")
    //trasformo i dati in json
    .then(response => response.json())
    .then (data=> {
        const libri = data;
        console.log(libri)
        const sezione = document.getElementById("sezione");
        libri.forEach(libro => {
            const card = document.createElement("div"); //creo un div per ogni libro
            card.classList.add("card","book") //aggiungo una classa bootstrap e una personale
            card.innerHTML= ` 
            <img src="${libro.img}" class="img-fluid" alt="cover ${libro.title}">
            <span class="badge">Added</span>
            <h5 class="card-title titolo">${libro.title}</h5>
            <p class="card-text">Category: ${libro.category}</p>
            <b>Price: ${libro.price}€</b>
            <button class="btn btn-primary bottone" onclick = "addBook('${libro.asin}')">Add to Basket</button>
            `;
            //qui sopra inserisco il codice nel div che ho creato e aggiungo i dati dei singoli libri

            sezione.appendChild(card); //aggiungo le card che ho creato
            
        });
    })

function addBook(parametro) { 

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
            remove(); //solo in questo momento richiamo la funzione remove
        });
    });
}


//funzione per la ricerca da completare
const search = (evento) => {
  let input = evento.target.value
  console.log(input)
  let titoli = document.querySelectorAll('.titolo')
  console.log(titoli)
 titoli.forEach(titolo => {
    const card = titolo.parentElement
    console.log(card)
    console.log(titolo)
    if (titolo.includes(input.toLowerCase())) {
      card.style.display = "none"
    } else {
      card.style.display = "block"
    }
  })
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
  
    //Uso il While per cancellare tutti gli elementi che sono dentro il carrello.
    while (list.firstChild){
      list.removeChild(list.firstChild);
    }
}
    

