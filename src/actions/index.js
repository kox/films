export const REQUEST_FILMS = 'REQUEST_FILMS'
export const RECEIVE_FILMS = 'RECEIVE_FIMLS'
export const SELECT_FILM = 'SELECT_FILM'

export const selectFilm = film => ({
  type: SELECT_FILM,
  film
})


export const requestFilms = film => ({
  type: REQUEST_FILMS,
  film
})

export const receiveFilms = (film, json) => ({
  type: RECEIVE_FILMS,
  film,
  posts: json.map(child => child),
  receivedAt: Date.now()
})

const fetchPosts = film => dispatch => {
  dispatch(requestFilms(film))
  return fetch(`http://localhost:3000/films.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveFilms(film, json)))
}

const shouldFetchFilms = (state, film) => {
  const posts = state.postsByCompany[film]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = film => (dispatch, getState) => {
  if (shouldFetchFilms(getState(), film)) {
    return dispatch(fetchPosts(film))
  }
}
