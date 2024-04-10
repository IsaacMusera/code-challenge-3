// API URL and endpoints
const baseApiUrl = 'http://localhost:3000';
const filmsUrl = `${baseApiUrl}/films`;
const ticketsUrl = `${baseApiUrl}/tickets`;

// remove when the DOM is full
document.addEventListener("DOMContentLoaded", () => {
  // Fetch movies and bring the movie list
  getMovies();
  // Add event listener to the "Buy Ticket" button
  document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

// Fetch movies from the API
function getMovies() {
  fetch(filmsUrl)
  .then(res => res.json())
  .then(movies => {
      // Render each movie in the list
      movies.forEach(movie => {renderMovieList(movie)})
      // Dispatch click event for the first movie to display its details
      const firstMovie = document.querySelector("#id1");
      firstMovie.dispatchEvent(new Event("click"));
  })
  .catch(error => {
      console.error('Error fetching movies:', error);
  });
}

// Render a movie in the movie list
function renderMovieList(movie) {
  const li = document.createElement("li");
  li.textContent = movie.title;
  li.id = "id" + movie.id;
  const ul = document.querySelector("#films");
  ul.appendChild(li);
  li.classList.add("film");
  li.classList.add('item');
  // Add event listener to the movie item
  li.addEventListener("click", () => {handleMovieClick(movie)})
}

// Handle click event on a movie item
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

// Handle buying a ticket
function handleBuyTicket(pur) {
  const ticketDiv = document.querySelector("#ticket-num");
  let tickets = parseInt(ticketDiv.textContent.split(" ")[0]);
  if (tickets > 0) {
    // Decrease ticket count if available
    ticketDiv.textContent = tickets - 1 + " remaining tickets";
  } else if (tickets === 0) {
    // If no tickets left, show alert and update UI
    alert("No more tickets!");
    pur.target.classList.add("sold-out");
    pur.target.classList.remove("orange");

    // Perform PATCH request 
    fetch(url+movies.id,{
        method: "PATCH",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (res => res.json())
    .then (data => {
        updateDom(data);

        // Check if there are no more tickets available
        let numberOfTickets = (data.capacity - data.tickets_sold)
        if(!numberOfTickets > 0) {
            grabMovie()
        }

        // Prepare request for adding new tickets
        let  RequestBodyTickets =  {
            "film_id": data.id,
            "number_of_tickets": numberOfTickets
         }

        // Add new tickets to the movie
        fetch(filmsUrl,{
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
}

// Delete a movie from the list
function deleteMovie(movie){
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    let requestBody = {
        "id": movie.id
    }
    // Perform DELETE request to remove the movie
    fetch(url+movie.id, {
        method: "DELETE",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (res => res.json())
    .then (data => grabMovie())
    .catch (e => console.log(e.message));
}
