const APIKEY  = "3b34b50322e1f7ca8e68e085ef754a9d";

export function getFilmsWithSearchedText(text,page){
    const url = "https://api.themoviedb.org/3/search/movie?api_key="+APIKEY+"&language=fr&query="+text+"&page="+page;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getNewFilms(page){
    const url = "https://api.themoviedb.org/3/discover/movie?api_key="+APIKEY+"&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page="+page;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + APIKEY + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}