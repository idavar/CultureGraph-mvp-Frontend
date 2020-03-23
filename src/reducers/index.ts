import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const reducers = combineReducers({
  form: formReducer,
  toastr: toastrReducer
})

export default reducers;
