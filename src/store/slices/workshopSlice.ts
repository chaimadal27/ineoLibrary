import { createAction, createAsyncThunk, createSlice, PrepareAction } from '@reduxjs/toolkit';
import {
    getWorkshops,
    WorkshopsData
} from '@app/api/workshop.api'



const initialState:WorkshopsData = {
workshop:[]
}


export const fetchWorkshops = createAsyncThunk('get_workshops', async(payload, { dispatch })=>{
   return getWorkshops()
})





export const workshopSlice = createSlice({
    name:'workshop',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchWorkshops.fulfilled, (state, action)=>{
            state.workshop = action.payload
            
        })
    }
})
export const {} = workshopSlice.actions;
export default workshopSlice.reducer;