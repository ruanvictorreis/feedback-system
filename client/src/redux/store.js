import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'

let finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}