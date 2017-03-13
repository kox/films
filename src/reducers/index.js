import { combineReducers } from 'redux'
import {
  SELECT_FILM,
  REQUEST_FILMS, RECEIVE_FILMS
} from '../actions'

const selectedCompany = (state = '', action) => {
  switch (action.type) {
    case SELECT_FILM:
      return action.film
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_FILMS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_FILMS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts
      }
    default:
      return state
  }
}

const postsByCompany = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_FILMS:
    case REQUEST_FILMS:
      return {
        ...state,
        [action.film]: posts(state[action.film], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByCompany,
  selectedCompany
})

export default rootReducer
