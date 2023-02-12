import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getWorkshops,
    WorkshopsData,
    addWorkshop
} from '@app/api/workshop.api'



const initialState:WorkshopsData = {
workshop:[]
}


export const fetchWorkshops = createAsyncThunk('get_workshops', async(payload, { dispatch })=>{
   return getWorkshops()
})

export const createWorkshop = createAsyncThunk('create_workshop', async(payload,{dispatch})=>{
    return addWorkshop()
})



export const workshopSlice = createSlice({
    name:'workshop',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchWorkshops.fulfilled, (state, action)=>{
            state.workshop = action.payload
            
        })

        builder.addCase(createWorkshop.fulfilled,(state, payload)=>{

        })
    }
})
export const {} = workshopSlice.actions;
export default workshopSlice.reducer;
