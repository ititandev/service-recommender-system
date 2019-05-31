
import {ADVERTISEMENT} from '../actions'

const initialState=[]
export default (state=initialState,action)=>{
  switch(action.type){
    case ADVERTISEMENT:
      return action.payload;
  }
  return state;
}
