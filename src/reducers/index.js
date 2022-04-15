import {combineReducers} from 'redux';
import AuthReducer from './auth';
import CategoriesReducer from './categories';
import ProvidersReducer from './providers';
import ClientsReducer from './clients';
import ChargeReducer from "./charges"
import RegionsReducer from './regions';

const allReducers=combineReducers({
              auth:AuthReducer,
              categories:CategoriesReducer,
              regions:RegionsReducer,
              providers:ProvidersReducer,
              clients:ClientsReducer,
              charges:ChargeReducer
})

export default  allReducers;