import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import sugokuReducers from './reducers/sugokuReducers'

const reducer = combineReducers({
  sugokuReducers,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store