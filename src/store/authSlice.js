import {createSlice} from '@reduxjs/toolkit'

  const initialState = {    // use for userAuthentication
    status: false,
    userData:null
  }


const authSlice = createSlice ({
    name:"auth",
    initialState,
    reducers: {
        login: (state,action) => {   // state : access actionn : payload
            state.status = true;
            state.userData = action.payload.userData
        },

        logout:(state) => {
            state.status = false;
            state.userData = null
        }


    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer;
