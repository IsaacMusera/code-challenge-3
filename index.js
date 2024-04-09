const baseApiUrl = 'https://json-server-wbsb.onrender.com';
const filmsUrl = `${baseApiUrl}/films`;
const ticketsUrl = `${baseApiUrl}/tickets`;

document.addEventListener("DOMContentLoaded", () => {
  getMovies();
  document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

function getMovies() {
  fetch(filmsUrl) // Fetch movies from filmsUrl
  .then(res => res.json())
  .then(movies => {
      movies.forEach(movie => {renderMovieList(movie)})
      const firstMovie = document.querySelector("#id1");
      firstMovie.dispatchEvent(new Event("click"));
  })
  .catch(error => {
      console.error('Error fetching movies:', error);
  });
}

// The rest of your code...
function renderMovieList(movie) {
  const li = document.createElement("li");
  li.textContent = movie.title; // Fixed line
  li.id = "id" + movie.id;
  const ul = document.querySelector("#films");
  ul.appendChild(li);
  li.classList.add("film");
  li.classList.add('item');
  li.addEventListener("click", () => {handleMovieClick(movie)})
}


function handleMovieClick(movie) {
  const poster = document.querySelector("#poster");
  poster.setAttribute("src", movie.poster);
  poster.setAttribute("alt", movie.title);
  const info = document.querySelector("#showing");
  info.querySelector("#title").textContent = movie.title;
  info.querySelector("#runtime").textContent = movie.runtime + " minutes";
  info.querySelector("#film-info").textContent = movie.description;
  info.querySelector("#showtime").textContent = movie.showtime;
  info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}

function handleBuyTicket(pur) {
  const ticketDiv = document.querySelector("#ticket-num");
  let tickets = parseInt(ticketDiv.textContent.split(" ")[0]);
  if (tickets > 0) {
    ticketDiv.textContent = tickets - 1 + " remaining tickets";
  } else if (tickets === 0) {
    alert("No more tickets!");
    pur.target.classList.add("sold-out");
    pur.target.classList.remove("orange");

    fetch(url+movies.id,{
        method: "PATCH",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (res => res.json())
    .then (data => {
        updateDom(data);

        let numberOfTickets = (data.capacity - data.tickets_sold)

        if(!numberOfTickets > 0)
        { grabMovie()
        }

        let  RequestBodyTickets =  {
            "film_id": data.id,
            "number_of_tickets": numberOfTickets
         }

        fetch("http://localhost:3000/tickets",{
            method: "POST",
            headers: requestHeaders,    
            body: JSON.stringify(RequestBodyTickets)
        })
        .then (res => res.json())
        .then(data => data)
        .catch (e => console.log(e.message));

    })
    .catch (e => console.log(e.message));
}
function deleteMovie(movie){
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    let requestBody = {
        "id": movie.id
    }
    fetch(url+movie.id, {
        method: "DELETE",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (res => res.json())
    .then (data => grabMovie())
    .catch (e => console.log(e.message));
}
  }

