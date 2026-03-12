import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const userSlice=createSlice({
    name:'user',
    initialState:getItem("user"),
    reducers:{
        setUser:(state,action)=>{
            setItem("user",action.payload);
            localStorage.setItem("accountType", action.payload.accountType);
            state=action.payload;
            return state;
        },
        removeUser:(state)=>{
            removeItem("user");
            removeItem("token");
            state=null;
            return state;
        }
    }
});
export const {setUser, removeUser}=userSlice.actions;
export default userSlice.reducer;