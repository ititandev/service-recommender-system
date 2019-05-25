import {LOCATIONS} from '../actions'


const initialState=[]
export default (state=initialState,action)=>{
  switch(action.type){
    case LOCATIONS:
      return action.payload;
  }
  return state;
}
