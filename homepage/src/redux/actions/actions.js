import axios from 'axios';
import {root} from '../../config'
import store from '../store'
import { LOGIN,
         STATUS,
         CHANGE_STATUS,
         LOGOUT,
          ADVERTISEMENT,
          SERVICES,
          LOCATIONS,
        } from './index'
export const loginRequest=(user,token)=>{
  return {
    type: LOGIN,
    payload: {
      token,
      user
    }
  }
}


export const loginAction=(email,password)=>{
  return dispatch=>{
      dispatch(changeStatusAction({status:STATUS.SENDING}))
      axios.post(`${root}/login`,
      {
        email,
        password
      }
      ).then(({data})=>{
        console.log('response',data)
        if(data.success){
          const {user,token}=data.data;
          dispatch(loginRequest(user,token));
          dispatch(changeStatusAction({status:STATUS.FINISHED,error:''}))
        }
        else {
          dispatch(changeStatusAction({status:STATUS.FINISHED,error:data.message}))
        }
      })
      .catch(err=>dispatch(changeStatusAction({status:STATUS.FINISHED,error:'Unexpected Error happened!'})))
  }
}

export const changeStatusAction=(status)=>{
  return {
    type: CHANGE_STATUS,
    payload: status
  }
}
export const logoutAction=()=>{
  return{
    type: LOGOUT
  }
}
const adRequest=(ads)=>{
  return {
    type: ADVERTISEMENT,
    payload:ads
  }
}
export const loadAdvertisementAction=()=>{
  const login=store.getState().login;
  if(login.user){
    if(login.user.role==='admin'||login.user.role==='provider'){
      return dispatch=>{
        dispatch(adRequest([]))
      }
    }
  }
  if(login.token){
    return dispatch=>{
      axios({
        method:'GET',
        url:`${root}/ads`,
        headers:{
          Authorization:login.token,
        }
        })
        .then(({data})=>{
          if(data.success){
            dispatch(adRequest(data.data))
          }
        })
        .catch(err=>console.log(err))
    }
  }
  return dispatch=>{
    axios.get(`${root}/ads?status=running`)
    .then(({data})=>{
      if(data.success){
        dispatch(adRequest(data.data))
      }
    })
    .catch(err=>console.log(err))
  }
}

const setServiceAllAction=(services)=>{
  return {
    type: SERVICES.ALL,
    payload:services
  }
}
const setServiceBestAction=(services)=>{
  return {
    type: SERVICES.BEST,
    payload: services
  }
}
export const loadAllServiceAction=()=>{
  return dispatch=>{
    axios.get(`${root}/services?status=active`)
    .then(({data})=>{
      if(data.success){
        dispatch(setServiceAllAction(data.data))
      }
    })
    .catch(err=>console.log(err))
  }
}
export const loadBestServiceAction=()=>{
  return dispatch=>{
    axios.get(`${root}/services/best`)
    .then(({data})=>{
      if(data.success){
        dispatch(setServiceBestAction(data.data))
      }
    })
    .catch(err=>console.log(err))
  }
}
export const setLocationAction=(obj)=>{
  return {
    type: LOCATIONS,
    payload:obj
  }
}
export const loadLocationAction=()=>{
  return dispatch=>{
    axios.get(`${root}/locations`)
    .then(({data})=>{
      if(data.success){
        dispatch(setLocationAction(data.data))
      }
      else console.log(data.message)
    })
    .catch(err=>console.log(err))
  }
}
export const setServiceTypeAction=(obj)=>{
  return {
    type: SERVICES.TYPE,
    payload: obj
  }
}
export const loadServiceTypeAction=()=>{
  return dispatch=>{
    axios.get(`${root}/servicetypes?status=active`)
    .then(({data})=>{
      if(data.success){
        dispatch(setServiceTypeAction(data.data))
      }
      else console.log(data.message)
    })
    .catch(err=>console.log(err))
  }
}
export const setServiceFilterAction=(obj_filter)=>{
  return{
    type: SERVICES.FILTER,
    payload: obj_filter
  }
}
