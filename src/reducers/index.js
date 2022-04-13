import {combineReducers} from 'redux';
import AuthReducer from './auth';
import CategoriesReducer from './categories';
import ProvidersReducer from './providers';
import RegionsReducer from './regions';


const allReducers=combineReducers({
              auth:AuthReducer,
              categories:CategoriesReducer,
              regions:RegionsReducer,
              providers:ProvidersReducer,
})

export default  allReducers;