import {SERVICES} from '../actions'


const initialState={
    all:[],
    filter:{
      location:'',
      service_type:'',
      key_word:''
    },
    best:[],
    types:[]
}
export default (state=initialState,action)=>{
  switch(action.type){
    case SERVICES.ALL:
      return {
        ...state,
        all:action.payload
      }
    case SERVICES.TYPE:
      return{
        ...state,
        types: action.payload
      }
    case SERVICES.FILTER:
      return{
        ...state,
        filter:{
          ...state.filter,
          ...action.payload
        }
      }
    case SERVICES.BEST:
    return {
      ...state,
      best: action.payload
    }
  }
  return state;
}
