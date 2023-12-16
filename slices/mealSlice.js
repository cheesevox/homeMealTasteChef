import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    refresh:false
}
const mealSlice = createSlice({
    name:"meal",
    initialState:initialState,
    reducers:{
        onHandleRefresh : (state,action)=>{
            state.refresh = !state.refresh
            console.log("resfresh la2",state.refresh)
        }
    }
})
export const {onHandleRefresh} = mealSlice.actions;
export default  mealSlice.reducer