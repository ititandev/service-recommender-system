import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import servicesReducer from './servicesReducer'
import locationsReducer from './locationsReducer';
import adsReducer from './adsReducer'
export default combineReducers({
  login: loginReducer,
  services: servicesReducer,
  locations: locationsReducer,
  ads: adsReducer
});
