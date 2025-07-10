import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


interface UserState {
    user:any;
    isVegMode:boolean
}

const initialState:UserState = {
    user: {},
    isVegMode:false
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state, action:PayloadAction<object>) => {
      state.user = action.payload
    },
    setVegMode:(state, action:PayloadAction<boolean>) => {
      state.isVegMode = action.payload
    },
  },
})

export const {setUser,setVegMode} = UserSlice.actions

export const selectUser = (stat:RootState) => stat.user?.user

export default UserSlice.reducer