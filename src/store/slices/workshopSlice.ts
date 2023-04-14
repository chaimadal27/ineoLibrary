import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getWorkshops,
    WorkshopsData,
    addWorkshop,
    Workshop,
    getSingleWorkshop,
    updateWorkshop
} from '@app/api/workshop.api'
import { WorkshopModel } from '@app/domain/WorkshopModel';



const initialState:WorkshopsData = {
    workshop:<WorkshopModel[]>[],
    singleWorkshop:<WorkshopModel>{}
}


export const fetchWorkshops = createAsyncThunk('get_workshops', async(payload, { dispatch })=>{
   return getWorkshops()
})

export const createWorkshop = createAsyncThunk('create_workshop', async(payload:Workshop,{dispatch})=>{
    return addWorkshop(payload)
})

export const getOneWorkshop = createAsyncThunk('get_one_workshop', async(payload:Workshop,{dispatch})=>{
    return getSingleWorkshop(payload)
})

export const patchWorkshop = createAsyncThunk('update_workshop', async(payload:Workshop, {dispatch})=>{
    return updateWorkshop(payload)  
})




export const workshopSlice = createSlice({
    name:'workshop',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchWorkshops.fulfilled, (state, action)=>{
            state.workshop = action.payload
        })

        builder.addCase(getOneWorkshop.fulfilled, (state, action)=>{
            state.singleWorkshop = action.payload
        })

        builder.addCase(createWorkshop.fulfilled,(state, payload)=>{
        })
        builder.addCase(patchWorkshop.fulfilled, (state, payload)=>{
        })
    }
})
export const {} = workshopSlice.actions;
export default workshopSlice.reducer;