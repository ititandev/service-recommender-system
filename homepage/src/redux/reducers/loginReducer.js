import {LOGIN, LOGOUT} from '../actions';
import { STATUS,CHANGE_STATUS} from '../actions'

const initialState={
  token: null,
  user:null,
  status:  STATUS.NOT_SEND,
  error: ''
}
export default (state=initialState,action)=>{
  switch(action.type){
    case LOGIN:
      const {user,token}=action.payload;
        return {
          ...state,
          token,
          user
        };
    case CHANGE_STATUS:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return initialState;
  }
  return state;
}
