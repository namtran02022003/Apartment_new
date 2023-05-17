import { createStore, combineReducers } from 'redux'
import toastReducer from './ToastReducer'

const rootReducer = combineReducers({
  toast: toastReducer
})

const store = createStore(rootReducer)

export default store
