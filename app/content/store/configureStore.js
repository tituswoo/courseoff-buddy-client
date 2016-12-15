import { createStore } from 'redux'
import rootReducer from 'content/reducers'
// import DevTools from 'content/containers/DevTools'

// const enhancer = compose(
//   DevTools.instrument()
// )

export const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState)
}
