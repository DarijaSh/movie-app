const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
// DOM elements
const input = document.querySelector("input")
const main = document.querySelector("main")
const form = document.querySelector("form")

async function getMovieData(searchTerm){
    const data = await fetch(searchTerm).then(response => response.json())
    appendMovieData(data)
}

function appendMovieData(data){
    let resultsData = data.results
    resultsData.map(x => {
        console.log(x)
        let createMovieEl = document.createElement("div")
        let poster = IMGPATH + x.poster_path
        let title = x.title
        let vote_average = x.vote_average.toFixed(1)
        let overview = x.overview
        createMovieEl.classList.add("movie")
        createMovieEl.innerHTML = 
        `
            <img src="${poster}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                <p>${overview}</p>
            </div>
        `
        main.append(createMovieEl)
    })
}

function getClassByRate(vote_average){
    if(vote_average >= 8) return "green"
    else if(vote_average >= 5) return "orange"
    else return "red"
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    if(input.value){
        // isvalo html
        main.innerHTML = ""
        // uzkrauna pagal input search
        getMovieData(SEARCHAPI + input.value)
    }
    else{
        getMovieData(APIURL)
    }
})

getMovieData(APIURL)
