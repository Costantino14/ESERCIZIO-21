const url = "https://striveschool-api.herokuapp.com/books"
const sezione = document.getElementById("sezione"); //Aggancio dove inserire i libri.
const carrello = document.getElementById("carrello"); //Aggancio al carrello

window.onload = () => {
  fetch (url)
  .then(response => response.json())
  .then (data => {
    const libri = data;
    libri.forEach(libro => {
      const card = document.createElement("div"); //creo un div per ogni libro
      card.classList.add("card","book") //aggiungo una classa bootstrap e una personale
      card.innerHTML= ` 
        <img src="${libro.img}" class="img-fluid" alt="cover ${libro.title}">
        <h5 class="card-title titolo ms-1">${libro.title}</h5>
        <p class="card-text ms-1">Category: ${libro.category}</p>
        <b class="ms-1">Price: ${libro.price}€</b>
        <div class="d-flex gap-2">
          <button class="btn btn-primary bottone m-1" onclick = "addBook('${libro.img}', '${libro.title}', '${libro.price}')">Add to Basket</button>
          <button class="btn btn-primary m-1 trash"><i class="bi bi-trash"></i></button>
          <a href="./bookDetail.html?id=${libro.asin}" class="btn btn-primary m-1">Details</a>
        </div>          
      `;
      //qui sopra inserisco il codice nel div che ho creato e aggiungo i dati dei singoli libri
      sezione.appendChild(card); //aggiungo le card che ho creato
      remove('.trash');
    }) //CHIUSURA forEach

    //Attivazione cambio di colore quando si aggiunge un libro al carrello
    const buttons = document.querySelectorAll(".bottone")
    buttons.forEach((button) => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const card = this.closest('.card');
      console.log(button)
      if (button.textContent === "Add to Basket") {
        button.innerText= "Added"
        card.style.border = "2px solid green";
        card.style.backgroundColor= "#f9f2c2";
      } else {
        button.innerText= "Add to Basket"
        card.style.border = "";
        card.style.backgroundColor= "";
      }
    })
  }) // CHIUSURA then
  
  })
} // Chiusura windows.onload


const addBook = (img,title,price) => {
  
  const card = document.createElement("li");
  card.classList.add("nav-item")
  card.innerHTML= `
    <div class="card mb-3" style="max-width: 500px;">
      <div class="d-flex">
          <img src="${img}" class="img-fluid rounded-start" alt="cover ${title}" style="max-height: 150px; max-width: 125px;">
          <div class= "ms-2">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">Price: ${price}€</p>
            <button class="btn btn-primary btn-remove">Remove</button>
          </div>
      </div>
    </div>
  `;
  carrello.appendChild(card);
  remove('.btn-remove');
} //Chiusura Funzione



          // Funzione per svuotare il carrello
const removeAll = () => {
 //Uso il While per cancellare tutti gli elementi che sono dentro il carrello.
  while (carrello.firstChild){
    carrello.removeChild(carrello.firstChild);
  }
}

  //funzione per la ricerca 

const search = (evento) => {
  const input = evento.target.value.toLowerCase();
  let titles = document.querySelectorAll('.titolo')
  console.log (input)
  console.log (input.length)
  if (input.length>= 3) {
    titles.forEach(title => {
      let card= title.parentElement;
      if (!title.innerText.toLowerCase().includes(input)) {
        card.style.display = "none"
      }
    })  
  } else {
    titles.forEach(title => {
      let card= title.parentElement;      
      card.style.display = "flex"
    })
  }
}



   // Funzione per rimuovere una card o skipparla
function remove(bottone) {
  let buttonsRemove = document.querySelectorAll(bottone);
  buttonsRemove.forEach(button =>  {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const card = this.closest('.card').remove();
    })
  })
}


